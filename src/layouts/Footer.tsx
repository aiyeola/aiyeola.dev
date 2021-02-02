import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ['&:hover']: {
      transform: 'scale(1.2)',
    },
    ['&:not(:last-child)']: {
      marginRight: '1rem',
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      style={{
        marginTop: 'auto',
        paddingTop: '3rem',
        maxWidth: '42rem',
      }}
    >
      <Box
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Typography
          style={{
            flex: 1,
          }}
          variant="subtitle2"
        >
          &copy; Victor Aiyeola {new Date().getFullYear()}
        </Typography>
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Link href="https://github.com/aiyeola">
            <a target="_blank" className={classes.link}>
              <GitHubIcon />
            </a>
          </Link>

          <Link href="https://twitter.com/victor_aiyeola">
            <a target="_blank" className={classes.link}>
              <TwitterIcon />
            </a>
          </Link>

          <Link href="https://web.facebook.com/vickyvayne">
            <a target="_blank" className={classes.link}>
              <FacebookIcon />
            </a>
          </Link>

          <Link href="https://www.linkedin.com/in/victor-aiyeola">
            <a target="_blank" className={classes.link}>
              <LinkedInIcon />
            </a>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}
