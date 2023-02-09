<template>
  <div v-if="authors[0]">
    <p class="HLAuthor">
      Author<span v-if="authors[1] !== undefined">s</span>:
      <span v-for="(author, index) in authors" :key="author.name">
        <span v-if="index !== 0">, </span>
        <a v-if="author.url" :href="author.url">{{ author.name }}</a>
        <span v-else>{{ author.name }}</span>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useData } from 'vitepress';

export default {
  setup() {
    const { frontmatter } = useData();

    const getAuthor = (value: any) => {
      const authorObject = (author: any) => ({ name: author.name || author, url: author.url });

      if (!value.author?.length) {
        return [];
      } else if (typeof value.author === 'object' && value.author[0] !== undefined) {
        // author が複数人のとき
        return value.author.map(authorObject);
      } else {
        // author が一人のとき
        return [authorObject(value.author)];
      }
    };

    // frontmatterの更新でauthorsも更新
    const authors = ref(getAuthor(frontmatter.value));
    watch(frontmatter, (c) => {
      authors.value = getAuthor(c);
    });

    return {
      frontmatter,
      authors,
    };
  },
};
</script>

<style lang="scss" scoped>
.HLAuthor {
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);

  @media (min-width: 640px) {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
