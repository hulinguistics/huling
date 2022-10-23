import { getPosts } from '../utils/getPosts';

export async function sidebar(parant: string) {
  const posts = await getPosts(parant);
  const sections = Array.from(new Set(posts.map((post) => post.frontMatter.section).filter((post) => post)));

  return sections
    .map((section) => {
      return {
        text: section,
        items: posts
          .filter((post) => post.frontMatter.section == section)
          .map((post) => {
            return {
              text: post.frontMatter.title,
              link: post.path.replace('src', '').replace('index.md', ''),
            };
          }),
      };
    })
    .sort((a, b) => {
      if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
      else if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
      else return 0;
    });
}
