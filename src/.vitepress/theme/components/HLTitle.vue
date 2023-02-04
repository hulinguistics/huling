<template>
  <h1 class="HLTitle">{{ title }}</h1>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.HLTitle {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 28px;
  position: relative;
  font-weight: 600;
  outline: none;
  overflow-wrap: break-word;
  margin: 0;

  @media (min-width: 768px) {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 32px;
  }
}
</style>
