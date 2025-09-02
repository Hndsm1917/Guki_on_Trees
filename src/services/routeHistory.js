import { ref } from 'vue'

export const ROUTE_HISTORY = Symbol('ROUTE_HISTORY')

export function createRouteHistoryPlugin(router) {
  const history = ref([])

  router.afterEach((to, from) => {
    if (from.fullPath && from.fullPath !== to.fullPath) {
      history.value.push(from.fullPath)
    }
  })

  return {
    install(app) {
      app.provide(ROUTE_HISTORY, history)
    }
  }
}
