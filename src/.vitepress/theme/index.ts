import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Comment from './components/Comment.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment),
    });
  },
};
