import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import LayoutContainer from "src/layouts/Container";

export default function Projects() {
  return (
    <LayoutContainer title="Projects - Victor Aiyeola">
      <Grid item>
        <Typography
          style={{
            letterSpacing: "0.13rem",
          }}
        >
          Projects
        </Typography>
        <Typography>
          The validation of your work is what makes you pro
        </Typography>
      </Grid>
    </LayoutContainer>
  );
}
