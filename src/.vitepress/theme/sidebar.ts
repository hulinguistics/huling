import { globby } from 'globby';
import matter from 'gray-matter';
import fs from 'fs-extra';
import { listISO639_2 } from './ISO639_2';

export async function sidebarDocs() {
  const paths = await Promise.all(
    (
      await getMDFilePaths()
    )
      .filter((item) => item.includes('src/docs/'))
      .filter((item) => item.replace('src/docs/', '').indexOf('/') == 3)
      .filter((item) => listISO639_2.includes(item.replace('src/docs/', '').slice(0, 3)))
      .map(async (item) => {
        return item;
      }),
  );
  const indices = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8');
      const { data } = matter(content);
      return { text: data.title, link: item.replace('src', '') };
    }),
  );

  return await [
    {
      text: '言語学の概説',
      items: [{ text: '文法用語の解説', link: '/docs/grammar/' }],
    },
    {
      text: '言語の比較',
      items: [{ text: '各言語の世界人権宣言', link: '/docs/udhr/' }],
    },
    {
      text: '言語ごとの概説',
      items: indices,
    },
  ];
}

export function sidebarOlympiad() {
  return [
    {
      text: '言語学オリンピックについて',
      items: [{ text: '「言語学オリンピック」とは？', link: '/olympiad/about/' }],
    },
    {
      text: 'オリンピック問題解説集',
      items: [
        { text: 'JOL2022-1 タグバヌワ文字', link: '/olympiad/jol/2022/1/' },
        { text: 'JOL2022-2 タワラ語', link: '/olympiad/jol/2022/2/' },
        { text: 'JOL2019-4 イヌクティトゥット語', link: '/olympiad/jol/2019/4/' },
        { text: 'JOL2018-1 主の祈り', link: '/olympiad/jol/2018/1/' },
        { text: 'JOL2017-3 モンゴル語', link: '/olympiad/jol/2017/3/' },
        { text: 'APLO2022-1 パナラ語', link: '/olympiad/aplo/2022/1/' },
        { text: 'UKLO2021R1-1 オガム文字', link: '/olympiad/uklo/2021/1/1/' },
        { text: 'UKLO2021R1-2 カビル語', link: '/olympiad/uklo/2021/1/2/' },
        { text: 'UKLO2021R1-3 ワアマ語', link: '/olympiad/uklo/2021/1/3/' },
      ],
    },
  ];
}

async function getMDFilePaths() {
  const paths = await globby(['**.md'], {
    ignore: ['node_modules', 'README.md'],
  });
  return paths;
}
