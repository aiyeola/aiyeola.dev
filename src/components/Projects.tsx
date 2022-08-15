import Grid from "@mui/material/Grid";
import Text from "@components/MuiComposed/Text";

import LayoutContainer from "src/layouts/Container";

export default function Projects() {
  return (
    <LayoutContainer title="Projects - Victor Aiyeola">
      <Grid item>
        <Text
          style={{
            letterSpacing: "0.13rem",
          }}
        >
          Projects
        </Text>
        <Text>
          The validation of your work is what makes you pro
        </Text>
      </Grid>
    </LayoutContainer>
  );
}
