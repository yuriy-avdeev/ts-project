<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue'
  import { delayMixin } from '@/mixins/mixins'
  import Vue from 'vue'

  export default Vue.extend({
    mixins: [delayMixin],
    components: { Header },

    data() {
      return {
        laptopScreen: true,
      }
    },

    mounted() {
      this.checkWindowWidth()
      window.addEventListener('resize', this.handleResize)
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },

    methods: {
      checkWindowWidth(): void {
        if (window.innerWidth < 1024 && this.laptopScreen === true) {
          this.laptopScreen = false
          this.$store.commit('handleChangingScreen', this.laptopScreen)
        } else if (window.innerWidth >= 1024 && this.laptopScreen === false) {
          this.laptopScreen = true
          this.$store.commit('handleChangingScreen', this.laptopScreen)
        }
      },
    },

    computed: {
      handleResize(): any {
        return (this as any).debounce(this.checkWindowWidth, 100)
      },
    },
  })
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    @extend %fontRobotoRegular;
    background-color: $backgroundColorBody;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    width: $fullWidth;
    max-width: $maxWidth;
    height: fit-content;
    min-height: 100vh;
    margin: 0 auto;
    color: $white;
    padding-bottom: 40px;
  }
</style>
