import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';

export async function getMDFilePaths(parent: string) {
  const paths = (
    await globby(['**.md'], {
      ignore: ['node_modules', 'README.md'],
    })
  ).filter((path) => path.includes(parent));
  return paths;
}

export async function getContents(parent: string) {
  const contents = await Promise.all(
    (
      await getMDFilePaths(parent)
    ).map(async (path) => {
      return await fs.readFile(path, 'utf-8');
    }),
  );
  return contents;
}

export async function getPosts(parent: string) {
  const posts = await Promise.all(
    (
      await getMDFilePaths(parent)
    ).map(async (path) => {
      const content = await fs.readFile(path, 'utf-8');
      const { data } = matter(content);
      return { content: content, frontMatter: data, path: path.replace('src', '') };
    }),
  );

  return posts;
}
