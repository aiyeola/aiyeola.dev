import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";

import { useChangeTheme } from "@utils/dark-mode";
import Link from "@components/Link";

type Props = {
  children: React.ReactElement;
};

function ElevationScroll(props: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: "1.5rem",
    "&:not(:last-child)": {
      marginRight: "1rem",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matches = useMediaQuery("(max-width: 360px)");

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        style={{
          backgroundColor: "inherit",
          backdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <Toolbar>
          <Grid
            item
            container
            alignItems="center"
            style={{
              maxWidth: "56rem",
              position: "sticky",
              zIndex: 10,
              top: 0,
              paddingLeft: matchesXS ? 0 : "2rem",
              paddingRight: matchesXS ? 0 : "2rem",
              paddingTop: matches ? 0 : "2rem",
              paddingBottom: "2rem",
            }}
            justify="space-between"
            direction={matches ? "column" : "row"}
          >
            <Grid
              item
              style={{
                alignSelf: matches ? "flex-start" : undefined,
                marginBottom: matches ? "1rem" : 0,
                marginTop: matches ? "1.2rem" : 0,
              }}
            >
              <IconButton onClick={() => changeTheme()}>
                {mounted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                  >
                    {theme.palette.type === "dark" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    )}
                  </svg>
                )}
              </IconButton>
            </Grid>

            <Grid item>
              <Link className={classes.link} href="/blog">
                Blog
              </Link>

              <Link className={classes.link} href="/about">
                About
              </Link>

              <Link className={classes.link} href="/">
                Home
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
