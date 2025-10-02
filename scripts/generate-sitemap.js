// Source: https://leerob.io/blog/nextjs-sitemap-robots

const fs = require("fs");
const prettier = require("prettier");

const { WEBSITE_URL } = require("../src/utils/configuration");

(async () => {
  // Import globby dynamically since it's now ESM-only
  const { globby } = await import("globby");

  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    "data/**/*.mdx",
    "pages/*.tsx",
    "pages/*.ts",
    "!pages/404.ts",
    "!pages/_*.tsx",
    "!pages/_*.ts",
    "!pages/api",
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace("data", "")
                  .replace(".js", "");

                const route =
                  /\/blog\/(.*)\/index/.test(path) || path === "/index"
                    ? path.slice(0, -"/index".length)
                    : path;

                return `
                        <url>
                            <loc>${`${WEBSITE_URL}${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
