#!/usr/bin/env node
/**
 * Generate a new Spotify refresh token.
 *
 *   node scripts/spotify-refresh-token.js
 *
 * Spins up a temporary local server, walks you through the Spotify consent
 * screen, exchanges the authorization code, and prints (optionally saves) the
 * resulting refresh token.
 *
 * Flags:
 *   --redirect-uri <uri>  Redirect URI registered on your Spotify app
 *                         (default: http://127.0.0.1:8888/callback,
 *                          or $SPOTIFY_REDIRECT_URI)
 *   --scope "<scopes>"    Space-separated scopes (default: the scopes this site needs)
 *   --write / --no-write  Save SPOTIFY_REFRESH_TOKEN to .env.local without asking
 *   --redis / --no-redis  Also seed the token into Redis ($REDIS_URL), which is
 *                         where the running site reads it from. Prompted if unset.
 */
const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
const readline = require("readline");
const querystring = require("querystring");
const { execFile } = require("child_process");

const ENV_PATH = ".env.local";
const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:8888/callback";
const DEFAULT_SCOPE =
  "user-read-currently-playing user-read-playback-state user-read-email user-read-private";

// Manually load .env.local (same approach as test-spotify.js)
if (fs.existsSync(ENV_PATH)) {
  fs.readFileSync(ENV_PATH, "utf-8")
    .split("\n")
    .forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1].trim()] = match[2].trim();
    });
}

function parseArgs(argv) {
  const args = { write: null, redis: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--write") args.write = true;
    else if (arg === "--no-write") args.write = false;
    else if (arg === "--redis") args.redis = true;
    else if (arg === "--no-redis") args.redis = false;
    else if (arg === "--redirect-uri") args.redirectUri = argv[++i];
    else if (arg === "--scope") args.scope = argv[++i];
    else if (arg === "--help" || arg === "-h") args.help = true;
    else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }
  return args;
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    }),
  );
}

function openBrowser(url) {
  const cmd =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";
  execFile(cmd, [url], (error) => {
    if (error)
      console.log(
        "   (Could not open the browser automatically — use the URL above.)",
      );
  });
}

function waitForCode({ hostname, port, pathname, state }) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname !== pathname) {
        res.writeHead(404).end("Not found");
        return;
      }

      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      const returnedState = url.searchParams.get("state");

      const done = (message) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<!doctype html><meta charset="utf-8"><title>Spotify</title>
<body style="font-family:system-ui;padding:3rem"><h1>${message}</h1>
<p>You can close this tab and return to the terminal.</p></body>`);
        server.close();
      };

      if (error) {
        done("❌ Authorization denied");
        reject(new Error(`Spotify returned error: ${error}`));
      } else if (!code) {
        done("❌ No authorization code in callback");
        reject(new Error("Callback had no ?code parameter"));
      } else if (returnedState !== state) {
        done("❌ State mismatch");
        reject(
          new Error("State mismatch — aborting, the callback may not be ours"),
        );
      } else {
        done("✅ Authorized!");
        resolve(code);
      }
    });

    server.on("error", (error) => {
      reject(
        error.code === "EADDRINUSE"
          ? new Error(
              `Port ${port} is already in use. Free it, or pass --redirect-uri with another port.`,
            )
          : error,
      );
    });

    server.listen(port, hostname);
  });
}

function upsertEnvVar(key, value) {
  const line = `${key}=${value}`;
  let contents = fs.existsSync(ENV_PATH)
    ? fs.readFileSync(ENV_PATH, "utf-8")
    : "";

  if (new RegExp(`^${key}=`, "m").test(contents)) {
    contents = contents.replace(new RegExp(`^${key}=.*$`, "m"), line);
  } else {
    if (contents && !contents.endsWith("\n")) contents += "\n";
    contents += `${line}\n`;
  }

  fs.writeFileSync(ENV_PATH, contents);
}

/**
 * Seed the token into Redis, which is what src/lib/spotify.ts actually reads.
 * The env var is only its fallback seed, so writing here is what makes a
 * re-auth take effect on a running deployment without a redeploy.
 */
async function seedRedis(token) {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.log("   Skipping Redis: REDIS_URL is not set.");
    return;
  }

  let Redis;
  try {
    Redis = require("ioredis");
  } catch {
    console.log("   Skipping Redis: ioredis is not installed.");
    return;
  }

  const client = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });

  try {
    await client.connect();
    await client.set("spotify:refresh_token", token);
    await client.del("spotify:access_token");
    console.log(
      "✅ Seeded spotify:refresh_token in Redis (and cleared the cached access token).",
    );
  } catch (error) {
    console.error(`⚠️  Could not write to Redis: ${error.message}`);
    console.error(
      "   The site will fall back to SPOTIFY_REFRESH_TOKEN from the environment.",
    );
  } finally {
    client.disconnect();
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(
      fs
        .readFileSync(__filename, "utf-8")
        .split("*/")[0]
        .replace(/^#!.*\n\/\*\*\n/, "")
        .replace(/^ \* ?/gm, ""),
    );
    return;
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri =
    args.redirectUri ||
    process.env.SPOTIFY_REDIRECT_URI ||
    DEFAULT_REDIRECT_URI;
  const scope = args.scope || DEFAULT_SCOPE;

  console.log("\n🎵 Spotify refresh token generator\n");

  if (!client_id || !client_secret) {
    console.error(
      "❌ SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env.local",
    );
    console.error(
      "   Get them from https://developer.spotify.com/dashboard → your app → Settings\n",
    );
    process.exitCode = 1;
    return;
  }

  const parsed = new URL(redirect_uri);
  const port = Number(parsed.port || (parsed.protocol === "https:" ? 443 : 80));

  // Spotify rejects http://localhost with "redirect_uri: Insecure" — only HTTPS
  // or an explicit loopback IP is accepted.
  if (parsed.protocol === "http:" && parsed.hostname === "localhost") {
    const suggestion = redirect_uri.replace("localhost", "127.0.0.1");
    console.error(
      `❌ Spotify will reject ${redirect_uri} with "redirect_uri: Insecure".`,
    );
    console.error(
      '   Redirect URIs must use HTTPS or an explicit loopback IP, not "localhost".\n',
    );
    console.error(
      `   Use ${suggestion} instead, and register that exact URI under`,
    );
    console.error(
      "   Settings → Redirect URIs on https://developer.spotify.com/dashboard\n",
    );
    process.exitCode = 1;
    return;
  }
  const state = crypto.randomBytes(16).toString("hex");
  const authUrl = `${AUTHORIZE_ENDPOINT}?${querystring.stringify({
    client_id,
    response_type: "code",
    redirect_uri,
    scope,
    state,
    show_dialog: "true",
  })}`;

  console.log(`   Redirect URI: ${redirect_uri}`);
  console.log(`   Scopes:       ${scope}\n`);
  console.log(
    "⚠️  This exact redirect URI must be listed under Settings → Redirect URIs",
  );
  console.log("   on your Spotify app, or Spotify will reject the request.");
  console.log(
    '   (Spotify requires loopback IPs like 127.0.0.1 rather than "localhost".)\n',
  );
  console.log(
    "🌐 Opening the Spotify consent screen. If it does not open, visit:\n",
  );
  console.log(`   ${authUrl}\n`);

  const codePromise = waitForCode({
    hostname: parsed.hostname,
    port,
    pathname: parsed.pathname,
    state,
  });

  openBrowser(authUrl);
  console.log(
    `⏳ Listening on ${parsed.hostname}:${port}${parsed.pathname} for the callback...\n`,
  );

  const code = await codePromise;

  console.log("🔄 Exchanging the authorization code for tokens...\n");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.refresh_token) {
    console.error("❌ Token exchange failed!");
    console.error("   Status:", response.status, response.statusText);
    console.error("   Error:", data.error);
    console.error("   Description:", data.error_description);
    console.error(
      "\n   Double-check the client secret and that the redirect URI matches exactly.\n",
    );
    process.exitCode = 1;
    return;
  }

  console.log("✅ Success! Your new refresh token:\n");
  console.log(`   ${data.refresh_token}\n`);
  console.log(`   Granted scopes: ${data.scope}\n`);

  const shouldWrite =
    args.write !== null
      ? args.write
      : /^y(es)?$/i.test(
          await ask(`Save it to ${ENV_PATH} as SPOTIFY_REFRESH_TOKEN? [y/N] `),
        );

  if (shouldWrite) {
    upsertEnvVar("SPOTIFY_REFRESH_TOKEN", data.refresh_token);
    console.log(`\n✅ Wrote SPOTIFY_REFRESH_TOKEN to ${ENV_PATH}`);
    console.log("   Remember to update the value in your deployment env too.");
  } else {
    console.log(
      `\n   Set SPOTIFY_REFRESH_TOKEN in ${ENV_PATH} (and your deployment env) manually.`,
    );
  }

  const shouldSeedRedis =
    args.redis !== null
      ? args.redis
      : /^y(es)?$/i.test(
          await ask(
            "\nAlso seed it into Redis (what the live site reads)? [y/N] ",
          ),
        );

  if (shouldSeedRedis) {
    console.log("");
    await seedRedis(data.refresh_token);
  }

  console.log("\n   Verify with: yarn spotify:test\n");
}

main().catch((error) => {
  console.error("\n❌", error.message, "\n");
  process.exitCode = 1;
});
