import { ShieldAction } from "@lib/formShield";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Cloudflare caps tokens well below this; anything longer is not ours. */
const MAX_TOKEN_LENGTH = 2048;

const SITEVERIFY_TIMEOUT_MS = 10_000;

interface SiteverifyResponse {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
  metadata?: { result_with_testing_key?: boolean };
}

let warnedMissingSecret = false;
let warnedMissingHostnames = false;

/**
 * The hostnames siteverify may report, from TURNSTILE_HOSTNAMES.
 *
 * Each entry is expanded to cover its `www.` counterpart, because the apex and
 * the www host are the same deployment and Cloudflare reports whichever one the
 * visitor actually solved the widget on — production redirects the apex to
 * www.aiyeola.dev, so listing only "aiyeola.dev" would reject every real
 * submission. Not a loosening: both names resolve to DNS we control.
 */
function expectedHostnames() {
  const hostnames = new Set<string>();

  for (const entry of (process.env.TURNSTILE_HOSTNAMES ?? "").split(",")) {
    const hostname = entry.trim().toLowerCase();
    if (!hostname) {
      continue;
    }

    hostnames.add(hostname);
    hostnames.add(
      hostname.startsWith("www.") ? hostname.slice(4) : `www.${hostname}`,
    );
  }

  return hostnames;
}

/**
 * Verifies a Cloudflare Turnstile token server-side, gating on all three of the
 * canonical checks: `success`, the action of the surface that issued the token,
 * and the frontend hostname it was solved on. Tokens are single-use at
 * Cloudflare, which also gives us replay protection.
 *
 * If TURNSTILE_SECRET_KEY is unset the check no-ops so a fresh clone still
 * works locally — see .env.example for Cloudflare's test keys.
 */
export default async function verifyTurnstile(
  token: unknown,
  { action, ip }: { action: ShieldAction; ip?: string },
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (!warnedMissingSecret) {
      warnedMissingSecret = true;
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set — form submissions are NOT protected against bots.",
      );
    }
    return true;
  }

  const hostnames = expectedHostnames();

  // Fail closed: a configured secret with no hostname allowlist would accept a
  // token solved on any site that has scraped our sitekey.
  if (hostnames.size === 0) {
    if (!warnedMissingHostnames) {
      warnedMissingHostnames = true;
      console.error(
        "[turnstile] TURNSTILE_SECRET_KEY is set but TURNSTILE_HOSTNAMES is empty — rejecting every submission. Set it to the frontend hostnames this deployment serves.",
      );
    }
    return false;
  }

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) {
    body.set("remoteip", ip);
  }

  let outcome: SiteverifyResponse;

  try {
    const response = await fetch(SITEVERIFY_URL, {
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("[turnstile] siteverify responded", response.status);
      return false;
    }

    outcome = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    console.error("[turnstile] siteverify failed:", error);
    return false;
  }

  if (!outcome.success) {
    console.error("[turnstile] rejected:", outcome["error-codes"]);
    return false;
  }

  if (!outcome.hostname || !hostnames.has(outcome.hostname.toLowerCase())) {
    console.error(
      `[turnstile] hostname "${outcome.hostname}" is not in TURNSTILE_HOSTNAMES`,
    );
    return false;
  }

  // Cloudflare's test keys succeed without echoing an action back, so only
  // assert it for real ones. This flag comes from Cloudflare, not the client.
  if (outcome.metadata?.result_with_testing_key) {
    console.warn(
      "[turnstile] verified with a testing key — the action assertion was skipped.",
    );
    return true;
  }

  if (outcome.action !== action) {
    console.error(
      `[turnstile] action "${outcome.action}" does not match expected "${action}"`,
    );
    return false;
  }

  return true;
}
