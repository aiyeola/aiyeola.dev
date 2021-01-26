import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Header from '@components/Layouts/Header';
import Footer from '@components/Layouts/Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    maxWidth: '70vw',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      maxWidth: '90vw',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
    },
  },
}));

export default function Container({ children }: { children: React.ReactNode }) {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item container direction="column" className={classes.container}>
        <Header />
        {children}
        <Footer />
      </Grid>
    </Grid>
  );
}
