<template>
  <div
    class="tab"
    :class="{
      [`tab--${props.theme}`]: props.theme,
      [`tab--${props.appVersion}`]: props.appVersion
    }"
  >
    <div class="tab__heading">
      <div
        v-for="item in tabs"
        :key="item"
        type="button"
        class="tab__item"
        :class="{ 'tab__item--active': item === currentTab }"
        @click="pickItem(item)"
      >
        <span class="tab__font">
          {{ t(`${theme}.${item}`) }}
        </span>

        <Icon
          class="tab__icon"
          :class="`tab__icon--${item}`"
          :name="item"
          path="tabs"
        />
      </div>

      <div class="tab__decorator" :class="`tab__decorator--${currentTab}`" />
    </div>

    <div class="tab__content">
      <slot :currentItem="currentTab" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/common/Icon.vue'

const { t } = useI18n()
const props = defineProps({
  theme: {
    type: String,
    default: ''
  },
  appVersion: {
    type: String,
    default: ''
  }
})

const tabs = computed(() => {
  if (props.theme === 'referralsPage') return ['system', 'referrals']
  if (props.theme === 'signals') return ['signals', 'signalsHistory']

  return []
})

const currentTab = ref(tabs.value[0])

function pickItem(item) {
  currentTab.value = item
}
</script>

<style scoped lang="scss">
.tab {
  $self: &;

  &--referralsPage {
    #{$self}__heading {
      grid-template-columns: em(187) auto;
    }
  }

  &--signals {
    #{$self}__heading {
      grid-template-columns: em(139) auto;
    }
  }

  &__heading {
    display: grid;
    width: 100%;
    border-radius: em(39);
    //background: $color-white;
    box-shadow: 4px 4px 6px 0px rgba(0, 35, 104, 0.19);
    position: relative;
    height: em(39);
    margin-bottom: em(14);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: em(4);
    background: transparent;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 2;
    outline: none;

    &--active {
      #{$self} {
        &__font {
          // color: $color-white;
        }

        &__icon {
          // color: $color-white;
        }
      }
    }
  }

  &__font {
    color: $color-accent;
    transition: 0.45s ease-in;
  }

  &__icon {
    color: $color-accent;
    transition: 0.45s ease-in;

    &--sytem {
      width: em(15);
      height: em(18);
    }

    &--signals {
      width: em(18);
      height: em(18);
    }

    &--signalsHistory {
      width: em(18);
      height: em(18);
    }

    &--referrals {
      width: em(16);
      height: em(15);
    }

    &--system {
      width: em(15);
      height: em(19);
    }
  }

  &__decorator {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    border-radius: em(36);
    background: $color-accent;
    box-shadow: 4px 4px 6px 0px rgba(0, 35, 104, 0.19);
    height: 100%;
    transition:
      left 0.35s ease-in,
      width 0.25s linear;

    &--system {
      width: em(187);
    }

    &--signals {
      width: em(139);
    }

    &--signalsHistory {
      width: em(206);
      left: em(146);
    }

    &--referrals {
      width: em(227);
      left: em(188);
    }
  }

  &__content {
  }

  &--2 {
    #{$self}__decorator--referrals {
      width: em(190);
      left: em(170);
    }
    #{$self}__decorator--system {
      width: em(138);
    }
    #{$self}__decorator--signals {
      width: em(139);
    }
    #{$self}__decorator--signalsHistory {
      width: em(206);
      left: em(153);
    }
    #{$self}__heading {
      height: em(46);
    }
  }

  &--referralsPage,
  #{$self}--2 {
    #{$self}__heading {
      grid-template-columns: em(138) auto;
      gap: em(31);
    }
  }

  &--signals,
  #{$self}--2 {
    #{$self}__heading {
      gap: em(14);
    }
  }
}
</style>
