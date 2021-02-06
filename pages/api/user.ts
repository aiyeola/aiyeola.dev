import { NextApiRequest, NextApiResponse } from "next";

import session from "@lib/session";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  session(req, res);

  if (req.method !== "GET") {
    return res.send("Method not allowed.");
  }

  //@ts-ignore
  return res.json({ name: req.session.login });
}
