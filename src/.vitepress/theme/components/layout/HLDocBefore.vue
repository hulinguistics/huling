<template>
  <div v-if="show" class="docAfter">
    <HLTitle :title="title" />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useData } from 'vitepress';
import HLTitle from '../HLTitle.vue';

export default {
  components: {
    HLTitle,
  },
  setup() {
    const { frontmatter } = useData();

    // タイトルの取得
    const getShow = (value: any) => value.docbefore !== false;
    const getTitle = (value: any) => value.title;

    // frontmatterの更新でshowも更新
    const show = ref(getShow(frontmatter.value));
    const title = ref(getTitle(frontmatter.value));
    watch(frontmatter, (c) => {
      show.value = getShow(c);
      title.value = getTitle(c);
    });

    return {
      frontmatter,
      show,
      title,
    };
  },
};
</script>

<style lang="scss" scoped></style>
