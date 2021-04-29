import "@fontsource/jost";
import "@fontsource/quicksand";
import "@fontsource/quicksand/500.css";
import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";


const coreThemeObject = {
  typography: {
    fontFamily: "Quicksand",
  },
  props: {
    MuiLink: {
      underline: "none",
      color: "inherit",
    },
    MuiButton: {
      disableElevation: true,
      variant: "contained",
    },
    MuiCircularProgress: {
      size: 25,
    },
  },
  overrides: {
    MuiToolbar: {
      root: {
        justifyContent: "center",
      },
    },
    MuiOutlinedInput: {
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
    MuiCircularProgress: {
      colorPrimary: {
        color: "inherit",
      },
    },
    MuiTypography: {
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
  },
};

//@ts-ignore
export const darkTheme = createMuiTheme({
  ...coreThemeObject,
  palette: {
    type: "dark",
  },
});

//@ts-ignore
export const lightTheme = createMuiTheme({
  ...coreThemeObject,
  palette: {
    type: "light",
  },
});


