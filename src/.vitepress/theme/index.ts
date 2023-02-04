import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';

// レイアウトで使うコンポーネント
import HLDocBefore from './components/layout/HLDocBefore.vue';
import HLDocAfter from './components/layout/HLDocAfter.vue';
import HLDocFooterBefore from './components/layout/HLDocFooterBefore.vue';

// 記事中で使うコンポーネント
import HLConverter from './components/HLConverter.vue';

import './scss/index.scss';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(HLDocBefore),
      'doc-after': () => h(HLDocAfter),
      'doc-footer-before': () => h(HLDocFooterBefore),
    });
  },
  enhanceApp({ app }) {
    app.component('HLConverter', HLConverter);
  },
};
