<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
</script>

<template>
  <RouterView />
</template>

<style>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #171717 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #f5f5f5;
}

*::-webkit-scrollbar-thumb {
  background-color: #171717;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
* {
  font-family: 'Lato', sans-serif;
}
#app {
  width: 100vw!important;
  overflow: hidden;
  height: 100vh;
  padding: 0!important;
  display: flex;
}
</style>

<style scoped>

</style>
