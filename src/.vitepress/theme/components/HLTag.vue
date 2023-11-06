<template>
  <a :href="`/tags?tag=${encodeURIComponent(name)}`">
    <span class="HLTag">{{ name }}</span>
  </a>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.HLTag {
  display: flex;
  gap: 0.1em;
  color: var(--vp-c-text-2);
  transition: color 0.25s;

  &::before {
    content: '#';
  }

  &:hover {
    color: var(--vp-c-brand);
  }
}
</style>
