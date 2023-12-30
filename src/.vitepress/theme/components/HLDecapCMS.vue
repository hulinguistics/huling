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
      cms.src = 'https://unpkg.com/decap-cms@3.0.12/dist/decap-cms.js';
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
