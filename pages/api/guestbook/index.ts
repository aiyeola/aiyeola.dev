import { NextApiRequest, NextApiResponse } from "next";

import redis from "@lib/redis";
import session from "@lib/session";
import guardFormRequest from "@lib/formGuard";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  session(req, res);

  //@ts-ignore
  const { login, email } = req.session;

  if (req.method === "GET") {
    const entries = (await redis.hvals("guestbook"))
      .map((entry) => JSON.parse(entry))
      .sort((a, b) => b.id - a.id);

    return res.json(entries);
  }

  if (req.method === "POST") {
    if (!login) {
      return res.status(403).send("Unauthorized");
    }

    const guard = await guardFormRequest(req, {
      scope: "guestbook",
      // Already authenticated, so throttle the account rather than the IP.
      identifier: login,
      limit: 5,
      windowSeconds: 10 * 60,
    });

    if (!guard.ok) {
      if (guard.silent) {
        return res.status(200).json({ error: "" });
      }

      return res.status(guard.status).json({ error: guard.error });
    }

    const body = (req.body.body || "").trim().slice(0, 500);

    if (!body) {
      return res.status(400).json({ error: "Kindly, fill in something" });
    }

    const id = Date.now();
    const newEntry = {
      id,
      email,
      updated_at: Date.now(),
      body,
      created_by: login,
    };

    await redis.hset("guestbook", id, JSON.stringify(newEntry));
    return res.status(200).json(newEntry);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
};
