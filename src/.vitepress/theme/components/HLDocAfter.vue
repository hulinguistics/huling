<template>
  <div id="docAfter">
    <HLUtterances :key="issueTerm" class="light" repo="hulinguistics/huling" label="🕊️comment" :issue-term="issueTerm" />
    <HLUtterances :key="issueTerm" class="dark" repo="hulinguistics/huling" label="🕊️comment" :issue-term="issueTerm" theme="github-dark" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import HLUtterances from './HLUtterances.vue';
import { watch } from '@vue/runtime-core';

export default {
  components: {
    HLUtterances,
  },
  setup() {
    const { frontmatter } = useData();

    // frontmatterの更新でissueTermも更新
    const issueTerm = ref('Comment: ' + frontmatter.value.title);
    watch(frontmatter, (c) => {
      issueTerm.value = 'Comment: ' + c.title;
    });

    return {
      issueTerm,
    };
  },
};
</script>

<style scoped>
#docAfter {
  margin-top: 30px;
}
html.dark .light,
html:not(.dark) .dark {
  display: none;
}
</style>
