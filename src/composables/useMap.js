import MapLibreGL from 'maplibre-gl';

export function useMap() {
    let map = null

    const init = (opts) => {
        map = new MapLibreGL.Map({
            container: opts.container,
            style: opts.styleUrl || 'https://tiles.openfreemap.org/styles/bright',
            center: opts.center || [30.723, 46.482],
            zoom: opts.zoom || 14,
            attributionControl: true,
            hash: false,
            pitch: 0,
            bearing: 0,
        })
        map.addControl(new MapLibreGL.NavigationControl({ visualizePitch: true }), 'top-right')

        return new Promise((resolve) => map.on('load', () => resolve(map)))
    }

    const addOrSetSource = (id, source) => {
        if (!map) return
        if (map.getSource(id)) {
            const s = map.getSource(id)
            if (s && s.setData && source.data) s.setData(source.data)
        } else {
            map.addSource(id, source)
        }
    }

    const addOrSetLayer = (layer) => {
        if (!map) return
        if (map.getLayer(layer.id)) {
            // для простоты: удалим и добавим заново
            map.removeLayer(layer.id)
            map.addLayer(layer)
        } else {
            map.addLayer(layer)
        }
    }

    const fitBounds = (b, padding = 24) => map && map.fitBounds(b, { padding, duration: 600 })
    const get = () => map
    const destroy = () => { if (map) map.remove(); map = null }

    return { init, addOrSetSource, addOrSetLayer, fitBounds, get, destroy }
}
