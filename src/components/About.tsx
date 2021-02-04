import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LayoutContainer from "@layouts/Container";
import Link from "@components/Link";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function About() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <LayoutContainer>
      <Grid
        item
        style={{
          marginBottom: "1rem",
          alignSelf: matchesXS ? "center" : undefined,
        }}
      >
        <Typography variant="h1" paragraph>
          About Me
        </Typography>
        <Avatar
          alt="my profile image"
          src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1611593557/projects/passport_v3a6x0.jpg"
          className={classes.large}
        />
      </Grid>

      <Grid item>
        <Typography>
          Hi, I'm Victor Aiyeola. JavaScript Software developer based in Lagos,
          Nigeria. I love all things JS 😍. I'll be writing here about
          development, techie stuff and personal experiences. Kindly subscribe
          to my{" "}
          <Link
            href="/newsletter"
            underline="hover"
            color="primary"
            style={{
              fontWeight: "bold",
            }}
          >
            newsletter
          </Link>{" "}
          to be posted.
        </Typography>
      </Grid>
    </LayoutContainer>
  );
}
