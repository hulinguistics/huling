<template>
  <div ref="container">
    <link v-if="config" :href="config" type="text/yaml" rel="cms-config-url" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
export default {
  props: {
    config: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const container = ref();
    onMounted(() => {
      const cms = window.document.createElement('script');
      cms.type = 'text/javascript';
      cms.src = 'https://unpkg.com/netlify-cms@2.9.7/dist/netlify-cms.js';
      cms.async = true;
      cms.crossOrigin = 'anonymous';
      container.value.append(cms);
    });
    return {
      container,
    };
  },
};
</script>

<style lang="scss">
div[data-slate-editor] {
  -webkit-user-modify: read-write !important;
}
</style>
