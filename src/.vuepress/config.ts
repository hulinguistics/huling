import { defaultTheme } from '@vuepress/theme-default';
import { searchPlugin } from '@vuepress/plugin-search';

module.exports = {
  locales: {
    '/': { lang: 'ja' },
  },
  title: '北大言語学サークル Huling',
  theme: defaultTheme({
    navbar: [
      { text: 'About', link: '/about/' },
      { text: 'Booklet', link: '/booklet/' },
      { text: 'Languages', link: '/languages/' },
      { text: 'Olympiad', link: '/olympiad/' },
      { text: 'Twitter', link: 'https://twitter.com/HU_Linguistic' },
    ],

    docsRepo: 'hulinguistics/huling',
    docsDir: 'src',
    docsBranch: 'dev',
    editLink: true,
    contributors: false,
  }),
  plugins: [searchPlugin()],
};
