import { useCallback, useEffect, useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  ShieldAction,
  TOKEN_FIELD,
} from "@lib/formShield";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** How long to wait for Turnstile before giving up and letting the server reject. */
const TOKEN_TIMEOUT_MS = 15000;

const honeypotStyles = {
  position: "absolute" as const,
  left: "-9999px",
  top: "auto",
  width: "1px",
  height: "1px",
  opacity: 0,
  overflow: "hidden",
};

/**
 * Bot protection for a form: an off-screen honeypot input, a mount-to-submit
 * timer, and a Cloudflare Turnstile widget.
 *
 * Turnstile is mounted lazily — `arm()` (wired to onFocus) is what pulls in the
 * Cloudflare script, so the subscribe box on every blog post costs nothing
 * until a visitor actually touches it. `getShieldPayload()` arms it too and
 * awaits the token, so an instant submit can't race the widget.
 *
 * `action` identifies the surface to Cloudflare; the endpoint verifying the
 * token asserts the same value, so both sides read it from ACTIONS.
 */
export default function useFormShield(action: ShieldAction) {
  const [armed, setArmed] = useState(false);
  const mountedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const widget = useRef<TurnstileInstance>();
  const token = useRef<string | null>(null);
  const waiters = useRef<((value: string | null) => void)[]>([]);

  // Set here rather than during render so SSR and hydration agree.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const settle = useCallback((value: string | null) => {
    token.current = value;
    const pending = waiters.current;
    waiters.current = [];
    pending.forEach((resolve) => resolve(value));
  }, []);

  const arm = useCallback(() => setArmed(true), []);

  const waitForToken = useCallback(
    () =>
      new Promise<string | null>((resolve) => {
        if (token.current) {
          resolve(token.current);
          return;
        }

        const waiter = (value: string | null) => {
          clearTimeout(timer);
          resolve(value);
        };

        const timer = setTimeout(() => {
          waiters.current = waiters.current.filter((w) => w !== waiter);
          resolve(null);
        }, TOKEN_TIMEOUT_MS);

        waiters.current.push(waiter);
      }),
    [],
  );

  /** Extra body fields to send with the submission. */
  const getShieldPayload = useCallback(async () => {
    // Read straight off the DOM node: a bot that assigns `.value` without
    // firing React's onChange would never show up in component state.
    const payload = {
      [HONEYPOT_FIELD]: honeypot.current?.value || "",
      [ELAPSED_FIELD]: Date.now() - mountedAt.current,
      [TOKEN_FIELD]: null as string | null,
    };

    if (!siteKey) {
      return payload;
    }

    // Mounts the widget if onFocus never fired (autofill, keyboard submit).
    setArmed(true);

    return { ...payload, [TOKEN_FIELD]: await waitForToken() };
  }, [waitForToken]);

  /** Turnstile tokens are single-use, so clear it after every submit. */
  const resetShield = useCallback(() => {
    token.current = null;
    widget.current?.reset();
  }, []);

  const shieldFields = (
    <>
      <input
        type="text"
        ref={honeypot}
        name={HONEYPOT_FIELD}
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={honeypotStyles}
      />
      {siteKey && armed && (
        <Turnstile
          ref={widget}
          siteKey={siteKey}
          onSuccess={settle}
          onExpire={() => settle(null)}
          onError={(code) => {
            // Codes are documented at
            // developers.cloudflare.com/turnstile/troubleshooting/client-side-errors
            console.error(`[turnstile] widget error ${code}`);
            settle(null);
          }}
          options={{
            action,
            appearance: "interaction-only",
            size: "flexible",
          }}
        />
      )}
    </>
  );

  return { shieldFields, arm, getShieldPayload, resetShield };
}
