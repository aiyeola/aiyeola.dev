import "@fontsource/jost";
import "@fontsource/quicksand";
import { responsiveFontSizes, createMuiTheme } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "Quicksand",
    h1: {
      fontFamily: "Jost",
    },
    h2: {
      fontFamily: "Jost",
    },
    h3: {
      fontFamily: "Jost",
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
  },
  overrides: {
    MuiLink: {
      root: {},
    },
    MuiToolbar: {
      root: {
        justifyContent: "center",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
