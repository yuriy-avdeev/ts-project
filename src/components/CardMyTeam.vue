<template>
  <div class="card" @click="$router.push(`/ts-project/team/${card.id}`)">
    <div class="card__box-logo">
      <img class="card__logo" src="@/assets/images/team-placeholder.png" alt="Team's logo" />
    </div>
    <h3 class="card__team-name">{{ card.name }}</h3>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { TeamType } from '@/types/types'

  export default Vue.extend({
    props: {
      card: Object as PropType<TeamType>,
    },
  })
</script>

<style lang="scss" scoped>
  .card {
    width: $fullWidth;
    padding: 10px 12px;
    color: $fontGrey;
    background-color: $white;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background-color: $backgroundColorBody;
    }

    &__box-logo {
      width: 40px;
      min-width: 40px;
      height: 40px;
      margin-right: 15px;
      border-radius: 50%;
      background-color: $backgroundColorBody;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__logo {
      width: 28px;
      height: 28px;
    }

    &__team-name {
      @include fontProperty('Roboto', 14px, 500, 1, _);
      color: $fontTitle;
    }
  }

  @media screen and (min-width: $transitionPoint) {
    .card {
      padding: 0 12px 10px;
    }
  }
</style>
