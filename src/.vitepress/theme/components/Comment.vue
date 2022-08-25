<template>
  <div>
    <div id="comment-light"></div>
    <div id="comment-dark"></div>
  </div>
</template>

<script lang="ts">
import { useData } from 'vitepress';

export default {
  name: 'UtterancesComment',
  setup() {
    const { frontmatter } = useData();
    const title = frontmatter.value.title;
    return {
      title,
    };
  },
  mounted() {
    this.initValine('comment-light', 'github-light', 'Comment: ' + this.title);
    this.initValine('comment-dark', 'github-dark', 'Comment: ' + this.title);
  },
  methods: {
    initValine(id: string, theme: string, issueTerm: string) {
      let utterances = window.document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.src = 'https://utteranc.es/client.js';
      utterances.async = true;
      utterances.setAttribute('repo', 'hulinguistics/huling');
      utterances.setAttribute('label', '🕊️comment');
      utterances.setAttribute('issue-term', issueTerm);
      utterances.setAttribute('theme', theme);
      utterances.crossOrigin = 'anonymous';
      window.document.getElementById(id).appendChild(utterances);
    },
  },
};
</script>

<style scoped>
#comment-light,
#comment-dark {
  margin-top: 30px;
}
html.dark #comment-light,
html:not(.dark) #comment-dark {
  display: none;
}
</style>
