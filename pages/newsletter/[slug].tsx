import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

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
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}) {
  return (
    <NewsletterLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </NewsletterLayout>
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
