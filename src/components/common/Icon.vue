<template>
  <component :is="icon" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    default: undefined
  }
})

const icon = computed(() => {
  if (props.path) {
    return defineAsyncComponent(
      () => import(`../../assets/svg/${props.path}/${props.name}.svg?component`)
    )
  } else {
    return defineAsyncComponent(
      () => import(`../../assets/svg/${props.name}.svg?component`)
    )
  }
})
</script>
