<template>
  <div v-if="show" class="docAfter">
    <HLTitle :title="title" />
    <div class="tags">
      <HLTag v-for="(tag, index) in tags" :key="index" :display="tag" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useData } from 'vitepress';
import HLTitle from '../HLTitle.vue';
import HLTag from '../HLTag.vue';

export default {
  components: {
    HLTitle,
    HLTag,
  },
  setup() {
    const { frontmatter } = useData();

    // タイトルの取得
    const getShow = (value: any) => value.docbefore !== false;
    const getTitle = (value: any) => value.title;
    const getTags = (value: any) => value.tags || [];

    // frontmatterの更新でshowも更新
    const show = ref(getShow(frontmatter.value));
    const title = ref(getTitle(frontmatter.value));
    const tags = ref(getTags(frontmatter.value));
    watch(frontmatter, (c) => {
      show.value = getShow(c);
      title.value = getTitle(c);
      tags.value = getTags(c);
    });

    return {
      frontmatter,
      show,
      title,
      tags,
    };
  },
};
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 10px;
  display: flex;
  gap: 5px 10px;
  flex-wrap: wrap;
}
</style>
