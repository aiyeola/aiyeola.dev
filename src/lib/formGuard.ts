import { NextApiRequest } from "next";

import getClientIp from "@lib/clientIp";
import rateLimit from "@lib/rateLimit";
import verifyTurnstile from "@lib/turnstile";
import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  MIN_ELAPSED_MS,
  ShieldAction,
  TOKEN_FIELD,
} from "@lib/formShield";

export type GuardResult =
  | { ok: true }
  /** Looks automated — the caller should fake a success so the bot learns nothing. */
  | { ok: false; silent: true }
  | { ok: false; silent?: false; status: number; error: string };

interface GuardOptions {
  /**
   * The surface being protected. Doubles as the Turnstile action asserted
   * against the token and as the rate-limit key namespace, so it must match
   * the action the widget was rendered with.
   */
  scope: ShieldAction;
  /** What to rate limit on — an IP for public forms, a login for authed ones. */
  identifier: string;
  limit: number;
  windowSeconds: number;
}

/**
 * Bot protection for form endpoints, in cheapest-first order:
 * honeypot → submit timing → Turnstile → rate limit.
 *
 * Turnstile runs before the rate limit so bot traffic can't burn a real
 * visitor's budget on a shared NAT IP.
 */
export default async function guardFormRequest(
  req: NextApiRequest,
  { scope, identifier, limit, windowSeconds }: GuardOptions,
): Promise<GuardResult> {
  const body = (req.body || {}) as Record<string, unknown>;

  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn(`[formGuard] ${scope}: honeypot filled, dropping silently`);
    return { ok: false, silent: true };
  }

  // Client-supplied, so this is a heuristic only — never the real gate.
  const elapsed = Number(body[ELAPSED_FIELD]);
  if (Number.isFinite(elapsed) && elapsed < MIN_ELAPSED_MS) {
    console.warn(
      `[formGuard] ${scope}: submitted in ${elapsed}ms, dropping silently`,
    );
    return { ok: false, silent: true };
  }

  const ip = getClientIp(req);

  const verified = await verifyTurnstile(body[TOKEN_FIELD], {
    action: scope,
    ip,
  });
  if (!verified) {
    return {
      ok: false,
      status: 403,
      error: "Verification failed. Please try again.",
    };
  }

  const { ok } = await rateLimit(
    `${scope}:${identifier}`,
    limit,
    windowSeconds,
  );
  if (!ok) {
    return {
      ok: false,
      status: 429,
      error: "Too many requests. Please try again later.",
    };
  }

  return { ok: true };
}
