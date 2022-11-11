import { sidebar } from './theme/sidebar';

async function config() {
  return {
    lang: 'ja',
    title: '北大言語学サークル Huling',
    description:
      '2022年3月末にできたばかりの、言語学を勉強したい人たちが集まったサークルです。現在30名程度が参加しています。様々な学年・学部学科の人たちが参加していて、言語学への造詣の深さも多様ですが、週1回ゆるーく活動しています。',

    lastUpdated: true,

    themeConfig: {
      nav: nav,

      sidebar: {
        '/docs/': await sidebar('src/docs/'),
        '/olympiad/': await sidebar('src/olympiad/'),
        '/tools/': await sidebar('src/tools/'),
      },

      editLink: {
        pattern: 'https://github.com/hulinguistics/huling/edit/dev/src/:path',
        text: 'Edit this page on GitHub',
      },

      socialLinks: [{ icon: 'twitter', link: 'https://twitter.com/HU_Linguistic' }],

      footer: {
        copyright: 'Copyright © 2022 Huling',
      },
    },

    head: [
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],
      ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#679fd1' }],
      ['meta', { name: 'msapplication-TileColor', content: '#679fd1' }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
    ],
  };
}

const nav = [
  { text: 'About', link: '/about/' },
  { text: 'Booklet', link: '/booklet/' },
  { text: 'Docs', link: '/docs/grammar/', activeMatch: '/docs/' },
  { text: 'Olympiad', link: '/olympiad/about/', activeMatch: '/olympiad/' },
];

export default config();
