export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_URL
  : location.origin
export const IS_DEBUG_MODE = false

export default {
  BASE_URL,
  IS_DEBUG_MODE
}
