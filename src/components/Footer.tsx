import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function Footer() {
  return (
    <Grid item container>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography
          style={{
            marginRight: '2rem',
          }}
        >
          &copy; Victor Aiyeola {new Date().getFullYear()}
        </Typography>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Link href="https://github.com/aiyeola">
            <GitHubIcon />
          </Link>

          <Link href="https://twitter.com/victor_aiyeola">
            <TwitterIcon />
          </Link>

          <Link href="https://web.facebook.com/vickyvayne">
            <FacebookIcon />
          </Link>

          <Link href="www.linkedin.com/in/victor-aiyeola">
            <LinkedInIcon />
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}
