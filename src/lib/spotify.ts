import querystring from "querystring";

import redis from "@lib/redis";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const REFRESH_TOKEN_KEY = "spotify:refresh_token";
const ACCESS_TOKEN_KEY = "spotify:access_token";

// Refresh a little early so an in-flight request never races the expiry.
const EXPIRY_MARGIN_SECONDS = 60;

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

/**
 * The refresh token lives in Redis so it can maintain itself.
 *
 * Spotify refresh tokens do not expire on a timer, but they can be rotated:
 * a refresh response may carry a *new* refresh_token, after which the old one
 * stops working. Reading only from the environment means a rotation silently
 * breaks the widget until someone re-authorizes by hand. Reading from Redis
 * (seeded by the env var) lets us write the replacement back the moment
 * Spotify hands us one, so no manual step is needed.
 */
const readRefreshToken = async (): Promise<string | undefined> => {
  try {
    const stored = await redis.get(REFRESH_TOKEN_KEY);
    if (stored) return stored;
  } catch (error) {
    console.warn(
      "[spotify] Redis unavailable, using env refresh token:",
      error,
    );
  }

  return process.env.SPOTIFY_REFRESH_TOKEN;
};

const storeRefreshToken = async (token: string) => {
  try {
    await redis.set(REFRESH_TOKEN_KEY, token);
    console.info("[spotify] Stored a rotated refresh token.");
  } catch (error) {
    // Non-fatal: this request still succeeds on the token we just used. The
    // env var remains the fallback until Redis comes back.
    console.warn("[spotify] Could not persist rotated refresh token:", error);
  }
};

const requestAccessToken = async (
  refresh_token: string,
): Promise<TokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      `Failed to refresh token: ${data.error_description || data.error || response.statusText}`,
    );
    // Marked so the caller can decide whether retrying with the env token is
    // worth a shot, rather than pattern-matching on the message.
    (error as Error & { spotifyError?: string }).spotifyError = data.error;
    throw error;
  }

  return data as TokenResponse;
};

export const getAccessToken = async (): Promise<TokenResponse> => {
  // A cached access token covers the common case: Spotify's tokens last an
  // hour, so most requests need no round trip to the token endpoint at all.
  try {
    const cached = await redis.get(ACCESS_TOKEN_KEY);
    if (cached) return { access_token: cached, expires_in: 0 };
  } catch (error) {
    console.warn("[spotify] Redis unavailable, skipping token cache:", error);
  }

  const refresh_token = await readRefreshToken();

  if (!refresh_token) {
    throw new Error(
      "No Spotify refresh token available. Run `yarn spotify:token` to mint one.",
    );
  }

  let data: TokenResponse;

  try {
    data = await requestAccessToken(refresh_token);
  } catch (error) {
    const envToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const rejected =
      (error as Error & { spotifyError?: string }).spotifyError ===
      "invalid_grant";

    // The stored token can go stale (a rotation we failed to persist, a value
    // left over from an older client secret). Fall back to the env token once
    // before giving up, and clear the bad entry so we stop retrying it.
    if (rejected && envToken && envToken !== refresh_token) {
      console.warn(
        "[spotify] Stored refresh token rejected, retrying with env token.",
      );
      data = await requestAccessToken(envToken);
      await storeRefreshToken(envToken);
    } else {
      if (rejected) {
        console.error(
          "[spotify] Refresh token rejected by Spotify. Re-authorize with `yarn spotify:token`.",
        );
      }
      throw error;
    }
  }

  // Spotify only returns refresh_token when it has rotated one.
  if (data.refresh_token && data.refresh_token !== refresh_token) {
    await storeRefreshToken(data.refresh_token);
  }

  try {
    const ttl = Math.max(data.expires_in - EXPIRY_MARGIN_SECONDS, 1);
    await redis.set(ACCESS_TOKEN_KEY, data.access_token, "EX", ttl);
  } catch (error) {
    console.warn("[spotify] Could not cache access token:", error);
  }

  return data;
};

const fetchNowPlaying = (access_token: string) =>
  fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetchNowPlaying(access_token);

  // A cached access token can be invalidated before its TTL is up (revoked
  // session, rotated secret). Drop the cache and mint a fresh one rather than
  // reporting "nothing playing" for the rest of the hour.
  if (response.status === 401) {
    console.warn("[spotify] Access token rejected, refreshing and retrying.");

    try {
      await redis.del(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.warn("[spotify] Could not clear cached access token:", error);
    }

    const retry = await getAccessToken();
    return fetchNowPlaying(retry.access_token);
  }

  return response;
};
