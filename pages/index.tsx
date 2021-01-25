import Link from 'next/link';
import { GetStaticProps } from 'next';

import { getSortedPosts } from '@lib/posts';

type Posts = {
  date: string;
  title: string;
  slug: string;
};

export default function Home({ allPostsData }: { allPostsData: Posts[] }) {
  return (
    <>
      <section>
        <p>
          I'm a software developer, I like all things JavaScript... I love food
          😋
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ slug, date, title }) => (
            <li key={slug}>
              <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();
  return {
    props: { allPostsData },
  };
};
