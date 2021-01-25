import dynamic from 'next/dynamic';
import { GetStaticProps, GetStaticPaths } from 'next';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getAllPostSlugs, getPostData } from '@lib/posts';

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

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: '#fee343',
    padding: theme.spacing(4),
    maxWidth: '70vw',
  },
}));

export default function Post({
  source,
  frontMatter,
}: {
  source: Source;
  frontMatter: FrontMatter;
}) {
  const classes = useStyles();

  const content = hydrate(source, { components });
  return (
    <Grid container justify="center">
      <Grid item container direction="column" className={classes.container}>
        <Grid item style={{ marginBottom: '2rem' }}>
          <Typography variant="h2">{frontMatter.title}</Typography>
          <Typography>{frontMatter.date}</Typography>
        </Grid>
        <Grid item>{content}</Grid>
      </Grid>
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
  params: any;
}) => {
  const postContent = await getPostData(params.slug);
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
