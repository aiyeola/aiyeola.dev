import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import Link from "@components/Link";

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
}));

export default function Footer() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width: 360px)");

  return (
    <Grid
      item
      container
      direction={matches ? "column" : "row"}
      justify="space-between"
      style={{
        marginTop: "auto",
        paddingTop: "3rem",
        maxWidth: "42rem",
      }}
    >
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
  );
}
