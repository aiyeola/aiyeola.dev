import { NextApiRequest, NextApiResponse } from "next";

import db from "@lib/firebaseAdmin";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const snapshot = await db.ref("views").once("value");
  const views = snapshot.val();
  //@ts-ignore
  const allViews = Object.values(views).reduce((total, value) => total + value);

  return res.status(200).json({ total: allViews });
};
