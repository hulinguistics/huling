<template>
  <div>
    <div v-for="post in posts" :key="post.frontMatter.title">
      <a :href="post.path.replace('.md', '')">
        <h3>{{ post.frontMatter.title }}</h3>
      </a>
      <div class="tags">
        <HLTag v-for="ptag in post.frontMatter.tags" :key="ptag" :name="ptag" @click="tagClick(ptag)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useData } from 'vitepress';
import HLTag from './HLTag.vue';

export default {
  components: {
    HLTag,
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

.tags {
  margin-top: 10px;
  display: flex;
  gap: 5px 10px;
  flex-wrap: wrap;
}
</style>
