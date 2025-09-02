import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    currentTime: Date.now(),
    isScrollLock: false,
    pageAnimation: ''
  }),

  getters: {},

  actions: {}
})
