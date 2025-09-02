<template>
  <div
    class="modal"
    :class="{
      'modal--active': modal.isModalActive
    }"
    ref="modalWrapper"
  >
    <transition name="modal-fade">
      <div v-if="modal.isAnimated" class="modal__overlay" ref="overlay" />
    </transition>

    <transition name="modal-content" @after-leave="messagesStore.closeModal">
      <div v-if="modal.isAnimated" class="modal__content" ref="content">
        <button
          @click="messagesStore.finishModalAnimation()"
          class="modal__close"
          type="button"
        >
          <Icon class="modal__icon" name="cross" />
          <Icon class="modal__icon-mobile" name="cross-mobile" />
        </button>

        <component
          class="modal__component"
          :is="modalComponents[modal.componentName]"
          :modalData="modal.modalData"
          @closeModal="messagesStore.finishModalAnimation()"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/common/Icon.vue'
import { useMessagesStore } from '@/store/messages'
import { storeToRefs } from 'pinia'

const messagesStore = useMessagesStore()
const { modal } = storeToRefs(messagesStore)

const modalComponents = {}

const overlay = ref(null)
const content = ref(null)
const modalWrapper = ref(null)
</script>

<style scoped lang="scss">
.modal {
  $self: &;
  &--active {
    z-index: 1000;
  }

  &__overlay {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(12, 12, 13, 0.7);
    backdrop-filter: blur(4px);
  }

  &__content {
    z-index: 2;
    height: auto;
    overflow: hidden;
    position: absolute;
    border-radius: em(14);
    // border: em(2) solid $color-black;
    // background: $color-white;
    // box-shadow: em(6) em(6) 0 0 $color-black;
    @media (max-width: $mobile) {
      width: em(351);
    }
  }

  &__close {
    width: em(24);
    height: em(24);
    background: transparent;
    z-index: 100;
    @media (max-width: $mobile) {
      width: em(40);
      height: em(40);
    }
  }

  &__icon {
    width: em(24);
    height: em(24);
    @media (max-width: $mobile) {
      display: none;
    }
  }

  &__icon-mobile {
    display: none;
    @media (max-width: $mobile) {
      display: block;
      width: em(40);
      height: em(40);
    }
  }

  &__component {
    width: 100%;
    overflow: scroll;
    max-height: 90vh;
    transition: 250ms;

    &--loading {
      opacity: 0;
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  transform: scale(0);
  opacity: 0;
}

.modal-content-enter-to,
.modal-content-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
