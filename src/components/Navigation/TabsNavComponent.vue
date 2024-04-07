<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TabsNavComponent",
});
</script>

<template>
  <div class="tabs-row d-flex flex-row">
    <div class="tab-item active">Single products</div>
    <div class="tab-item">Groupped products</div>
  </div>
</template>

<style scoped>
.tabs-row {
  width: 100%;
  border-bottom: 1px solid #dedede;
  transition: all 0.3s ease-in-out;
}
.tab-item {
  padding: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #dedede;
  transition: all 0.3s ease-in-out;
}
.tab-item:hover {
  color: black;
  border-bottom: 1px solid black;
  transition:
    all 0.3s ease-in-out,
    border-color 1s ease;
  cursor: pointer;
}
.active {
  border-bottom: 1px solid black;
  color: black;
  background-color: #f6f6f6;
  transition: all 0.3s ease-in-out;
}
</style>
