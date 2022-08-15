import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Modal from "@mui/material/Modal";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useDarkMode from "use-dark-mode";
import useMediaQuery from "@mui/material/useMediaQuery";

import Link from "@components/Link";
import routes from "routes";
import Text from "@components/MuiComposed/Text";
import Flex from "@components/MuiComposed/Flex";
import HamburgerIcon from "@assets/HamburgerIcon";

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
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalMenu = useRef();
  const matchesXS = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => setMounted(true), []);

  const handleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    window.addEventListener("resize", resizeFunction);

    () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, [modalMenu]);

  const resizeFunction = () => {
    if (window.innerWidth >= 600) {
      setMenuOpen(false);
    }
  };

  const logo = {
    0: (
      <Image
        src="/logos/black-logo.png"
        alt="Victor Aiyeola"
        width={50}
        height={50}
        priority
      />
    ),
    1: (
      <Image
        src="/logos/white-logo.png"
        alt="Victor Aiyeola"
        width={50}
        height={50}
        priority
      />
    ),
  };

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="sticky"
          color="inherit"
          enableColorOnDark
          sx={{
            backgroundColor: "inherit",
            backdropFilter: "saturate(180%) blur(20px)",
            height: "100%",
            marginTop: "1rem",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              px="1rem"
              sx={{
                width: "100%",
                maxWidth: "56rem",
                position: "sticky",
                top: 0,
              }}
            >
              <Flex my="1rem">
                <Link href="/">{logo[Number(isDark)]}</Link>
              </Flex>

              {matchesXS && (
                <>
                  <Flex ml="auto" mr="1rem">
                    {React.Children.toArray(
                      routes.map((route) => (
                        <Text
                          href={route.path}
                          component={Link}
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 500,
                            "&:not(:last-child)": {
                              marginRight: "2rem",
                            },
                          }}
                        >
                          {route.name}
                        </Text>
                      )),
                    )}
                  </Flex>

                  <IconButton onClick={toggleDarkMode}>
                    {mounted && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={
                          theme.palette.mode === "light"
                            ? "currentColor"
                            : "#fff"
                        }
                        stroke={
                          theme.palette.mode === "light"
                            ? "currentColor"
                            : "#fff"
                        }
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
                </>
              )}

              {matchesSM && (
                <Flex ml="auto">
                  <IconButton onClick={handleMenu} disableRipple>
                    <HamburgerIcon
                      style={{
                        fill:
                          theme.palette.mode === "light"
                            ? theme.palette.common.black
                            : theme.palette.common.white,
                      }}
                    />
                  </IconButton>
                </Flex>
              )}
            </Flex>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Modal
        open={menuOpen}
        onClose={handleMenu}
        closeAfterTransition
        disableEscapeKeyDown
        ref={modalMenu.current}
        BackdropProps={{
          invisible: true,
        }}
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Grow
          in={menuOpen}
          style={{
            transformOrigin: "top right",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: "15px 18px",
              width: "97%",
              boxShadow:
                "0 10px 15px -8px rgba(0, 0, 0, 0.1), 0 4px 6px 6px rgba(0, 0, 0, 0.05);",
            }}
          >
            <Flex>
              <Link href="/">{logo[Number(isDark)]}</Link>
              <Flex ml="auto">
                <IconButton onClick={toggleDarkMode} disableRipple>
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
              </Flex>
            </Flex>
            <Flex flexDirection="column" my=".6rem" mx="0">
              <List disablePadding>
                {React.Children.toArray(
                  routes.map((route) => (
                    <ListItemButton
                      component={Link}
                      href={route.path}
                      onClick={handleMenu}
                    >
                      <ListItemText primary={route.name} />
                    </ListItemButton>
                  )),
                )}
              </List>
            </Flex>
          </Paper>
        </Grow>
      </Modal>
    </>
  );
}
