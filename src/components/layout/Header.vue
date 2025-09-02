<template>
  <header class="header">
    <div class="header__container container">
      <router-link class="header__btn btn" to="">
        <img class="header__logo" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/FNL_Flag.svg" alt=""/>
      </router-link>

      <button type="button" class="header__btn btn">
        . . .
      </button>
    </div>

  </header>
</template>

<script setup>
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__btn {
    width: em(35);
    height: em(35);
  }

  &__logo {
    width: em(27);
    height: em(18);
  }
}
</style>
