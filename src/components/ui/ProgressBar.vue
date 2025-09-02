<template>
  <div class="progressbar">
    <span
      class="progressbar__line"
      :style="`width: ${props.percent}%`"
      :class="`progressbar__line--${props.lineColor}`"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  percent: {
    type: Number,
    required: true
  },
  lineColor: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
//.progressbar {
//  position: relative;
//  width: 100%;
//  overflow: hidden;
//  &__line {
//    height: 100%;
//    position: absolute;
//    top: 0;
//    left: 0;
//    transition: all 0.3s ease-in-out;
//    background: $color-accent;
//    border-radius: em(7);
//    &--default {
//      background: $color-accent;
//    }
//    &--iron {
//      background: $color-league-iron;
//    }
//    &--bronze {
//      background: $color-league-bronze;
//    }
//    &--silver {
//      background: $color-league-silver;
//    }
//    &--gold {
//      background: $color-league-gold;
//    }
//    &--platinum {
//      background: $color-league-platinum;
//    }
//    &--diamond {
//      background: $color-league-diamond;
//    }
//    &--celestial {
//      background: $color-league-celestial;
//    }
//  }
//}
</style>
