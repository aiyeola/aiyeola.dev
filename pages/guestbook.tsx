import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import redis from "@lib/redis";
import Container from "@layouts/Container";
import Guestbook from "@components/Guestbook";

interface Entries {
  id: number;
  email: string;
  updated_at: Date;
  body: string;
  created_by: string;
}

export default function GuestbookPage({
  initialEntries,
}: {
  initialEntries: Entries[];
}) {
  return (
    <Container
      title="Guestbook – Victor Aiyeola"
      description="Sign my digital guestbook and share some wisdom."
    >
      <Grid item>
        <Typography variant="h1" gutterBottom>
          Guestbook
        </Typography>
        <Typography paragraph>
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </Typography>
      </Grid>
      <Grid item>
        <Guestbook initialEntries={initialEntries} />
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = (await redis.hvals("guestbook"))
    .map((entry) => JSON.parse(entry))
    .sort((a, b) => b.id - a.id);

  return {
    props: {
      initialEntries: entries,
    },
    revalidate: 60,
  };
}
