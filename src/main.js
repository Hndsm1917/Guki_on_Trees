import '@scss/index.scss'
import 'maplibre-gl/dist/maplibre-gl.css'

import { createRouteHistoryPlugin } from '@/services/routeHistory'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from '@/i18n'

const app = createApp(App)

app.use(createRouteHistoryPlugin(router))
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
