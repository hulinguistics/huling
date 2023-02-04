<template>
  <div v-if="show" class="docAfter">
    <HLTitle />
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

    // frontmatterの更新でshowも更新
    const show = ref(getShow(frontmatter.value));
    watch(frontmatter, (c) => {
      show.value = getShow(c);
    });

    return {
      frontmatter,
      show,
    };
  },
};
</script>

<style lang="scss" scoped></style>
