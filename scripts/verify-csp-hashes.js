#!/usr/bin/env node
/**
 * Verifies that every inline <script> in the prerendered HTML is covered by a
 * sha256 hash in the Content-Security-Policy declared in next.config.js.
 *
 * next-themes injects an inline script to apply the stored theme before paint;
 * its minified source (and therefore its hash) changes when next-themes or the
 * minifier output changes. Without this check, that drift silently ships a CSP
 * that blocks the script — the theme flash comes back with only a console error.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const CONFIG = path.join(ROOT, "next.config.js");
const HTML_DIRS = [".next/server/pages", ".next/server/app"].map((d) =>
  path.join(ROOT, d),
);

const allowed = new Set(
  (fs.readFileSync(CONFIG, "utf8").match(/sha256-[A-Za-z0-9+/=]+/g) || []).map(
    (h) => h,
  ),
);

const htmlFiles = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".html")) htmlFiles.push(p);
  }
};
HTML_DIRS.forEach(walk);

if (htmlFiles.length === 0) {
  console.error(
    "[csp] no prerendered HTML found under .next/server — run `next build` first",
  );
  process.exit(1);
}

// Inline scripts only: no src attribute, and not a data block (application/json, ld+json).
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const DATA_BLOCK = /type\s*=\s*"[^"]*json[^"]*"/i;

const missing = new Map(); // hash -> { file, body }
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  let match;
  while ((match = INLINE_SCRIPT.exec(html)) !== null) {
    const [, attrs, body] = match;
    if (DATA_BLOCK.test(attrs) || body.trim() === "") continue;
    const hash =
      "sha256-" + crypto.createHash("sha256").update(body, "utf8").digest("base64");
    if (!allowed.has(hash) && !missing.has(hash)) {
      missing.set(hash, { file: path.relative(ROOT, file), body });
    }
  }
}

if (missing.size === 0) {
  console.log(
    `[csp] ok — all inline scripts in ${htmlFiles.length} prerendered page(s) are allowed`,
  );
  process.exit(0);
}

console.error("[csp] inline script(s) not allowed by the CSP in next.config.js:\n");
for (const [hash, { file, body }] of missing) {
  console.error(`  ${hash}`);
  console.error(`    first seen in: ${file}`);
  console.error(`    source: ${body.slice(0, 160).replace(/\s+/g, " ")}...\n`);
}
console.error("Add the hash(es) to script-src in next.config.js, then rebuild.");
process.exit(1);
