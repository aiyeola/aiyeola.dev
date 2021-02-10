import { GetStaticProps } from "next";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import LayoutContainer from "@layouts/Container";
import { getAllFilesFrontMatter } from "@lib/mdx";
import Subscribe from "@components/Subscribe";
import NewsletterLink from "@components/NewsletterLink";

type Newsletter = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
};

export default function Newsletter({
  newsletters,
}: {
  newsletters: Newsletter[];
}) {
  return (
    <LayoutContainer title="Newsletter – Victor Aiyeola">
      <Grid
        item
        style={{
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h1" paragraph>
          Newsletter
        </Typography>
        <Typography>
          My newsletter provides a behind-the-scenes look into what I'm working
          on and writing about. I frequently share some of my favorite articles
          I've read, as well as anything fascinating about technology.
        </Typography>
      </Grid>

      <Subscribe />

      <Grid
        item
        style={{
          marginTop: "1rem",
        }}
      >
        <Typography variant="h3" paragraph>
          Archive
        </Typography>
        <Box>
          <ul>
            {newsletters
              .sort(
                (
                  a: { publishedAt: string | number | Date },
                  b: { publishedAt: string | number | Date },
                ) =>
                  Number(new Date(b.publishedAt)) -
                  Number(new Date(a.publishedAt)),
              )
              .map(
                (
                  frontMatter: JSX.IntrinsicAttributes & {
                    slug: any;
                    publishedAt: any;
                    title: string;
                  },
                ) => (
                  <NewsletterLink key={frontMatter.title} {...frontMatter} />
                ),
              )}
          </ul>
        </Box>
      </Grid>
    </LayoutContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const newsletters = await getAllFilesFrontMatter("newsletter");

  return {
    props: { newsletters },
  };
};
