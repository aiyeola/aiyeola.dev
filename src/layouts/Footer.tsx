import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import useTheme from "@material-ui/core/styles/useTheme";

import Link from "@components/Link";
import NowPlaying from "@components/NowPlaying";

const useStyles = makeStyles((theme) => ({
  link: {
    transition: "all 0.3s",
    "&:not(:last-child)": {
      marginRight: "1rem",
    },
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  footerLink: {
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
        justify="space-between"
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
                <Link href="/home" target="_blank">
                  Home
                </Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/about" target="_blank">
                  About
                </Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/guestbook" target="_blank">
                  Guestbook
                </Link>
              </Typography>
            </Grid>
            <Grid item className={classes.footerLink}>
              <Typography component="span">
                <Link href="/newsletter" target="_blank">
                  Newsletter
                </Link>
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
            className={classes.link}
          >
            <GitHubIcon />
          </Link>

          <Link
            href="https://twitter.com/victor_aiyeola"
            target="_blank"
            className={classes.link}
          >
            <TwitterIcon />
          </Link>

          <Link
            href="https://web.facebook.com/vickyvayne"
            target="_blank"
            className={classes.link}
          >
            <FacebookIcon />
          </Link>

          <Link
            href="https://www.linkedin.com/in/victor-aiyeola"
            target="_blank"
            className={classes.link}
          >
            <LinkedInIcon />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
