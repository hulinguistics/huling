<template>
  <div>
    <div id="comment-light"></div>
    <div id="comment-dark"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'utterances-comment',
  methods: {
    initValine(id, theme) {
      let utterances = window.document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.src = 'https://utteranc.es/client.js';
      utterances.async = true;
      utterances.setAttribute('repo', 'hulinguistics/huling');
      utterances.setAttribute('label', '🕊️comment');
      utterances.setAttribute('issue-term', 'pathname');
      utterances.setAttribute('theme', theme);
      utterances.crossOrigin = 'anonymous';
      window.document.getElementById(id).appendChild(utterances);
    },
  },
  mounted() {
    this.initValine('comment-light', 'github-light');
    this.initValine('comment-dark', 'github-dark');
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
