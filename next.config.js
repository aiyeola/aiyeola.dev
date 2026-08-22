const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // next-pwa 5.x predates Next 15 and precaches build artifacts that Next never
  // serves publicly. A single 404 in the precache manifest aborts the whole
  // install ("bad-precaching-response"), so the new service worker never
  // activates and outdated caches are never cleaned up.
  buildExcludes: [
    // Emitted at .next/dynamic-css-manifest.json — not under /_next/static, so
    // /_next/dynamic-css-manifest.json is always a 404.
    /dynamic-css-manifest\.json$/,
    // Build-id scoped and fetched with every navigation anyway. Precaching them
    // pins per-deploy URLs that 404 while a new deploy is still propagating;
    // the static-js-assets runtime cache picks them up on first fetch instead.
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
  ],
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify Album Art
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap");
    }
    return config;
  },
};

// Chain the plugins
module.exports = withBundleAnalyzer(withPWA(nextConfig));

// https://securityheaders.com
// next-themes injects an inline <script> in <head> to apply the stored theme
// before paint. Its exact (minified) source is what the hash below covers, so
// the hash changes whenever next-themes or the minifier output changes —
// `scripts/verify-csp-hashes.js` runs after `next build` and fails loudly if it drifts.
const THEME_SCRIPT_HASH = "'sha256-CkJu+FPM6h06ebYA83FwNpYVxGp0on8HHLDwr3WVZmQ='";

// In development the script is served unminified and Next.js injects its own
// inline dev/HMR scripts, so hashes are useless there.
const inlineScriptPolicy =
  process.env.NODE_ENV === "development" ? "'unsafe-inline'" : THEME_SCRIPT_HASH;

const ContentSecurityPolicy = `
  default-src 'self' disqus.com c.disquscdn.com;
  script-src 'self' 'unsafe-eval' ${inlineScriptPolicy} *.googletagmanager.com *.disqus.com c.disquscdn.com https://challenges.cloudflare.com;
  child-src 'self' *.google.com;
  frame-src disqus.com https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com c.disquscdn.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];
