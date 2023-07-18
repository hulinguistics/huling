<template>
  <div class="HLDocBefore" v-if="page.frontmatter.docbefore !== false">
    <HLTitle :title="page.frontmatter.title" />
    <HLPageInfo :tags="page.frontmatter.tags"></HLPageInfo>
  </div>
</template>

<script lang="ts">
import { useData } from 'vitepress';
import HLTitle from '../HLTitle.vue';
import HLPageInfo from '../HLPageInfo.vue';

export default {
  components: {
    HLTitle,
    HLPageInfo,
  },
  setup() {
    const { page } = useData();
    return { page };
  },
};
</script>

<style lang="scss" scoped>
.HLDocBefore {
  margin-bottom: 24px;
}

.tags {
  margin-top: 10px;
  display: flex;
  gap: 5px 10px;
  flex-wrap: wrap;
}
</style>
