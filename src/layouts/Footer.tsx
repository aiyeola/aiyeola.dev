import Grid from "@mui/material/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

import Link from "@components/Link";
import NowPlaying from "@components/NowPlaying";

export default function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width: 360px)");
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <Grid
        container
        direction={matches ? "column" : "row"}
        justifyContent="space-between"
        sx={{
          marginTop: "auto",
          paddingTop: "2rem",
          maxWidth: "46rem",
        }}
      >
        <Grid container>
          <Divider
            sx={{
              width: "100%",
              marginBottom: "1rem",
            }}
          />

          <NowPlaying />
        </Grid>

        <Grid
          container
          direction={matchesXS ? "column" : "row"}
          sx={{
            marginBottom: "2rem",
          }}
        >
          <Grid
            container
            size={{ xs: 12, md: "grow" }}
            sx={{
              display: "flex",
              flexDirection: matchesXS ? "column" : "row",
            }}
          >
            <Grid
              sx={(theme) => ({
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
              })}
            >
              <Typography component="span">
                <Link href="/">Home</Link>
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
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
              })}
            >
              <Typography component="span">
                <Link href="/about">About</Link>
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
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
              })}
            >
              <Typography component="span">
                <Link href="/guestbook">Guestbook</Link>
              </Typography>
            </Grid>
            <Grid
              sx={(theme) => ({
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
              })}
            >
              <Typography component="span">
                <Link href="/newsletter">Newsletter</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          sx={{
            alignSelf: "center",
            marginBottom: matches ? "1.2rem" : 0,
          }}
        >
          <Typography
            sx={{
              flex: 1,
            }}
            variant="subtitle2"
          >
            &copy; Victor Aiyeola {new Date().getFullYear()}
          </Typography>
        </Grid>

        <Grid
          sx={{
            alignSelf: "center",
          }}
        >
          <Link
            href="https://github.com/aiyeola"
            target="_blank"
            rel="noopener"
            sx={{
              "&:not(:last-child)": {
                marginRight: "1rem",
              },
            }}
          >
            <GitHubIcon
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Link>

          <Link
            href="https://twitter.com/victor_aiyeola"
            target="_blank"
            rel="noopener"
            sx={{
              "&:not(:last-child)": {
                marginRight: "1rem",
              },
            }}
          >
            <TwitterIcon
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Link>

          <Link
            href="https://web.facebook.com/victoraiyeoladev"
            target="_blank"
            rel="noopener"
            sx={{
              "&:not(:last-child)": {
                marginRight: "1rem",
              },
            }}
          >
            <FacebookIcon
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Link>

          <Link
            href="https://www.linkedin.com/in/victor-aiyeola"
            target="_blank"
            rel="noopener"
            sx={{
              "&:not(:last-child)": {
                marginRight: "1rem",
              },
            }}
          >
            <LinkedInIcon
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
