import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const AUTHORIZE_ENDPOINT = `https://accounts.spotify.com/authorize`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  if (!code) {
    const query = querystring.stringify({
      client_id: `${CLIENT_ID}`,
      response_type: "code",
      redirect_uri: `${DOMAIN_NAME}/api/getToken`,
      scope: "user-read-playback-state user-read-email user-read-private",
      state: "authorization_code",
    });

    return res.redirect(`${AUTHORIZE_ENDPOINT}?${query}`);
  }
  try {
    const response = await (
      await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: `${DOMAIN_NAME}/api/getToken`,
        }),
      })
    ).json();

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to authenticate" });
  }
};
