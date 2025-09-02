<template>
  <div class="wrapper">
    <div ref="header" @click="toggle" class="header">
      <slot name="toggle-header" />
    </div>

    <transition name="toggle" @enter="enter" @leave="leave">
      <div
        v-if="modelValue"
        ref="content"
        :class="{ 'absolute-overlay': overlay }"
        :style="contentStyle"
      >
        <slot name="toggle-content" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick, CSSProperties } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  overlay: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)
const header = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const headerHeight = ref(0)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}

const enter = (el, done) => {
  requestAnimationFrame(() => {
    gsap.from(el, {
      height: 0,
      duration: 0.5,
      delay: 0.05,
      ease: 'power2.out',
      onComplete: done
    })
  })
}

const leave = (el, done) => {
  gsap.to(el, {
    height: 0,
    duration: 0.5,
    ease: 'power2.out',
    onComplete: done
  })
}

onMounted(() => {
  if (header.value) {
    headerHeight.value = header.value.offsetHeight
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue
    if (newValue && header.value) {
      nextTick(() => {
        headerHeight.value = header.value!.offsetHeight
      })
    }
  }
)

const contentStyle = computed<CSSProperties>(() => ({
  // top: props.overlay ? `${headerHeight.value / 2}px` : 'auto',
  top: '0',
  position: props.overlay ? 'absolute' : 'relative'
}))
</script>

<style scoped>
.wrapper {
  position: relative;
}
.header {
  cursor: pointer;
}

.absolute-overlay {
  position: absolute;
  left: 0;
  right: 0;
}

.toggle-enter-active,
.toggle-leave-active {
  overflow: hidden;
}
</style>
