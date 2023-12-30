import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';

// レイアウトで使うコンポーネント
import HLDocBefore from './components/layout/HLDocBefore.vue';
import HLDocAfter from './components/layout/HLDocAfter.vue';
import HLDocFooterBefore from './components/layout/HLDocFooterBefore.vue';

// 記事中で使うコンポーネント
import HLConverter from './components/HLConverter.vue';
import HLConverterAlt from './components/HLConverterAlt.vue';
import HLTags from './components/HLTags.vue';
import HLPages from './components/HLPages.vue';
import HLDecapCMS from './components/HLDecapCMS.vue';

import './scss/index.scss';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 記事の上
      'doc-before': () => h(HLDocBefore),

      // 記事のすぐ下
      'doc-after': () => h(HLDocAfter),

      // 記事や前後記事リンクより下
      'doc-footer-before': () => h(HLDocFooterBefore),
    });
  },
  enhanceApp({ app }) {
    // 文字変換器
    app.component('HLConverter', HLConverter);
    app.component('HLConverterAlt', HLConverterAlt);

    // 記事一覧
    app.component('HLPages', HLPages);

    // タグごとの記事一覧
    app.component('HLTags', HLTags);

    // Netlify CMS
    app.component('HLDecapCMS', HLDecapCMS);
  },
};
