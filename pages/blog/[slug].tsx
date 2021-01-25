import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getAllPostSlugs, getPostData } from '@lib/posts';
import Components from '@components/AllCustomComponents';

const components = Components;

type FrontMatter = {
  date: string;
  excerpt: string;
  title: string;
};

type Source = {
  compiledSource: string;
  renderedOutput: string;
  scope: FrontMatter;
};

export default function Post({
  source,
  frontMatter,
}: {
  source: Source;
  frontMatter: FrontMatter;
}) {
  const content = hydrate(source, { components });
  return (
    <Grid container>
      <Grid item style={{ marginBottom: '2rem' }}>
        <Typography>{frontMatter.title}</Typography>
        <Typography>{frontMatter.date}</Typography>
      </Grid>
      {content}
    </Grid>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: string | string[] | undefined;
}) => {
  const postContent = await getPostData(params?.slug);
  const { data, content } = matter(postContent);
  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
