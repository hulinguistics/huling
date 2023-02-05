<template>
  <div>
    <div class="tags">
      <div v-for="ptag in tags" :key="ptag.name">
        <HLTag :name="ptag.name" @click="setTag(ptag.name)" />
        ({{ ptag.count }})
      </div>
    </div>

    <div v-if="tag">
      <h2 class="tag_title">{{ tag }}</h2>
      <HLPages :tag="tag" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import HLTag from './HLTag.vue';
import HLPages from './HLPages.vue';

export default {
  components: {
    HLTag,
    HLPages,
  },
  setup() {
    const { theme } = useData();

    // タグ一覧の生成
    let tags: { name: string; count: number }[] = [];
    theme.value.posts.forEach((post) => {
      post.frontMatter?.tags?.forEach((tag) => {
        if (tags.some((t) => t.name == tag)) {
          tags.forEach((t) => {
            if (t.name == tag) t.count++;
          });
        } else {
          tags.push({ name: tag, count: 1 });
        }
      });
    });
    tags.sort((a, b) => b.count - a.count);

    // クエリパラメータからタグを取得
    const qparams = new URLSearchParams(location.href.split('?')[1]);
    const getTag = () => decodeURIComponent(qparams.get('tag') || '') || undefined;
    const tag = ref(getTag());
    const setTag = (t: string) => {
      tag.value = t;
    };

    return {
      tag,
      tags,
      theme,
      setTag,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  display: flex;
  gap: 0.1em;

  &::before {
    content: '#';
  }
}

.tags {
  margin-top: 10px;
  display: flex;
  gap: 5px 15px;
  flex-wrap: wrap;
  color: var(--vp-c-text-2);

  > div {
    display: flex;
    gap: 5px;
  }
}
</style>
