import { getPosts } from './getPosts';
import fs from 'fs-extra';

// サイドバーの生成
export async function sidebar(parant: string, categoryListPath: string) {
  // 記事の親ディレクトリから md ファイルの一覧を取得
  const posts = await getPosts(parant);

  // src/.vitepress/categories/* からセクションのリストを作成
  const categories = JSON.parse(await fs.readFile(categoryListPath, 'utf-8')).filter((category) =>
    // そのセクションに属す記事が無いものを除外
    posts.some((post) => post.frontMatter.category === category.name),
  );

  return categories.map((category) => {
    return {
      text: category.display,
      collapsed: category.collapsed,
      items: posts
        .filter((post) => post.frontMatter.category == category.name)
        .map((post) => {
          return {
            text: post.frontMatter.title,
            link: post.path.replace('src', '').replace('index.md', ''),
          };
        })
        .sort((a: any, b: any) =>
          a.link.replace('.md', '') > b.link.replace('.md', '') ? 1 : a.link.replace('.md', '') < b.link.replace('.md', '') ? -1 : 0,
        ),
    };
  });
}
