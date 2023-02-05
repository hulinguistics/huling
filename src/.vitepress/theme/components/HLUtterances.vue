<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
export default {
  el: '#utterances',
  props: {
    repo: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'github-light',
      required: false,
    },
    issueTerm: {
      type: String,
      default: 'pathname',
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
  },

  setup(props) {
    const container = ref();

    onMounted(() => {
      const utterances = window.document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.src = 'https://utteranc.es/client.js';
      utterances.async = true;
      utterances.setAttribute('repo', props.repo);
      utterances.setAttribute('label', props.label);
      utterances.setAttribute('issue-term', props.issueTerm);
      utterances.setAttribute('theme', props.theme);
      utterances.crossOrigin = 'anonymous';
      container.value.append(utterances);
    });

    return {
      container,
    };
  },
};
</script>
