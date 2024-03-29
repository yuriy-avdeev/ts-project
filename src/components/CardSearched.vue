<template>
  <div
    class="card"
    :class="{ card_active: isFocus }"
    @mouseover="handleDelayMouseOver"
    @mouseleave="handleDelayMouseLeave"
    @click="$router.push(`/ts-project/team/${card.id}`)"
  >
    <div class="card__box-logo" :class="{ 'card__box-logo_active': isFocus }">
      <img class="card__logo" src="@/assets/images/team-placeholder.png" alt="Team's logo" />
    </div>

    <div class="card__box-info">
      <div class="card__box-leagues">
        <p v-for="(league, idx) in card.leagues" :key="league" class="card__team-leagues">
          <UiText :text="league" :inputValue="inputValue" />
          {{ card.leagues.length !== idx + 1 ? ', ' : '' }}&nbsp;
        </p>
      </div>

      <div class="card__box-team">
        <h3 class="card__team-name">
          <UiText :text="card.name" :inputValue="inputValue" />
        </h3>
        <div class="card__team-border"></div>

        <div class="card__box-stadium">
          <img class="card__logo-stadium" src="@/assets/images/stadium.svg" alt="Image of stadium" />
          <p class="card__team-stadium">
            <UiText :text="card.stadium" :inputValue="inputValue" />
          </p>
        </div>
      </div>
    </div>
    <UiButton @clickButton="clickButton" :isActive="card.is_following" text="FOLLOW" isActiveText="FOLLOWING" />
  </div>
</template>

<script lang="ts">
  import UiButton from '@/components/UI/UiButton.vue'
  import UiText from '@/components/UI/UiText.vue'
  import { delayMixin } from '@/mixins/mixins'
  import { mapActions } from 'vuex'
  import Vue, { PropType } from 'vue'
  import { TeamType } from '@/types/types'

  export default Vue.extend({
    mixins: [delayMixin],
    components: { UiButton, UiText },
    props: {
      card: Object as PropType<TeamType>,
      index: Number,
      focusNumber: Number,
      inputValue: String,
    },

    methods: {
      mouseOver(): void {
        this.$emit('mouseOver')
      },

      mouseLeave(): void {
        this.$emit('mouseLeave')
      },

      async clickButton() {
        const updatedCard = { ...this.card, is_following: !this.card.is_following }
        try {
          await this.updateCard(updatedCard)
          this.$emit('updateFollowing', this.card)
        } catch (e) {
          console.log(e)
        }
      },

      ...mapActions({ updateCard: 'apiModule/updateCard' }),
    },

    computed: {
      isFocus(): boolean {
        return this.focusNumber === this.index
      },

      handleDelayMouseOver(): any {
        return (this as any).debounce(this.mouseOver, 100)
      },

      handleDelayMouseLeave(): any {
        return (this as any).debounce(this.mouseLeave, 100)
      },
    },
  })
</script>

<style lang="scss" scoped>
  .card {
    width: $fullWidth;
    padding: 5px 15px;
    color: $fontGrey;
    background-color: $white;
    display: flex;
    align-items: center;
    cursor: pointer;
    &_active {
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
      &_active {
        background-color: $white;
      }
    }

    &__logo {
      width: 28px;
      height: 28px;
    }

    &__box-info {
      flex-grow: 2;
      margin-right: 5px;
    }

    &__box-leagues {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: $fullWidth;
    }

    &__team-leagues {
      @include fontProperty('Roboto', 11px, 400, 1.3, _);
    }

    &__box-team {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: $fullWidth;
    }

    &__team-name {
      @include fontProperty('Roboto', 14px, 500, 1.4, _);
      color: $fontTitle;
    }

    &__team-border {
      width: 1px;
      height: 10px;
      background-color: $backgroundColorMain;
      margin: 0 6px;
    }

    &__box-stadium {
      display: flex;
      align-items: center;
    }

    &__logo-stadium {
      width: 14px;
      height: 12.65px;
    }

    &__team-stadium {
      @include fontProperty('Roboto', 12px, 400, 1.2, _);
      margin-left: 6px;
    }
  }
</style>
