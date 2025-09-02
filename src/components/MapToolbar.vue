<script setup>
import { useDraw } from '@/composables/useDraw'
import { useMapFeaturesStore } from '@/store/mapFeatures'

const { setMode, exportFC, importFC } = useDraw()
const featuresStore = useMapFeaturesStore()

function onExport() {
  const fc = exportFC()
  if (!fc) return
  const blob = new Blob([JSON.stringify(fc, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'routes.geojson'
  a.click()
  URL.revokeObjectURL(url)
}

async function onImport(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  const text = await file.text()
  const fc = JSON.parse(text)
  importFC(fc)
}
</script>

<template>
  <div class="toolbar">
    <button @click="setMode('select')">Select</button>
    <button @click="setMode('line')">Line</button>
    <button @click="setMode('point')">Point</button>
    <button @click="setMode('polygon')">Polygon</button>
    <button @click="setMode('delete')">Delete</button>
    <button @click="onExport">Export</button>

    <label class="import">
      Import
      <input type="file" accept=".geojson,application/json" @change="onImport" hidden />
    </label>

    <label class="toggle">
      <input type="checkbox" v-model="featuresStore.showVerifiedOnly" />
      Verified only
    </label>
  </div>
</template>

<style scoped>
.toolbar {
  position: absolute; left: 12px; top: 12px;
  display: flex; gap: 8px; padding: 8px;
  background: rgba(24,26,26,0.9);
  border: 1px solid #202222; border-radius: 12px;
  backdrop-filter: blur(4px);
}
.import { cursor: pointer; }
.toggle { margin-left: 8px; }
button {
  padding: 6px 10px; border-radius: 10px;
  border: 1px solid #202222; background: #181A1A; color: #EAEAEA;
}
button:hover { border-color: #10A37F; }
</style>
