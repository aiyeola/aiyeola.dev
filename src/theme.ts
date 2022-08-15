import "@fontsource/jost";
import "@fontsource/quicksand";
import "@fontsource/quicksand/500.css";
import { createTheme, Theme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

declare module "@mui/styles" {
  interface DefaultTheme extends Theme {}
}

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
        underline: "none",
        color: "inherit",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
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
          "&$focused $notchedOutline": {
            borderColor: grey[900],
          },
        },
        notchedOutline: {},
        input: {
          fontSize: "1rem",
        },
        adornedEnd: {
          paddingRight: 0,
        },
      },
    },
  },
  // props: {
  //   MuiLink: {},
  //   MuiButton: {},
  //   MuiCircularProgress: {},
  // },
  // overrides: {
  //   MuiToolbar: {},
  //   MuiOutlinedInput: {},
  //   MuiCircularProgress: {},
  //   MuiTypography: {},
  // },
};

// //@ts-ignore
// export const darkTheme = createTheme({
//   ...coreThemeObject,
//   palette: {
//     mode: "dark",
//   },
// });

//@ts-ignore
export const lightTheme = createTheme({
  ...coreThemeObject,
});

export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: "dark",
  },
});
