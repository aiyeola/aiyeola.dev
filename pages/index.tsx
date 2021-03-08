import { GetStaticProps } from "next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { getAllFilesFrontMatter } from "@lib/mdx";
import LayoutContainer from "@layouts/Container";
import Link from "@components/Link";
import BlogPost from "@components/BlogPost";
import Subscribe from "@components/Subscribe";

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
          <Typography variant="h1" paragraph>
            Hi, I'm Victor
          </Typography>
          <Typography>
            Welcome to my own corner on the internet, I hope you find this space
            interesting sooner or later! - while you're here you can{" "}
            <Link
              href="/guestbook"
              underline="always"
              color="primary"
              style={{
                fontWeight: "bold",
              }}
            >
              sign my guestbook
            </Link>
            .
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h2" gutterBottom>
            Latest Posts
          </Typography>
        </Grid>

        <Grid item>
          {!sortedBlogPost.length && "No posts found."}
          {sortedBlogPost.map((frontMatter) => (
            <BlogPost key={frontMatter.title} {...frontMatter} />
          ))}
        </Grid>

        <Grid
          item
          style={{
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
