import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

import Link from "@components/MuiComposed/Link";
import NowPlaying from "@components/NowPlaying";
import Flex from "@components/MuiComposed/Flex";
import Text from "@components/MuiComposed/Text";

const useStyles = makeStyles((theme) => ({
  footerLink: {
    fontSize: "1.25rem",
    fontWeight: 500,
    "&:not(:last-child)": {
      marginRight: "2rem",
      marginBottom: 0,
      [theme.breakpoints.down("sm")]: {
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
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      px="2rem"
      mt="1rem"
      mb="2rem"
      mx="auto"
      width="100%"
    >
      <Flex
        flexDirection="column"
        width="100%"
        sx={{
          maxWidth: matchesXS ? "100vw" : "46rem",
          marginTop: "auto",
          paddingTop: "2rem",
        }}
      >
        <Divider
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <NowPlaying />

        <Flex flexDirection={matchesXS ? "column" : "row"} mb="2rem">
          <Flex flexDirection={matchesXS ? "column" : "row"}>
            <Flex className={classes.footerLink}>
              <Link href="/">Home</Link>
            </Flex>
            <Flex className={classes.footerLink}>
              <Link href="/about">About</Link>
            </Flex>
            <Flex className={classes.footerLink}>
              <Link href="/guestbook">Guestbook</Link>
            </Flex>
            <Flex className={classes.footerLink}>
              <Link href="/newsletter">Newsletter</Link>
            </Flex>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between">
          <Flex
            sx={{
              alignSelf: "center",
              marginBottom: matches ? "1.2rem" : 0,
            }}
          >
            <Text
              sx={{
                flex: 1,
              }}
              variant="subtitle2"
            >
              &copy; Victor Aiyeola {new Date().getFullYear()}
            </Text>
          </Flex>

          <Flex
            sx={{
              alignSelf: "center",
              "& :not(:last-child)": {
                marginRight: "1rem",
              },
            }}
          >
            <Link
              href="https://github.com/aiyeola"
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon className={classes.hover} />
            </Link>

            <Link
              href="https://twitter.com/victor_aiyeola"
              target="_blank"
              rel="noopener"
            >
              <TwitterIcon className={classes.hover} />
            </Link>

            <Link
              href="https://web.facebook.com/victoraiyeoladev"
              target="_blank"
              rel="noopener"
            >
              <FacebookIcon className={classes.hover} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/victor-aiyeola"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon className={classes.hover} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
