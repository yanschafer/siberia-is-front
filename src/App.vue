<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
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
  font-family: "Lato", sans-serif;
}
#app {
  width: 100vw !important;
  overflow: hidden;
  height: 100vh;
  padding: 0 !important;
  display: flex;
}
ul {
  margin-bottom: 0;
  padding-left: 0;
}
.p-inputtext {
  padding-top: 0.2rem !important;
  padding-bottom: 0.2rem !important;
  background-color: #f8f8f8;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid black;
  transition: all 0.3s ease-in-out;
}
.p-inputtext:focus {
  box-shadow: 0 0 0 0.1rem #1c1c1c;
  transition: all 0.3s ease-in-out;
  border: 0;
}
</style>

<style scoped></style>
