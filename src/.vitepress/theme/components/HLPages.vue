<template>
  <div>
    <div v-for="post in posts" :key="post.frontMatter.title">
      <a :href="post.path.replace('.md', '')">
        <h3>{{ post.frontMatter.title }}</h3>
      </a>
      <HLPageInfo :tags="post.frontMatter.tags" :tag-click="tagClick"></HLPageInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { useData } from 'vitepress';
import HLPageInfo from './HLPageInfo.vue';

export default {
  components: {
    HLPageInfo,
  },
  props: {
    tag: {
      type: String,
      default: undefined,
    },
    tagClick: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
  setup(props) {
    const { theme } = useData();
    const posts = theme.value.posts.filter((post: any) => (props.tag ? post.frontMatter?.tags?.includes(props.tag) : true));

    return {
      theme,
      posts,
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
</style>
