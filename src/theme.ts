import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import '@fontsource/jost';
import '@fontsource/quicksand';

let theme = createMuiTheme({
  palette: {},
  typography: {
    fontFamily: 'Quicksand',
    h1: {
      fontFamily: 'Jost',
    },
    h2: {
      fontFamily: 'Jost',
    },
    h3: {
      fontFamily: 'Jost',
    },
    body1: {
      // fontSize: '2rem',
    },
  },
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
