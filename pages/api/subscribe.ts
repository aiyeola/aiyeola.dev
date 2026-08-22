import { NextApiRequest, NextApiResponse } from "next";

import getClientIp from "@lib/clientIp";
import guardFormRequest from "@lib/formGuard";

// Deliberately conservative: no whitespace, one @, a dot in the domain.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  const guard = await guardFormRequest(req, {
    scope: "subscribe",
    identifier: getClientIp(req),
    limit: 5,
    windowSeconds: 60 * 60,
  });

  if (!guard.ok) {
    // Looks automated — answer exactly as we would on success so the bot
    // learns nothing about why it was dropped.
    if (guard.silent) {
      return res.status(201).json({ error: "" });
    }

    return res.status(guard.status).json({ error: guard.error });
  }

  if (typeof email !== "string" || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY;
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        body: JSON.stringify({
          email_address: email,
          tags: ["aiyeola.dev"],
        }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        return res.status(400).json({
          error: `You're already subscribed to my mailing list.`,
        });
      }

      // Don't hand Buttondown's raw response back to the client.
      console.error("[subscribe] buttondown error:", response.status, text);
      return res.status(400).json({
        error: "Something went wrong. Please try again.",
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    console.error("[subscribe] request failed:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
};
