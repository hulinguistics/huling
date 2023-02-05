import { sidebar } from './theme/sidebar';
import footnote from 'markdown-it-footnote';
import MarkdownItMergeCells from 'markdown-it-merge-cells';

export default (async () => {
  return {
    lang: 'ja',
    title: '北大言語学サークル Huling',
    description:
      '2022年3月末にできたばかりの、言語学を勉強したい人たちが集まったサークルです。現在30名程度が参加しています。様々な学年・学部学科の人たちが参加していて、言語学への造詣の深さも多様ですが、週1回ゆるーく活動しています。',

    // 最終更新の表示
    lastUpdated: true,

    // テーマ設定
    themeConfig: {
      // ページ上部の nav
      nav: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about/' },
        { text: 'Booklet', link: '/booklet/' },
        { text: 'Docs', link: '/docs/grammar/', activeMatch: '/docs/' },
        { text: 'Olympiad', link: '/olympiad/about/', activeMatch: '/olympiad/' },
      ],

      // nav 上のソーシャルリンク
      socialLinks: [{ icon: 'twitter', link: 'https://twitter.com/HU_Linguistic' }],

      // ページ左側の sidebar
      sidebar: {
        '/docs/': await sidebar('src/docs/', 'src/.vitepress/categories/docs.json'),
        '/olympiad/': await sidebar('src/olympiad/', 'src/.vitepress/categories/olympiad.json'),
      },

      // github 上編集ページに飛ぶリンク
      editLink: {
        pattern: 'https://github.com/hulinguistics/huling/edit/dev/src/:path',
        text: 'Edit this page on GitHub',
      },

      // フッター
      footer: {
        copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://twitter.com/HU_Linguistic" target="_blank" rel="noopener">Huling</a>`,
      },
    },

    // head 内の値とか
    head: [
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],
      ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#679fd1' }],
      ['meta', { name: 'msapplication-TileColor', content: '#679fd1' }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
    ],

    // markdown 関連の設定
    markdown: {
      config: (md) => {
        // markdown-it プラグイン
        md.use(footnote);
        md.use(MarkdownItMergeCells);
      },
    },
  };
})();
