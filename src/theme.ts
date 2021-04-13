import "@fontsource/jost";
import "@fontsource/quicksand";
import { responsiveFontSizes, createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
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
    body1: {
      fontSize: "1.5rem",
    },
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
  },
});

theme = responsiveFontSizes(theme);

export default theme;
