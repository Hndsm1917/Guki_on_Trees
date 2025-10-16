<template>
  <div class="page">
    <div class="page__wrapper">
      <!--      <MapView />-->
      <!--      <MapToolbar />-->
    </div>
  </div>
</template>

<script setup>
  import MapView from '@/components/MapView.vue';
  import MapToolbar from '@/components/MapToolbar.vue';
  import {onMounted} from 'vue';
  import {reduce} from '@/tasks/algoritms.js';

  // import {solveSudoku, puzzle} from '@/tasks/sudoku.js';
  //
  onMounted(() => {
    // solveSudoku(puzzle)

    // reduce([1, 2], () => {
    //   console.log('obama poc')
    // })
    window.oncontextmenu = function ()
    {
      return false; // cancel default menu
    }

    document.addEventListener('mousedown', (e) => {
      console.log(e)
    })

  })
</script>

<style scoped lang="scss"></style>
