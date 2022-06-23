<template>
  <div class="team">
    <MainUser />
    <NavBar />
    <h2 class="team__title">Welcome to the page about {{ team.name }}</h2>
  </div>
</template>

<script lang="ts">
  import MainUser from '@/components/MainUser.vue'
  import NavBar from '@/components/NavBar.vue'
  import { mapGetters } from 'vuex'
  import { TeamType } from '../types/types'
  import Vue from 'vue'

  export default Vue.extend({
    components: { MainUser, NavBar },
    props: ['id'],

    data() {
      return {
        team: {},
      }
    },

    mounted() {
      // m.b. problem -> when type in field something => it requires GET-request or additional check and redirect to 404
      if (this.teamsList.length) {
        this.team = this.teamsList.find((card: TeamType) => card.id == this.id)
      } else {
        this.team = {
          id: 2525,
          name: 'Leicester City',
        }
      }
    },

    computed: {
      ...mapGetters('apiModule', ['teamsList']),
    },
  })
</script>

<style lang="scss" scoped>
  .team {
    width: $fullWidth;
    max-width: $mainMaxWidth;
    margin: auto;
    overflow: hidden;

    &__title {
      @include fontProperty('Montserrat', 16px, 600, 1, italic);
      color: $fontTitle;
      margin: 40px 0;
    }
  }

  @media screen and (min-width: $transitionPoint) {
    .team {
      margin-top: 16px;
      border-radius: 8px;
    }
  }
</style>
