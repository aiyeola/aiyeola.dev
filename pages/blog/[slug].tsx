import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";

import { getFiles, getFileBySlug } from "@lib/mdx";
import MDXComponents from "@components/MDXComponents";
import BlogLayout from "@layouts/Blog";

type FrontMatter = {
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
  wordCount: number;
  readingTime: ReadingTime;
  slug: string;
};

type Source = {
  compiledSource: string;
  renderedOutput: string;
  scope: FrontMatter;
};

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export default function Post({
  mdxSource,
  frontMatter,
}: {
  mdxSource: Source;
  frontMatter: FrontMatter;
}) {
  const content = hydrate(mdxSource, { components: MDXComponents });

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getFileBySlug("blog", context.params?.slug as string);

  return { props: post };
};
