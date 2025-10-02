import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import LayoutContainer from "@layouts/Container";
import Link from "@components/Link";

export default function About() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <LayoutContainer title="About - Victor Aiyeola">
      <Grid
        sx={{
          marginBottom: "1rem",
          alignSelf: matchesXS ? "center" : undefined,
        }}
      >
        <Typography
          variant="h2"
          paragraph
          sx={{
            letterSpacing: "0.13rem",
          }}
        >
          About Me
        </Typography>
        <Avatar
          alt="Victor Aiyeola"
          // src="/static/images/avatar.jpg"
          src="/static/images/aiyeola.jpg"
          sx={{
            width: (theme) => theme.spacing(20),
            height: (theme) => theme.spacing(20),
          }}
        />
      </Grid>

      <Grid>
        <Typography gutterBottom>
          Hi, I'm Victor Aiyeola 😉. JavaScript software developer based in
          Lagos, Nigeria. I see every day as an opportunity to become
          world-class 🌍.
        </Typography>

        <Typography>
          I'll be writing here about development, techie stuff, and personal
          experiences. Kindly subscribe to my{" "}
          <Link
            href="/newsletter"
            underline="always"
            color="primary"
            sx={{
              fontWeight: "bold",
            }}
          >
            newsletter
          </Link>{" "}
          to be kept posted.
        </Typography>
      </Grid>
    </LayoutContainer>
  );
}
