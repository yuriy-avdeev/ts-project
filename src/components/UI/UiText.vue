<template>
  <span>
    <!-- <span v-for="(segment, i) in parsedMsg" :key="i" :class="{ highlight: i % 2 }">{{ segment }}</span> -->
    <span
      v-for="(segment, i) in parsedMsg"
      :class="{ highlight: segment.toLowerCase() === inputValue.toLowerCase() }"
      :key="i"
      >{{ segment }}</span
    >
  </span>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      inputValue: String,
      text: String,
    },

    computed: {
      parsedMsg() {
        // as split + regex => idx in array - 1, 3, 5...
        return this.text.split(new RegExp(`(${this.inputValue})`, 'gi'))
      },
    },
  })
</script>

<style lang="scss" scoped>
  .highlight {
    color: $blue;
  }
</style>
