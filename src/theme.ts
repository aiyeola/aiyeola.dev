import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import '@fontsource/jost';
import '@fontsource/quicksand';

const theme = createMuiTheme({
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
  },
  overrides: {},
});

export default theme;

// "Quicksand";
//  "Jost";
