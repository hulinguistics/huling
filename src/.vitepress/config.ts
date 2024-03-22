import { sidebar } from './scripts/sidebar';
import { getPosts } from './scripts/getPosts';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItMergeCells from 'markdown-it-merge-cells';
import markdownItKatex from 'markdown-it-katex';

export default (async () => {
  return {
    lang: 'ja',
    title: '北大言語学サークル Huling',
    description:
      '2022年3月末にできたばかりの、言語学を勉強したい人たちが集まったサークルです。現在30名程度が参加しています。様々な学年・学部学科の人たちが参加していて、言語学への造詣の深さも多様ですが、週1回ゆるーく活動しています。',

    // 最終更新の表示
    lastUpdated: true,

    // 拡張子 .html を隠す
    cleanUrls: true,

    // head 内の値とか
    head: [
      [
        'link',
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],
      ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#679fd1' }],
      ['meta', { name: 'msapplication-TileColor', content: '#679fd1' }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
    ],

    // markdown 関連の設定
    markdown: {
      config: (md) => {
        // markdown-it プラグイン
        md.use(markdownItFootnote);
        md.use(markdownItMergeCells);
        md.use(markdownItKatex);
      },
    },

    // テーマ設定
    themeConfig: {
      // ページ上部の nav
      nav: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Booklet', link: '/booklet' },
        { text: 'note', link: 'https://note.com/huling/m/m8a70e16198cc' },
        { text: 'Olympiad', link: 'https://note.com/huling/m/mcd1d0bd424ad' },
        { text: 'Tools', link: '/tools/conv', activeMatch: '/tools/' },
        { text: 'Tags', link: '/tags' },
      ],

      // nav 上のソーシャルリンク
      socialLinks: [
        { icon: 'twitter', link: 'https://twitter.com/HU_Linguistic' },
        { icon: 'instagram', link: 'https://instagram.com/hu_linguistic' },
      ],

      // ページ左側の sidebar
      sidebar: {
        '/docs/': [
          {
            text: '言語学の概説',
            items: [
              {
                text: '文法用語の解説',
                link: 'https://note.com/huling/n/nf91fa59c260b?magazine_key=m8a70e16198cc',
              },
            ],
          },
          {
            text: '言語ごとの概説',
            items: [
              {
                text: 'アイヌ語 / aynu itak',
                link: 'https://note.com/_pccm4/n/nb6fc1700a166?magazine_key=md52cc1799218',
              },
              { text: 'アラビア語 / العربية', link: '/docs/ara' },
              { text: '古教会スラヴ語 / словѣньскъ ѩзꙑкъ', link: '/docs/chu' },
              {
                text: 'ドイツ語 / Deutsch',
                link: 'https://note.com/xiupos/n/nf230d839ea10?magazine_key=md52cc1799218',
              },
              { text: 'フィンランド語 / Suomi', link: '/docs/fin' },
              { text: 'フランス語 / Français', link: '/docs/fra' },
              { text: '古典ギリシア語 / Ἑλληνική', link: '/docs/grc' },
              { text: '韓国朝鮮語 / 한국어', link: '/docs/kor' },
              { text: 'ラテン語 / Latina', link: '/docs/lat' },
              { text: 'ポーランド語 / Polski', link: '/docs/pol' },
              { text: 'ロシア語 / Русский', link: '/docs/rus' },
              { text: 'スペイン語 / Español', link: '/docs/spa' },
              {
                text: 'トルコ語 / Türkçe',
                link: 'https://note.com/kuch1nawa/n/n33e99e0547d0?magazine_key=md52cc1799218',
              },
              { text: '中国語 / 汉语 (普通话)', link: '/docs/zho' },
            ],
          },
          {
            text: '北大の第二外国語',
            items: [
              {
                text: '第二外国語解説',
                link: 'https://note.com/huling/n/n3f6a86981368?magazine_key=m23eaa6287db4',
              },
              {
                text: '初習ドイツ語',
                link: 'https://note.com/ncho_014/n/n522a4905d54d?magazine_key=m23eaa6287db4',
              },
              { text: '初習フランス語', link: '/docs/nigai-fra' },
              {
                text: '初習ロシア語',
                link: 'https://note.com/xiupos/n/ndd8801567fa6?magazine_key=m23eaa6287db4',
              },
              { text: '初習スペイン語', link: '/docs/nigai-spa' },
              { text: '初習中国語', link: '/docs/nigai-zho' },
            ],
          },
        ],
        '/tools/': await sidebar('src/tools/', 'src/.vitepress/categories/tools.json'),
      },

      // github 上編集ページに飛ぶリンク
      editLink: {
        pattern: 'https://github.com/hulinguistics/huling/edit/dev/src/:path',
        text: 'Edit this page on GitHub',
      },

      // 記事一覧
      posts: await getPosts('src/'),

      // フッター
      footer: {
        copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://twitter.com/HU_Linguistic" target="_blank" rel="noopener">Huling</a>`,
      },
    },
  };
})();
