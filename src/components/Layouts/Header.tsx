import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Grid item container style={{ marginBottom: '1rem' }}>
      <Grid item>
        <Avatar
          alt="my profile image"
          src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1611593557/projects/passport_v3a6x0.jpg"
          className={classes.large}
        />
      </Grid>
    </Grid>
  );
}
