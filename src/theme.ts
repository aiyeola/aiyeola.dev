import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {},
  typography: {
    fontFamily: 'Roboto',
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: grey[300],
      },
    },
  },
});

export default theme;
