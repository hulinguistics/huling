<template>
  <span class="HLTag">{{ display }}</span>
</template>

<script lang="ts">
export default {
  props: {
    display: {
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

  &::before {
    content: '#';
  }
}
</style>
