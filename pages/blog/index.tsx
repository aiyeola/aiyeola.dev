import { GetStaticProps } from "next";

import LayoutContainer from "@layouts/Container";
import { getAllFilesFrontMatter } from "@lib/mdx";
import BlogPost from "@components/BlogPost";
import Text from "@components/MuiComposed/Text";

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
      description="Thoughts on the software industry, programming, and add things tech"
    >
        <Text variant="h2" paragraph>
          All Posts
        </Text>
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
