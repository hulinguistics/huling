export default {
  lang: 'ja',
  title: '北大言語学サークル Huling',

  themeConfig: {
    nav: nav(),

    editLink: {
      pattern: 'https://github.com/hulinguistics/huling/edit/dev/src/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [{ icon: 'twitter', link: 'https://twitter.com/HU_Linguistic' }],

    footer: {
      copyright: 'Copyright © 2022 Huling',
    },
  },
};

function nav() {
  return [
    { text: 'About', link: '/about/' },
    { text: 'Booklet', link: '/booklet/' },
    { text: 'language', link: '/language/' },
    { text: 'Olympiad', link: '/olympiad/' },
  ];
}
