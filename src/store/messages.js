import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    _notificationList: [],

    modal: {
      componentName: '',
      isModalActive: false,
      isAnimated: false,
      modalData: null,
      isClosable: true
    },

    popup: {
      componentName: '',
      isPopupActive: false,
      isAnimated: false,
      popupData: null
    }
  }),
  actions: {
    lockScroll() {
      document.body.style.overflow = 'hidden'
    },
    unlockScroll() {
      document.body.style.overflow = ''
    },
    // Modal
    openModal(name, data = null) {
      this.lockScroll()
      this.modal.componentName = name
      this.modal.modalData = data
      this.modal.isModalActive = true
      this.modal.isAnimated = true
    },
    finishModalAnimation() {
      this.modal.isAnimated = false
      setTimeout(() => {
        this.modal.isModalActive = false
        this.unlockScroll()
      }, 500)
    },
    closeModal() {
      this.modal.componentName = ''
      this.modal.modalData = null
      this.modal.isAnimated = false
      this.modal.isModalActive = false
      this.unlockScroll()
    },
    // Popup
    openPopup(name, data = null) {
      this.popup.componentName = name
      this.popup.popupData = data
      this.popup.isPopupActive = true
      this.popup.isAnimated = true
    },
    finishPopupAnimation() {
      this.popup.isAnimated = false
      setTimeout(() => {
        this.popup.isPopupActive = false
      }, 500)
    },
    closePopup() {
      this.popup.componentName = ''
      this.popup.popupData = null
      this.popup.isAnimated = false
      this.popup.isPopupActive = false
    }
  }
})
