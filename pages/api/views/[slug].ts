import { NextApiRequest, NextApiResponse } from "next";

import db from "@lib/firebaseAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const ref = db.ref("views").child(req.query.slug as string);
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return 1;
      }

      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val(),
    });
  }

  if (req.method === "GET") {
    const snapshot = await db
      .ref("views")
      .child(req.query.slug as string)
      .once("value");
    const views = snapshot.val();

    return res.status(200).json({ total: views });
  }
};
