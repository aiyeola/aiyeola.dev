const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

let warned = false;

/**
 * Verifies a Cloudflare Turnstile token server-side. Tokens are single-use at
 * Cloudflare, which also gives us replay protection.
 *
 * If TURNSTILE_SECRET_KEY is unset the check no-ops so a fresh clone still
 * works locally — see .env.example for Cloudflare's test keys.
 */
export default async function verifyTurnstile(token: unknown, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (!warned) {
      warned = true;
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set — form submissions are NOT protected against bots.",
      );
    }
    return true;
  }

  if (typeof token !== "string" || !token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    });

    if (!response.ok) {
      console.error("[turnstile] siteverify responded", response.status);
      return false;
    }

    const outcome = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!outcome.success) {
      console.error("[turnstile] rejected:", outcome["error-codes"]);
    }

    return outcome.success === true;
  } catch (error) {
    console.error("[turnstile] siteverify failed:", error);
    return false;
  }
}
