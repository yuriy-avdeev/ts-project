<template>
  <div class="about">
    <NavBar />
    <h1 class="about__title">About page</h1>
  </div>
</template>

<script lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import Vue from 'vue'

  export default Vue.extend({
    components: { NavBar },
  })
</script>

<style lang="scss" scoped>
  .about {
    &__title {
      @include fontProperty('Montserrat', 20px, 700, 1.4, _);
      margin: 50px auto;
      text-align: center;
      color: $fontGrey;
    }
  }
</style>
