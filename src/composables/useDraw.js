import { TerraDraw, TerraDrawLineStringMode, TerraDrawPointMode, TerraDrawPolygonMode } from 'terra-draw'
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter'
import { useMapFeaturesStore } from '@/store/mapFeatures.js'
import { MapLibreGL as lib } from 'maplibre-gl';
import {ref} from 'vue';

const draw = ref(null)

export function useDraw() {

    const featuresStore = useMapFeaturesStore()

    const attach = (map) => {
        console.log('attach')
        draw.value = new TerraDraw({
            adapter: new TerraDrawMapLibreGLAdapter({ map, lib }),
            map,
            modes: [
                new TerraDrawLineStringMode(),
                new TerraDrawPolygonMode(),
                new TerraDrawPointMode(),
            ],
            styles: {
                LineString: { width: 3, outlineWidth: 0, color: '#10A37F', opacity: 1, dashed: false },
                Point: { radius: 5, color: '#2E7CF6', outlineWidth: 2, outlineColor: '#0E0F0F', opacity: 1 },
                Polygon: { fillColor: '#10A37F', fillOpacity: 0.25, outlineColor: '#10A37F', outlineWidth: 2 },
            },
        })

        console.log(draw.value)

        draw.value.start()

        draw.value.on('change', () => {
            const fc = draw.value.getSnapshot()
            featuresStore.bulkReplace(fc)
        })
    }

    const setMode = (mode) => {
        console.log(draw.value)
        if (!draw.value) return

        if (mode === 'line') draw.value.setMode('linestring')
        else if (mode === 'point') draw.value.setMode('point')
        else if (mode === 'polygon') draw.value.setMode('polygon')
        else if (mode === 'select') draw.value.setMode('select')
        else if (mode === 'delete') draw.value.deleteSelection()

    }

    const importFC = (fc) => {
        if (!draw.value) return
        draw.value.clear()
        draw.value.addFeatures(fc.features || [])
    }

    const exportFC = () => (draw.value ? draw.value.getSnapshot() : null)

    return { attach, setMode, importFC, exportFC }
}
