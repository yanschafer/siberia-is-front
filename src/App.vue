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
  border-bottom: 2px solid #cecece;
  transition: all 0.3s ease-in-out;
}
.p-inputtext:focus {
  box-shadow: 0 0 0 0.1rem #1c1c1c;
  transition: all 0.3s ease-in-out;
  border: 0;
}
.p-multiselect:hover {
  border: 1px solid #858585;
}
.p-highlight {
  background-color: #ececec;
  color: black;
}
.p-checkbox .p-checkbox-box {
  border-color: #d0d0d0;
  background: #ffffff;
}
.p-checkbox-icon {
  color: black;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw !important;
}
:deep(.p-dropdown-label) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown-filter) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.p-multiselect-label {
  padding: 0.2rem;
}
.p-treeselect-label {
  padding: 0.2rem;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: 4.5rem;
  min-height: 2rem;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 2px;
  padding-right: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
  margin-top: 0.5rem;
}
</style>

<style scoped></style>
