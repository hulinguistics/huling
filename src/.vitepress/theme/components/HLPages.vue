<template>
  <div>
    <div v-for="post in posts" :key="post.frontMatter.title">
      <a :href="post.path.replace('index.md', '')">
        <h3>{{ post.frontMatter.title }}</h3>
      </a>
      <div class="tags">
        <HLTag v-for="ptag in post.frontMatter.tags" :key="ptag" :name="ptag" />
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
  },
  setup(props) {
    const { theme } = useData();
    const posts = theme.value.posts
      .filter((post: any) => (props.tag ? post.frontMatter?.tags?.includes(props.tag) : true))
      .map((post: any) => {
        let p = post;
        p.path = post.path.replace('index.md', '');
        return p;
      });

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
