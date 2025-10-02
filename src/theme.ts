import "@fontsource/jost";
import "@fontsource/quicksand";
import "@fontsource/quicksand/500.css";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const coreThemeObject = {
  typography: {
    fontFamily: "Quicksand",
    h1: {
      fontFamily: "Jost",
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "Jost",
      fontWeight: "bold",
    },
    h3: {
      fontFamily: "Jost",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "Jost",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none" as const,
        color: "inherit",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained" as const,
      },
      styleOverrides: {
        contained: {
          backgroundColor: "#e0e0e0",
          color: "black",
          "&:hover": {
            backgroundColor: "#d0d0d0",
          },
        },
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        size: 25,
      },
      styleOverrides: {
        colorPrimary: {
          color: "inherit",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "center",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[900],
          },
        },
        input: {
          fontSize: "1rem",
        },
        adornedEnd: {
          paddingRight: 0,
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...coreThemeObject,
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  ...coreThemeObject,
  palette: {
    mode: "light",
  },
});
