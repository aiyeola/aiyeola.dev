import fs from "fs";
import path from "path";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import readingTime from "reading-time";
import renderToString from "next-mdx-remote/render-to-string";

import MDXComponents from "@components/MDXComponents";

const postsDirectory = path.join(process.cwd(), "blog");

const root = process.cwd();

export function getSortedPosts() {
  const fileNames = fs.readdirSync(path.join(root, "data"));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(data.publishedAt).toLocaleDateString(
      "en-GB",
      options,
    );
    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug,
      ...frontmatter,
    };
  });

  // Sort posts by date
  //@ts-ignore
  return allPostsData.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );
}

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Date(data.date).toLocaleDateString(
    "en-GB",
    options,
  );
  const frontMatter = {
    ...data,
    date: formattedDate,
    wordCount: content.split(/\s+/gu).length,
    readingTime: readingTime(content),
    slug: slug || null,
  };

  const mdxSource = await renderToString(content, {
    scope: data,
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    frontMatter,
  };
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, "data", type));

  //@ts-ignore
  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8",
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
