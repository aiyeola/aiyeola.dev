import Link from 'next/link';
import { GetStaticProps } from 'next';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getSortedPosts } from '@lib/posts';
import LayoutContainer from '@components/Layouts/Container';

type Posts = {
  date: string;
  title: string;
  slug: string;
};

const useStyles = makeStyles((theme) => ({
  blogTitle: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}));

export default function Home({ allPostsData }: { allPostsData: Posts[] }) {
  const classes = useStyles();

  return (
    <LayoutContainer>
      <>
        <Grid item>
          <Typography variant="h3" paragraph>
            Hi, I'm Victor
          </Typography>
          <Typography variant="h5" gutterBottom>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later!
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h4" gutterBottom>
            Latest Posts
          </Typography>
          {allPostsData.map(({ slug, date, title }) => (
            <Grid item container key={slug}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  width: '100%',
                }}
              >
                <Link href={`/blog/[slug]`} as={`/blog/${slug}`}>
                  <Typography component={'a'} className={classes.blogTitle}>
                    {title}
                  </Typography>
                </Link>
                <Typography>{date}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    </LayoutContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();
  return {
    props: { allPostsData },
  };
};
