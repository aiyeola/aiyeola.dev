import { NextApiRequest } from "next";

/**
 * Best-effort client IP. On Vercel `x-forwarded-for` is set by the platform
 * and its first entry is the real client, so it's safe to trust here.
 */
export default function getClientIp(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;

  if (value) {
    return value.split(",")[0].trim();
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp) {
    return realIp;
  }

  return req.socket.remoteAddress || "unknown";
}
