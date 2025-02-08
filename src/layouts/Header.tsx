//@ts-nocheck
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import Hidden from "@material-ui/core/Hidden";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Modal from "@material-ui/core/Modal";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useDarkMode from "use-dark-mode";

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

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: "1.25rem",
    fontWeight: 500,
    "&:not(:last-child)": {
      marginRight: "2rem",
    },
  },
  appBar: {
    backgroundColor: "inherit",
    backdropFilter: "saturate(180%) blur(20px)",
    height: "100%",
    marginTop: "1rem",
    boxShadow: "none",
  },
  drawerIcon: {
    height: "30px",
    width: "30px",
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: "15px 18px",
    width: "97%",
    boxShadow:
      "0 10px 15px -8px rgba(0, 0, 0, 0.1), 0 4px 6px 6px rgba(0, 0, 0, 0.05);",
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalMenu = useRef();

  useEffect(() => setMounted(true), []);

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
          className={classes.appBar}
        >
          <Toolbar>
            <Grid
              item
              container
              justify="space-between"
              alignItems="center"
              style={{
                maxWidth: "56rem",
                position: "sticky",
                top: 0,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <Grid
                item
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Link href="/">
                  {isDark ? (
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

              <Hidden xsDown>
                <Grid
                  item
                  style={{
                    marginLeft: "auto",
                    marginRight: "1rem",
                  }}
                >
                  {React.Children.toArray(
                    routes.map((route) => (
                      <Link href={route.path} className={classes.link}>
                        {route.name}
                      </Link>
                    )),
                  )}
                </Grid>

                <Grid item>
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
              </Hidden>

              <Hidden smUp>
                <Grid
                  item
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <IconButton onClick={handleMenu} disableRipple>
                    <MenuRoundedIcon className={classes.drawerIcon} />
                  </IconButton>
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Modal
        className={classes.modal}
        open={menuOpen}
        onClose={handleMenu}
        onBackdropClick={handleMenu}
        closeAfterTransition
        disableEscapeKeyDown
        ref={modalMenu}
        BackdropProps={{
          invisible: true,
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
          <Paper className={classes.paper} elevation={0}>
            <Grid container>
              <Grid item>
                <Link href="/">
                  {isDark ? (
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
                item
                style={{
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
            </Grid>
            <Grid
              container
              direction="column"
              style={{
                margin: ".6rem 0",
              }}
            >
              <List disablePadding>
                {React.Children.toArray(
                  routes.map((route) => {
                    return (
                      <ListItem
                        button
                        component={Link}
                        href={`${route.path}`}
                        className={classes.link}
                        onClick={handleMenu}
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
