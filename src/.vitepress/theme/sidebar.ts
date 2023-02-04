import { getPosts } from '../utils/getPosts';
import fs from 'fs-extra';

// サイドバーの生成
export async function sidebar(parant: string, sectionListPath: string) {
  // 記事の親ディレクトリから md ファイルの一覧を取得
  const posts = await getPosts(parant);

  // src/.vitepress/sections/* からセクションのリストを作成
  const sections = JSON.parse(await fs.readFile(sectionListPath, 'utf-8')).filter((section) =>
    // そのセクションに属す記事が無いものを除外
    posts.some((post) => post.frontMatter.section === section.name),
  );

  return sections.map((section) => {
    return {
      text: section.display,
      collapsed: section.collapsed,
      items: posts
        .filter((post) => post.frontMatter.section == section.name)
        .map((post) => {
          return {
            text: post.frontMatter.title,
            link: post.path.replace('src', '').replace('index.md', ''),
          };
        }),
    };
  });
}
