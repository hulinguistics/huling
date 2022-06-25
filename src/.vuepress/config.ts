module.exports = {
  locales: {
    '/': { lang: 'ja' }
  },
  title: '北大言語学サークル Huling',
  themeConfig: {
    sidebar: "auto",
    nav: [
      { text: 'About', link: '/about/'},
      { text: 'Booklet', link: '/booklet/'},
      { text: 'Languages', link: '/languages/'},
      { text: 'Olympiad', link: '/olympiad/'},
      { text: 'Twitter', link: 'https://twitter.com/HU_Linguistic' },
    ],

    docsRepo: 'hulinguistics/huling',
    docsDir: 'src',
    docsBranch: 'dev',
    editLinks: true,
  }
}
