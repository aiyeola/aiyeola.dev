import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;

const AUTHORIZE_ENDPOINT = `https://accounts.spotify.com/authorize`;

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const query = querystring.stringify({
    client_id: `${client_id}`,
    response_type: "token",
    redirect_uri: "http://localhost:3000/callback",
    scope: "user-read-playback-state user-read-email user-read-private",
    state: "authorization_code",
  });

  return res.redirect(`${AUTHORIZE_ENDPOINT}?${query}`);
};
