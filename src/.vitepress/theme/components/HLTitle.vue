<template>
  <h1 class="HLTitle">{{ title }}</h1>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useData } from 'vitepress';

export default {
  setup() {
    const { frontmatter } = useData();

    // タイトルの取得
    const getTitle = (value: any) => value.title;

    // frontmatterの更新でtitleも更新
    const title = ref(getTitle(frontmatter.value));
    watch(frontmatter, (c) => {
      title.value = getTitle(c);
    });

    return {
      frontmatter,
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.HLTitle {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 28px;
  position: relative;
  font-weight: 600;
  outline: none;
  overflow-wrap: break-word;
  margin: 0;

  @media (min-width: 768px) {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 32px;
  }
}
</style>
