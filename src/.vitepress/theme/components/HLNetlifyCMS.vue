<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const container = ref();
    onMounted(() => {
      const cms = window.document.createElement('script');
      cms.type = 'text/javascript';
      cms.src = 'https://unpkg.com/netlify-cms/dist/netlify-cms.js';
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
