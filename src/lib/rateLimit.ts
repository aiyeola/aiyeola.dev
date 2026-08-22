import redis from "@lib/redis";

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number;
}

/**
 * Fixed-window rate limiter on the existing ioredis connection.
 *
 * Fails open: if Redis is unreachable the request is allowed through, so an
 * outage can't take the forms down. Turnstile is still the hard gate.
 */
export default async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const redisKey = `rl:${key}`;

  try {
    const count = await redis.incr(redisKey);

    // Only set the TTL on the first hit of a window, so the window doesn't
    // slide forward on every request.
    if (count === 1) {
      await redis.expire(redisKey, windowSeconds);
    }

    if (count > limit) {
      const ttl = await redis.ttl(redisKey);
      return {
        ok: false,
        remaining: 0,
        retryAfter: ttl > 0 ? ttl : windowSeconds,
      };
    }

    return { ok: true, remaining: limit - count, retryAfter: 0 };
  } catch (error) {
    console.error("[rateLimit] failing open:", error);
    return { ok: true, remaining: limit, retryAfter: 0 };
  }
}
