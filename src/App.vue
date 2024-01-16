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
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-multiselect:hover {
  border-bottom: 2px solid black;
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
}
.p-component-overlay {
  background-color: rgba(255, 255, 255, 0.7)!important;
  backdrop-filter: blur(10px);
}
.p-dialog {
  border-radius: 29px!important;
  border: 2px solid #eee!important;
  background: #fff!important;
  width: 100%!important;
  max-width: 35rem!important;
  box-shadow: 0px 4px 28.3px 4px rgba(0, 0, 0, 0.06)!important;
}
.p-dialog-header {
  border-top-left-radius: 29px;
  border-top-right-radius: 29px;
}
.p-dialog-content {
  border-bottom-left-radius: 29px;
  border-bottom-right-radius: 29px;
}
.zalupa {
  width: 100%;
  max-width: 5rem;
}
.table-header {
  width: max-content!important;
  max-width: 6rem;
  display: flex;
}
.p-tabview-title {
  color: black;
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  border-color: black;
  background-color: #f6f6f6;
}
.p-treetable .p-treetable-tbody > tr.p-highlight .p-treetable-toggler {
  color: #121212;
}
.p-treeselect:not(.p-disabled):hover {
  border-color: #9a9a9a;
}
.p-treeselect {
  border: 0;
  border-radius: 0;
  background-color: #f8f8f8;
  border-bottom: 2px solid #cecece;
}
.p-treeselect:focus {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-multiselect {
  border: 0;
  border-radius: 0;
  background-color: #f8f8f8;
  border-bottom: 2px solid #cecece;
}
.p-multiselect:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-multiselect:focus {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-multiselect:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-multiselect-label {
  color: black;
}

.p-dropdown {
  border: 0;
  border-radius: 0;
  background-color: #f8f8f8;
  border-bottom: 2px solid #cecece;
}
.p-dropdown:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-dropdown:focus {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.p-dropdown:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}

.text-area {
  border: 0;
  border-radius: 0;
  background-color: #f8f8f8;
  border-bottom: 2px solid #cecece;
  transition: all 0.3s ease-in-out;
}
.text-area:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.text-area:focus {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}
.text-area:focus-within {
  box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  border-bottom: 2px solid black;
}

.p-dropdown-label {
  color: black;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: #f9f9f9;
  border-color: white;
  background-color: black;
  transition: all 0.6s ease-in-out;
}
.accordion.accordion-borderless {
  padding-left: 0;
}
.accordion-borderless .accordion-item .accordion-button {
  padding: 0.6rem;
}
.accordion-button::after {
  margin: 0;
}
.accordion-button {
  width: 100%;
  transition: all 1s ease-in-out;
  max-width: max-content;
}
.p-scrollpanel .p-scrollpanel-bar {
  background: #dcdcdc;
}
.nav-link {
  text-align: left;
}
.accordion-item {
  width: 100%!important;
  border-bottom: 2px solid rgba(227, 227, 227, 0.49) !important;
}
</style>

<style scoped></style>
