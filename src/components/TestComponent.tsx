import Grid from '@material-ui/core/Grid';

export default function TestComponent({ children }: {children: any}) {
  return (
    <Grid container direction="column">
      <Grid item>{children}</Grid>
    </Grid>
  );
}
