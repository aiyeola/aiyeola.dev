import Link from 'next/link';
import { GetStaticProps } from 'next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
          <Typography variant="h2" paragraph>
            Hi, I'm Victor
          </Typography>
          <Typography variant="h4" gutterBottom>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later!
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h2">Blog</Typography>

          <ul>
            {allPostsData.map(({ slug, date, title }) => (
              <li key={slug}>
                <Link href={`/blog/[slug]`} as={`/blog/${slug}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small>{date}</small>
              </li>
            ))}
          </ul>
        </Grid>
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
