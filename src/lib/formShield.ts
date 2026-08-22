/**
 * Field names and thresholds shared by the client shield (useFormShield) and
 * the server guard (formGuard). Kept dependency-free so importing it into a
 * component doesn't drag Redis into the browser bundle.
 */

/** Honeypot input name — plausible enough that bots fill it in. */
export const HONEYPOT_FIELD = "contact_reason";

/** Milliseconds between form mount and submit, reported by the client. */
export const ELAPSED_FIELD = "elapsed";

/** Cloudflare Turnstile token. */
export const TOKEN_FIELD = "turnstileToken";

/**
 * Submissions faster than this are treated as automated. Far below any human
 * page-read-plus-type, so false positives are effectively nil.
 */
export const MIN_ELAPSED_MS = 800;
