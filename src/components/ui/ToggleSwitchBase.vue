<template>
  <button
    type="button"
    class="toggle-switch"
    :class="{ 'toggle-switch--on': model }"
    @click="model = !model"
  >
    <Icon class="toggle-switch__slider" name="circle" path="utils" />
  </button>
</template>

<script setup>
import Icon from '@/components/common/Icon.vue'

const emit = defineEmits(['onClick'])
const [model, modifiers] = defineModel({
  set(value) {
    emit('onClick', value)
  }
})
</script>

<style scoped lang="scss">
.toggle-switch {
  width: em(50);
  height: em(30);
  border-radius: em(29);
  background-color: grey;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &--on {
    justify-content: flex-end;
    background-color: blue;
    .toggle-switch__slider {
      left: calc(100% - #{em(27)});
      color: $color-accent;
    }
  }
  &__slider {
    width: em(24);
    height: em(24);
    border-radius: 50%;
    color: grey;
    position: absolute;
    top: 50%;
    left: em(3);
    transform: translateY(-50%);
    transition:
      left 0.3s ease,
      color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      -1px -1px 1px 0px rgba(0, 0, 0, 0.1) inset,
      1px 1px 1px 0px rgba(255, 255, 255, 0.34) inset;
  }
}
</style>
