import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';

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
      .filter((path) => path.includes(parent))
      .map(async (path) => {
        const content = await fs.readFile(path, 'utf-8');
        return { path, content };
      }),
  );
}

// parent 下の記事の取得
export async function getPosts(parent: string) {
  const posts = await Promise.all(
    (
      await getFiles(parent, ['md'])
    ).map(async (file) => {
      const { content, data } = matter(file.content);
      return {
        path: file.path.replace('src', ''),
        frontMatter: data,
        content: content,
      };
    }),
  );
  return posts;
}
