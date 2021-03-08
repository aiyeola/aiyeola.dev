import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const AUTHORIZE_ENDPOINT = `https://accounts.spotify.com/authorize`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  if (!code) {
    const query = querystring.stringify({
      client_id: `${client_id}`,
      response_type: "code",
      redirect_uri: "http://localhost:3000/api/newSpotify",
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
          redirect_uri: "http://localhost:3000/api/newSpotify",
        }),
      })
    ).json();

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to authenticate" });
  }
};
