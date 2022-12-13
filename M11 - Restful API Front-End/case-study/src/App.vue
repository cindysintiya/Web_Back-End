<template>
  <div id="app" class="container is-max-desktop">
    <router-view />
  </div>
</template>

<script>
  export default {
  name: "App",
  };
</script>

<style>
  /* import style bulma */
  @import "~bulma/css/bulma.css";
  /* import my own style.css */
  @import "/public/style.css";
</style>