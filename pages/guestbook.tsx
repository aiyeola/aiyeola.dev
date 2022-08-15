import Grid from "@mui/material/Grid";
import Text from "@components/MuiComposed/Text";

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
        <Text
          variant="h2"
          gutterBottom
          style={{
            letterSpacing: "0.13rem",
          }}
        >
          Guestbook
        </Text>
        <Text paragraph>
          Leave a comment below. It could be anything – appreciation,
          information, wisdom, or even humor. Surprise me!
        </Text>
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
