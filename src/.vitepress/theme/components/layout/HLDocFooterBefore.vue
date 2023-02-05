<template>
  <div class="docFooterBefore">
    <div class="contributor">
      <HLAuthor />
    </div>
  </div>
</template>

<script lang="ts">
import HLAuthor from '../HLAuthor.vue';
export default {
  components: {
    HLAuthor,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.docFooterBefore {
  margin-top: 64px;

  @media (min-width: 640px) {
    text-align: right;
  }
}
</style>
