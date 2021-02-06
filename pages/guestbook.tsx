import redis from "@lib/redis";
import Container from "@layouts/Container";
// import Guestbook from "@components/Guestbook";

export default function GuestbookPage() {
  return (
    <Container
      title="Guestbook – Victor Aiyeola"
      description="Sign my digital guestbook and share some wisdom."
    >
      Bla vla
    </Container>
  );
}

// export async function getStaticProps() {
//   const entries = (await redis.hvals('guestbook'))
//     .map((entry) => JSON.parse(entry))
//     .sort((a, b) => b.id - a.id);

//   return {
//     props: {
//       initialEntries: entries
//     },
//     revalidate: 60
//   };
// }
