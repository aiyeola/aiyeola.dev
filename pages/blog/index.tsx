import { GetStaticProps } from "next";
import Typography from "@material-ui/core/Typography";

import LayoutContainer from "@layouts/Container";
import { getAllFilesFrontMatter } from "@lib/mdx";
import BlogPost from "@components/BlogPost";

type Posts = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
};

export default function Blog({ posts }: { posts: Posts[] }) {
  const filteredBlogPosts = posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );
  // .filter((frontMatter) =>
  //   frontMatter.title.toLowerCase().includes(searchValue.toLowerCase()),
  // );

  return (
    <LayoutContainer
      title="Blog – Victor Aiyeola"
      description="Thoughts on the software industry, programming, tech, and my personal life."
    >
      <Typography variant="h2" paragraph>
        All Posts
      </Typography>
      {!filteredBlogPosts.length && "No posts found."}
      {filteredBlogPosts.map((frontMatter) => (
        <BlogPost key={frontMatter.title} {...frontMatter} />
      ))}
    </LayoutContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("blog");

  return {
    props: { posts },
  };
};
