import { useState } from "react";
import { GetStaticProps } from "next";
import { parseISO, format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";

import { getAllFilesFrontMatter } from "@lib/mdx";
import LayoutContainer from "@layouts/Container";
import Link from "@components/Link";

type Posts = {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  slug: string;
};

export default function Home({ posts }: { posts: Posts[] }) {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredBlogPosts = posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );
  // .filter((frontMatter) =>
  //   frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()),
  // );

  return (
    <LayoutContainer>
      <>
        <Grid
          item
          style={{
            marginBottom: "2rem",
          }}
        >
          <Typography variant="h1" paragraph>
            Hi, I'm Victor
          </Typography>
          <Typography>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later!
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h2" gutterBottom>
            Latest Posts
          </Typography>
        </Grid>

        <Grid item>
          {!filteredBlogPosts.length && "No posts found."}
          {filteredBlogPosts.map(({ title, slug, publishedAt }) => (
            <Grid
              item
              container
              direction={matchesXS ? "column" : "row"}
              justify={matchesXS ? undefined : "space-between"}
              key={slug}
              style={{
                marginBottom: "2rem",
              }}
            >
              <Grid
                item
                style={{
                  maxWidth: matchesXS ? "100%" : "75%",
                }}
              >
                <Link href={`/blog/[slug]`} as={`/blog/${slug}`}>
                  <Typography
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {format(parseISO(publishedAt), "MMMM dd, yyyy")}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </>
    </LayoutContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("blog");
  return {
    props: { posts },
  };
};
