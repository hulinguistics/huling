<template>
  <div>
    <div class="tags">
      <HLTag v-for="ptag in tags" :key="ptag" :name="ptag" @click="tagClick(ptag)" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import HLTag from './HLTag.vue';

export default {
  components: {
    HLTag,
  },
  props: {
    tags: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    tagClick: {
      type: Function,
      default: () => {
        return;
      },
    },
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
