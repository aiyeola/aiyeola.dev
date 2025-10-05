import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Modal from "@mui/material/Modal";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme as useNextTheme } from "next-themes";

import Link from "@components/Link";
import routes from "routes";

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

export default function Header() {
  const theme = useTheme();
  const { theme: nextTheme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalMenu = useRef<HTMLDivElement>(null);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => setMounted(true), []);

  const currentTheme = nextTheme === "system" ? systemTheme : nextTheme;
  const isDark = currentTheme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, [modalMenu]);

  const resizeFunction = () => {
    if (window.innerWidth >= 600) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{
            backgroundColor: "inherit",
            backdropFilter: "saturate(180%) blur(20px)",
            height: "100%",
            marginTop: "1rem",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Grid
              container
              sx={{
                maxWidth: "56rem",
                width: "100%",
                position: "sticky",
                top: 0,
                paddingLeft: "1rem",
                paddingRight: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid
                sx={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Link href="/">
                  {theme.palette.mode === "dark" ? (
                    <Image
                      src="/logos/white-logo.png"
                      alt="Victor Aiyeola"
                      width={50}
                      height={50}
                      priority
                    />
                  ) : (
                    <Image
                      src="/logos/black-logo.png"
                      alt="Victor Aiyeola"
                      width={50}
                      height={50}
                      priority
                    />
                  )}
                </Link>
              </Grid>

              {isSmUp && (
                <>
                  <Grid
                    sx={{
                      marginLeft: "auto",
                      marginRight: "1rem",
                    }}
                  >
                    {React.Children.toArray(
                      routes.map((route) => (
                        <Link
                          href={route.path}
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            "&:not(:last-child)": {
                              marginRight: "2rem",
                            },
                          }}
                        >
                          {route.name}
                        </Link>
                      )),
                    )}
                  </Grid>

                  <Grid>
                    <IconButton onClick={toggleDarkMode}>
                      {mounted && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                          }}
                        >
                          {theme.palette.mode === "dark" ? (
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
                </>
              )}

              {isXsDown && (
                <Grid
                  sx={{
                    marginLeft: "auto",
                  }}
                >
                  <IconButton onClick={handleMenu} disableRipple>
                    <MenuRoundedIcon
                      sx={{
                        height: "30px",
                        width: "30px",
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                      }}
                    />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Modal
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        open={menuOpen}
        onClose={handleMenu}
        closeAfterTransition
        disableEscapeKeyDown
        ref={modalMenu}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
        style={{
          marginTop: 8,
        }}
      >
        <Grow
          in={menuOpen}
          style={{
            transformOrigin: "top right",
          }}
        >
          <Paper
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: "15px 18px",
              width: "97%",
              boxShadow:
                "0 10px 15px -8px rgba(0, 0, 0, 0.1), 0 4px 6px 6px rgba(0, 0, 0, 0.05);",
            }}
            elevation={0}
          >
            <Grid container>
              <Grid>
                <Link href="/">
                  {theme.palette.mode === "dark" ? (
                    <Image
                      src="/logos/white-logo.png"
                      alt="Victor Aiyeola"
                      width={50}
                      height={50}
                      priority
                    />
                  ) : (
                    <Image
                      src="/logos/black-logo.png"
                      alt="Victor Aiyeola"
                      width={50}
                      height={50}
                      priority
                    />
                  )}
                </Link>
              </Grid>

              <Grid
                sx={{
                  marginLeft: "auto",
                }}
              >
                <IconButton onClick={toggleDarkMode}>
                  {mounted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    >
                      {theme.palette.mode === "dark" ? (
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
            </Grid>
            <Grid
              container
              direction="column"
              sx={{
                margin: ".6rem 0",
              }}
            >
              <List disablePadding>
                {React.Children.toArray(
                  routes.map((route) => {
                    return (
                      <ListItem
                        component={Link}
                        href={`${route.path}`}
                        onClick={handleMenu}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        <ListItemText primary={route.name} />
                      </ListItem>
                    );
                  }),
                )}
              </List>
            </Grid>
          </Paper>
        </Grow>
      </Modal>
    </>
  );
}
