<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useMap } from '@/composables/useMap'
import { useDraw } from '@/composables/useDraw'
import { useMapFeaturesStore } from '@/store/mapFeatures'

const props = defineProps({
  center: { type: Array, default: () => undefined },
  zoom: { type: Number, default: undefined },
  styleUrl: { type: String, default: '' },
})

const mapEl = ref(null)
const { init, addOrSetSource, addOrSetLayer, get, destroy } = useMap()
const { attach } = useDraw()
const featuresStore = useMapFeaturesStore()

onMounted(async () => {
  const map = await init({
    container: mapEl.value,
    center: props.center,
    zoom: props.zoom,
    styleUrl: props.styleUrl || undefined,
  })

  attach(map)

  map.on('load', () => {
    addOrSetSource('user-features', { type: 'geojson', data: featuresStore.fc })

    addOrSetLayer({
      id: 'user-lines',
      type: 'line',
      source: 'user-features',
      filter: ['==', ['geometry-type'], 'LineString'],
      paint: {
        'line-color': [
          'case',
          ['==', ['get', 'verified'], true], '#10A37F',
          'rgba(255,255,255,0.35)',
        ],
        'line-width': 3,
      },
    })

    addOrSetLayer({
      id: 'user-points',
      type: 'circle',
      source: 'user-features',
      filter: ['==', ['geometry-type'], 'Point'],
      paint: {
        'circle-radius': 5,
        'circle-color': '#2E7CF6',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#0E0F0F',
      },
    })
  })

  // реактивно обновляем geojson источник
  watch(() => featuresStore.fc, (fc) => {
    const m = get()
    const src = m && m.getSource('user-features')
    if (src && src.setData) src.setData(fc)
  }, { deep: true })
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<template>
  <div ref="mapEl" class="map-container"></div>
</template>

<style scoped>
.map-container { width: 100%; height: 100%; position: relative; }
</style>
