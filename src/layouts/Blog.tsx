import { parseISO, format } from 'date-fns';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Container from "@layouts/Container";

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Victor Aiyeola`}
      description={frontMatter.summary}
      image={`https://leerob.io${frontMatter.image}`}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <>
        <Grid item style={{ marginBottom: "2rem" }}>
          <Typography variant="h2" style={{ lineHeight: 1 }} paragraph>
            {frontMatter.title}
          </Typography>
          <Typography>{frontMatter.date}</Typography>
        </Grid>
        <Grid item>{content}</Grid>
      </>
    </Container>
  );
}
