import { computed, onMounted, ref } from 'vue'
import resizerParams from '@/configs/resizerParams'

export function useResizer() {
  const _viewPortWidth = ref(0)
  const _viewPortHeight = ref(0)
  const currentProjectConfig = ref(resizerParams.desktop)
  const isResizerActivated = ref(false)
  const screenType = ref('')

  const fontSize = computed(() => {
    const config = currentProjectConfig.value
    const horizontalRatio =
      Math.max(config.minWidth, _viewPortWidth.value) / config.width
    const verticalRatio =
      config.name === 'mobile'
        ? config.height
        : Math.max(config.minHeight, _viewPortHeight.value) / config.height

    const minRatio = Math.min(horizontalRatio, verticalRatio)
    return config.fontSize * minRatio
  })

  onMounted(() => {
    _resizeHandler()
    orientationChecker()

    window.addEventListener('resize', _resizeHandler)
    window.addEventListener('orientationchange', orientationChecker)
  })

  function _getBrowserParams(type) {
    if (type === 'width') {
      return window.innerWidth ?? document.documentElement.clientWidth
    }
    if (type === 'height') {
      return window.innerHeight ?? document.documentElement.clientHeight
    }
    return 0
  }

  function orientationChecker() {
    if ('orientation' in window) {
      switch (window.orientation) {
        case 0:
          screenType.value = 'portrait'
          break
        case 180:
          screenType.value = 'upside-down'
          break
        case -90:
          screenType.value = 'clockwise'
          break
        case 90:
          screenType.value = 'counterclockwise'
          break
        default:
          screenType.value = ''
      }
    } else {
      screenType.value = 'portrait'
    }
  }

  function _resizeHandler() {
    const prevVal = _viewPortWidth.value

    _viewPortWidth.value = _getBrowserParams('width')
    _viewPortHeight.value = _getBrowserParams('height')

    if (prevVal === 0) {
      isResizerActivated.value = true
    }

    currentProjectConfig.value = _calcCurrentProjectConfig()
  }

  function _calcCurrentProjectConfig() {
    const configs = Object.values(resizerParams)
    configs.sort((a, b) => a.maxWidth - b.maxWidth)
    return (
      configs.find((cfg) => _viewPortWidth.value <= cfg.maxWidth) ||
      configs[configs.length - 1]
    )
  }

  return {
    fontSize,
    currentProjectConfig,
    isResizerActivated,
    screenType
  }
}
