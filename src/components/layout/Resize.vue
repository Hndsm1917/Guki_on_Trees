<template>
  <div
    class="resize"
    :class="`js-is-${currentProjectConfig.name}`"
    :style="[{ fontSize: `${fontSize}px` }]"
  >
    <div v-if="IS_DEBUG_MODE" class="resize__debug">
      <span
        class="resize__font"
        v-for="(value, key) in currentProjectConfig"
        :key="key"
      >
        {{ key }}: {{ value }}
      </span>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { useResizer } from '@/composables/resizer'
import { IS_DEBUG_MODE } from '@/configs/global'

const { fontSize, currentProjectConfig } = useResizer()
</script>

<style scoped lang="scss">
.resize {
  position: relative;

  &__debug {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: space-between;
    left: 0;
    top: 0;
    border: 1px solid #002e74;
    padding: em(8);
    gap: em(5);
    z-index: 10000000;
  }
}
</style>
