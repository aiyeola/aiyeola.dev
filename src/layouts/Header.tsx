import { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";

import { useChangeTheme } from "@utils/dark-mode";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "1.5rem",
    ["&:hover"]: {
      transform: "scale(1.2)",
    },
    ["&:not(:last-child)"]: {
      marginRight: "1rem",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
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
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
      justify="space-between"
    >
      <Grid item>
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
        <Link href="/blog">
          <a className={classes.link}>Blog</a>
        </Link>

        <Link href="/about">
          <a className={classes.link}>About</a>
        </Link>

        <Link href="/">
          <a className={classes.link}>Home</a>
        </Link>
      </Grid>
    </Grid>
  );
}

// <Grid item>
// <Avatar
//   alt="my profile image"
//   src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1611593557/projects/passport_v3a6x0.jpg"
//   className={classes.large}
// />
// </Grid>
