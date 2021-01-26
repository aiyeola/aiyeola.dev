import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import LayoutContainer from '@components/Layouts/Container';

export default function Projects() {
  return (
    <LayoutContainer>
      <>
        <Grid item>
          <Typography >Projects</Typography>
          <Typography>
            The validation of your work is what makes you pro
          </Typography>
        </Grid>
      </>
    </LayoutContainer>
  );
}
