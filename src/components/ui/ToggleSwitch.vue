<template>
  <div
    class="toggle-switch"
    :class="{ 'toggle-switch--on': isChecked }"
    @click="toggle"
  >
    <div class="toggle-switch__text">OFF</div>
    <div class="toggle-switch__slider" />
    <div
      class="toggle-switch__text"
      :class="{ 'toggle-switch__text--active': props.autoMod }"
    >
      ON
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'

const props = defineProps({
  autoMod: {
    type: Boolean,
    default: false
  }
})

const isChecked = ref(props.autoMod)

const emit = defineEmits(['toggle'])

const toggle = () => {
  isChecked.value = !isChecked.value
  emit('toggle', isChecked.value)
}

watch(
  () => props.autoMod,
  (newVal) => {
    isChecked.value = newVal
  }
)
</script>

<style scoped lang="scss">
.toggle-switch {
  width: em(106);
  height: em(34);
  border-radius: em(20);
  //background-color: $color-white;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 4px 4px 6px 0px rgba(0, 35, 104, 0.19);

  &--on {
    background: blue;
    box-shadow: 4px 4px 6px 0px rgba(0, 35, 104, 0.19);
    .toggle-switch__slider {
      left: calc(100% - #{em(55)});
      background-color: $color-accent;
    }
  }
  &__slider {
    width: em(55);
    height: 100%;
    border-radius: em(40);
    background-color: grey;
    position: absolute;
    top: 0;
    left: 0;
    transition:
      left 0.3s ease,
      background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }

  &__text {
    position: relative;
    z-index: 1;
    //color: $color-black;
    transition: color 0.3s ease;
    &--active {
      //color: $color-white;
    }
  }
}
</style>
