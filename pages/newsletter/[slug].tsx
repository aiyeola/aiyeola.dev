import { GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";

import { getFiles, getFileBySlug } from "@lib/mdx";
import NewsletterLayout from "@layouts/Newsletter";
import MDXComponents from "@components/MDXComponents";

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

export default function Newsletter({
  mdxSource,
  frontMatter,
}: {
  mdxSource: Source;
  frontMatter: FrontMatter;
}) {
  const content = hydrate(mdxSource, { components: MDXComponents });

  return (
    <NewsletterLayout frontMatter={frontMatter}>{content}</NewsletterLayout>
  );
}

export async function getStaticPaths() {
  const newsletters = await getFiles("newsletter");

  return {
    paths: newsletters.map((newsletter) => ({
      params: {
        slug: newsletter.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const newsletter = await getFileBySlug(
    "newsletter",
    context.params?.slug as string,
  );

  return { props: newsletter };
};
