import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from '@mui/material/styles';

import Link from "@components/Link";
import NowPlaying from "@components/NowPlaying";

const useStyles = makeStyles((theme) => ({
  link: {
    "&:not(:last-child)": {
      marginRight: "1rem",
    },
  },
  footerLink: {
    fontSize: "1.25rem",
    fontWeight: 500,
    "&:not(:last-child)": {
      marginRight: "2rem",
      marginBottom: 0,
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1rem",
      },
      [theme.breakpoints.down(360)]: {
        marginRight: "1rem",
      },
    },
  },
  hover: {
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery("(max-width: 360px)");
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <Grid
        item
        container
        direction={matches ? "column" : "row"}
        justifyContent="space-between"
        style={{
          marginTop: "auto",
          paddingTop: "2rem",
          maxWidth: "46rem",
        }}
      >
        <Grid item container>
          <Divider
            style={{
              width: "100%",
              marginBottom: "1rem",
            }}
          />

          <NowPlaying />
        </Grid>

        <Grid
          item
          container
          direction={matchesXS ? "column" : "row"}
          style={{
            marginBottom: "2rem",
          }}
        >
          <Grid
            item
            md
            container
            style={{
              display: "flex",
              flexDirection: matchesXS ? "column" : "row",
            }}
          >
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/">Home</Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/about">About</Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/guestbook">Guestbook</Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/newsletter">Newsletter</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          style={{
            alignSelf: "center",
            marginBottom: matches ? "1.2rem" : 0,
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
        </Grid>

        <Grid
          item
          style={{
            alignSelf: "center",
          }}
        >
          <Link
            href="https://github.com/aiyeola"
            target="_blank"
            rel="noopener"
            className={classes.link}
          >
            <GitHubIcon className={classes.hover} />
          </Link>

          <Link
            href="https://twitter.com/victor_aiyeola"
            target="_blank"
            rel="noopener"
            className={classes.link}
          >
            <TwitterIcon className={classes.hover} />
          </Link>

          <Link
            href="https://web.facebook.com/victoraiyeoladev"
            target="_blank"
            rel="noopener"
            className={classes.link}
          >
            <FacebookIcon className={classes.hover} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/victor-aiyeola"
            target="_blank"
            rel="noopener"
            className={classes.link}
          >
            <LinkedInIcon className={classes.hover} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
