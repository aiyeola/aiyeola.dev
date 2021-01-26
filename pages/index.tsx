import Link from 'next/link';
import { GetStaticProps } from 'next';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Footer from '@components/Footer';
import { getSortedPosts } from '@lib/posts';

type Posts = {
  date: string;
  title: string;
  slug: string;
};

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: '#fee343',
    padding: theme.spacing(4),
    maxWidth: '70vw',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  blogTitle: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}));

export default function Home({ allPostsData }: { allPostsData: Posts[] }) {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item container direction="column" className={classes.container}>
        <Grid item container style={{ marginBottom: '1rem' }}>
          <Grid item>
            <Avatar
              alt="my profile image"
              src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1611593557/projects/passport_v3a6x0.jpg"
              className={classes.large}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h3" paragraph>
            Hi, I'm Victor
          </Typography>
          <Typography variant="h5" gutterBottom>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later!
          </Typography>
        </Grid>

        <Grid item style={{ marginBottom: 'auto' }}>
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

        <Footer />
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();
  return {
    props: { allPostsData },
  };
};
