import { GetStaticProps } from "next";
import Grid from "@mui/material/Grid";

import { getAllFilesFrontMatter } from "@lib/mdx";
import LayoutContainer from "@layouts/Container";
import Link from "@components/Link";
import BlogPost from "@components/BlogPost";
import Subscribe from "@components/Subscribe";
import Text from "@components/MuiComposed/Text";

type Posts = {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  slug: string;
};

export default function Home({ posts }: { posts: Posts[] }) {
  const sortedBlogPost = posts
  .sort(
    (a, b) =>
    Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .slice(0, 3);

  return (
    <LayoutContainer>
      <>
        <Grid
          item
          style={{
            marginBottom: "2rem",
          }}
        >
          <Text
            variant="h2"
            paragraph
            sx={{
              letterSpacing: "0.13rem",
            }}
          >
            Hi, I'm Victor
          </Text>
          <Text>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later! - while you're here you can{" "}
            <Link
              href="/guestbook"
              underline="always"
              color="primary"
              sx={{
                fontWeight: "bold",
              }}
            >
              sign my guestbook
            </Link>
            .
          </Text>
        </Grid>

        <Grid item>
          <Text variant="h3" gutterBottom>
            Latest Posts
          </Text>
        </Grid>

        <Grid item>
          {!sortedBlogPost.length && "No posts found."}
          {sortedBlogPost.map((frontMatter) => (
            <BlogPost key={frontMatter.title} {...frontMatter} />
          ))}
        </Grid>

        <Grid
          item
          sx={{
            marginTop: "1rem",
          }}
        >
          <Subscribe />
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
