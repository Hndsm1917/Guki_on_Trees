import { defineStore } from 'pinia'

export const useMapFeaturesStore = defineStore('mapFeatures', {
    state: () => ({
        fc: { type: 'FeatureCollection', features: [] },
        showVerifiedOnly: false,
    }),
    getters: {
        features: (s) => s.fc.features,
        featureById: (s) => (id) => s.fc.features.find((f) => f.id === id),
    },
    actions: {
        upsert(feature) {
            if (!feature.id) feature.id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now() + Math.random())
            const idx = this.fc.features.findIndex((f) => f.id === feature.id)
            if (idx >= 0) this.fc.features[idx] = feature
            else this.fc.features.push(feature)
        },
        bulkReplace(fc) {
            this.fc = fc
        },
        remove(id) {
            this.fc.features = this.fc.features.filter((f) => f.id !== id)
        },
        clear() {
            this.fc.features = []
        },
    },
})
