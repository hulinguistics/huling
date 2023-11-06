import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';
import { getGitLastUpdated } from './git.js';

// parent 下の拡張子 ext を持つファイルのパスと中身を取得
export async function getFiles(parent: string, ext: string[]) {
  return await Promise.all(
    (
      await globby(
        ext.map((e) => '**.' + e),
        {
          ignore: ['node_modules', 'README.md'],
        },
      )
    )
      .filter((path) => path.startsWith(parent))
      .map(async (path) => {
        const content = await fs.readFile(path, 'utf-8');
        return { path, content };
      }),
  );
}

// parent 下の記事の取得
export const getPosts = async (parent: string) =>
  await Promise.all(
    (
      await getFiles(parent, ['md'])
    ).map(async (file) => {
      const { content, data } = matter(file.content);
      return {
        path: file.path.replace('src', ''),
        frontMatter: data,
        content: content,
        lastUpdated: await getGitLastUpdated(file.path),
      };
    }),
  );
