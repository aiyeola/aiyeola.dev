import Grid from "@mui/material/Grid";
import Text from "@components/MuiComposed/Text";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

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
    <LayoutContainer title="About - Victor Aiyeola">
      <Grid
        item
        style={{
          marginBottom: "1rem",
          alignSelf: matchesXS ? "center" : undefined,
        }}
      >
        <Text
          variant="h2"
          paragraph
          style={{
            letterSpacing: "0.13rem",
          }}
        >
          About Me
        </Text>
        <Avatar
          alt="Victor Aiyeola"
          src="/static/images/avatar.jpg"
          className={classes.large}
        />
      </Grid>

      <Grid item>
        <Text gutterBottom>
          Hi, I'm Victor Aiyeola 😉. JavaScript software developer based in
          Lagos, Nigeria. I see every day as an opportunity to become
          world-class 🌍.
        </Text>

        <Text>
          I'll be writing here about development, techie stuff, and personal
          experiences. Kindly subscribe to my{" "}
          <Link
            href="/newsletter"
            underline="always"
            color="primary"
            style={{
              fontWeight: "bold",
            }}
          >
            newsletter
          </Link>{" "}
          to be kept posted.
        </Text>
      </Grid>
    </LayoutContainer>
  );
}
