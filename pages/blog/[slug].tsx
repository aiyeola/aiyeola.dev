import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getAllPostSlugs, getPostData } from '@lib/posts';
import LayoutContainer from '@components/Layouts/Container';

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

const components = {
  TestComponent: dynamic(() => import('@components/TestComponent')),
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
    <LayoutContainer>
      <>
        <Grid item style={{ marginBottom: '2rem' }}>
          <Typography variant="h2" style={{ lineHeight: 1 }} paragraph>
            {frontMatter.title}
          </Typography>
          <Typography>{frontMatter.date}</Typography>
        </Grid>
        <Grid item>{content}</Grid>
      </>
    </LayoutContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const postContent = await getPostData(ctx.params?.slug as string);
  const { data, content } = matter(postContent);

  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(data.date).toLocaleDateString(
    'en-GB',
    options
  );
  const frontmatter = {
    ...data,
    date: formattedDate,
  };
  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: frontmatter,
    },
  };
};
