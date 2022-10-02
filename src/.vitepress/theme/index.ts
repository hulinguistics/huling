import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import HLDocAfter from './components/HLDocAfter.vue';
import HLDocFooterBefore from './components/HLDocFooterBefore.vue';
import HLConverter from './components/HLConverter.vue';

import './scss/index.scss';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(HLDocAfter),
      'doc-footer-before': () => h(HLDocFooterBefore),
    });
  },
  enhanceApp({ app }) {
    app.component('HLConverter', HLConverter);
  },
};
