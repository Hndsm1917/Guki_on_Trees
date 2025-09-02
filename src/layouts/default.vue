<template>
  <div class="layout default-layout" ref="page">
    <LayoutResize class="layout__resize">
      <Header class="layout__header" ref="header" />
      <main id="main-content" class="layout__main">
        <router-view v-slot="{ Component }">
          <transition>
            <component class="layout__page" :is="Component" />
          </transition>
        </router-view>
      </main>
      <!--      <Footer class="layout__footer" />-->
      <ModalWrapper class="layout__modal" />
    </LayoutResize>
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import LayoutResize from '@/components/layout/Resize.vue'
import ModalWrapper from '@/components/layout/Modal.vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/store/global'

// const globalStore = useGlobalStore()
const route = useRoute()
</script>

<style scoped lang="scss">
.layout {
  &__header {
    border-bottom: 1px solid $color-text-muted;
  }

}
</style>
