<template>
  <div>
    <div v-for="post in posts" :key="post.frontMatter.title">
      <a :href="post.path.replace('.md', '')">
        <h3>{{ post.frontMatter.title }}</h3>
      </a>
      <HLPageInfo :tags="post.frontMatter.tags" :tag-click="tagClick" :timestamp="post.lastUpdated"></HLPageInfo>
    </div>
    <div v-if="paginate && pageList.length > 1" class="paginate">
      <a v-if="pageNum > 1" :href="`?${tag ? `tag=${encodeURIComponent(tag)}&` : ''}p=${pageNum - 1}`" @click="setPageNum(pageNum - 1)"
        >&lt;</a
      >
      <div v-for="p in pageList" :key="p">
        <a v-if="p != pageNum" :href="`?${tag ? `tag=${encodeURIComponent(tag)}&` : ''}p=${p}`" @click="setPageNum(p)">{{ p }}</a>
        <span v-if="p == pageNum">{{ p }}</span>
      </div>
      <a
        v-if="pageNum < pageList.length"
        :href="`?${tag ? `tag=${encodeURIComponent(tag)}&` : ''}p=${pageNum + 1}`"
        @click="setPageNum(pageNum + 1)"
        >&gt;</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
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
    paginate: {
      type: Number,
      default: undefined,
    },
    parent: {
      type: String,
      default: '/',
    },
  },
  setup(props) {
    const { theme } = useData();

    // 該当する投稿全て
    const postsAll = theme.value.posts
      // parent で親ディレクトリ絞り込み，index.mdを除外
      .filter((post: any) => post.path.startsWith(props.parent) && !post.path.startsWith(props.parent + 'index'))
      // tag が指定されているときは tag で絞り込み
      .filter((post: any) => (props.tag ? post.frontMatter?.tags?.includes(props.tag) : true))
      // 最終更新日時順に並び換え
      .sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);

    // クエリパラメータからページ番号を取得
    const qparams = new URLSearchParams(location.href.split('?')[1]);
    const getPageNum = () => parseInt(qparams.get('p') || '1', 10);
    const pageNum = ref(getPageNum());

    // paginate とページ番号で投稿を切り取り
    const getPosts = (paginate: number | undefined, pageNum: number) => {
      if (paginate !== undefined) {
        // paginate が指定されているときは記事一覧を切り取り
        return postsAll.slice((pageNum - 1) * paginate).slice(0, paginate);
      } else {
        // paginate が指定されていないとは全記事を取得
        return postsAll;
      }
    };
    const posts = ref(getPosts(props.paginate, pageNum.value));

    // ページ番号リストの生成
    const getPageList = (paginate: number | undefined, pageNum: number) => {
      if (paginate !== undefined) {
        const pageLength = Math.ceil(postsAll.length / paginate);
        return [...Array(pageLength)].map((_, i) => i + 1);
      } else {
        return [1];
      }
    };
    const pageList = ref(getPageList(props.paginate, pageNum.value));

    const setPageNum = (pp: number) => {
      pageNum.value = pp;
      posts.value = getPosts(props.paginate, pageNum.value);
      pageList.value = getPageList(props.paginate, pageNum.value);
    };

    return {
      theme,
      posts,
      pageNum,
      pageList,
      setPageNum,
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

.paginate {
  display: flex;
  margin-top: 40px;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
