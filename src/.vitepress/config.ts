export default {
  lang: 'ja',
  title: '北大言語学サークル Huling',
  description:
    '2022年3月末にできたばかりの、言語学を勉強したい人たちが集まったサークルです。現在30名程度が参加しています。様々な学年・学部学科の人たちが参加していて、言語学への造詣の深さも多様ですが、週1回ゆるーく活動しています。',

  _lastUpdated: true,

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/docs/': sidebarDocs(),
      '/olympiad/': sidebarOlympiad(),
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

function nav() {
  return [
    { text: 'About', link: '/about/' },
    { text: 'Booklet', link: '/booklet/' },
    { text: 'Docs', link: '/docs/grammar/', activeMatch: '/docs/' },
    { text: 'Olympiad', link: '/olympiad/about/', activeMatch: '/olympiad/' },
  ];
}

function sidebarDocs() {
  return [
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
      items: [
        { text: 'ドイツ語 / Deutsch', link: '/docs/deu/' },
        { text: 'フランス語 / Français', link: '/docs/fra/' },
        { text: 'スペイン語/ Español', link: '/docs/spa/' },
        { text: 'ロシア語/ Русский', link: '/docs/rus/' },
        { text: '中国語 / 汉语 (普通话)', link: '/docs/zho/' },
        { text: '韓国朝鮮語 / 한국어', link: '/docs/kor/' },
        { text: 'ラテン語 / Latina', link: '/docs/lat/' },
        { text: '古典ギリシア語 / Ἑλληνική', link: '/docs/grc/' },
      ],
    },
  ];
}

function sidebarOlympiad() {
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
        { text: 'JOL2022-4 ヤオ語', link: '/olympiad/jol/2022/4/' },
        { text: 'JOL2022-5 ティンリン語', link: '/olympiad/jol/2022/5/' },
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
