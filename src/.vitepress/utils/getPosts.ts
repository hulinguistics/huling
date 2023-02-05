import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';

// parent 以下から拡張子 ext を持つファイルのパスを取得
export async function getFilePaths(parent: string, ext: string[]) {
  const paths = (
    await globby(
      ext.map((e) => '**.' + e),
      {
        ignore: ['node_modules', 'README.md'],
      },
    )
  ).filter((path) => path.includes(parent));
  return paths;
}

// parent 以下から拡張子 ext を持つファイルの中身を取得
export async function getContents(parent: string, ext: string[]) {
  const contents = await Promise.all(
    (
      await getFilePaths(parent, ext)
    ).map(async (path) => {
      return await fs.readFile(path, 'utf-8');
    }),
  );
  return contents;
}

// parent 以下の記事を取得
export async function getPosts(parent: string) {
  const posts = await Promise.all(
    (
      await getFilePaths(parent, ['md'])
    ).map(async (path) => {
      const content = await fs.readFile(path, 'utf-8');
      const { data } = matter(content);
      return { content: content, frontMatter: data, path: path.replace('src', '') };
    }),
  );
  return posts;
}
