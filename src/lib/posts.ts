import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(data.date).toLocaleDateString(
      'en-GB',
      options
    );
    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug,
      ...frontmatter,
    };
  });

  // Sort posts by date
  //@ts-ignore
  return allPostsData.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.mdx$/, ''),
    },
  }));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const postContent = fs.readFileSync(fullPath, 'utf8');

  return postContent;
}
