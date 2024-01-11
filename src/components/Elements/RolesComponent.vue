<template>
  <MDBAccordion v-model="activeItem" borderless>
    <MDBAccordionItem
        style="width: max-content; padding: 0.1rem!important;"
        headerTitle="Permission group 1"
        collapseId="collapseOne"
    >
      <div v-for="category of categories" :key="category.key" class="flex align-items-center">
        <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
        <label :for="category.key">{{ category.name }}</label>
      </div>
    </MDBAccordionItem>
  </MDBAccordion>
  <div v-for="category of categories" :key="category.key" class="flex align-items-center">
    <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
    <label :for="category.key">{{ category.name }}</label>
  </div>
</template>
<script lang="ts">
import Checkbox from "primevue/checkbox";
import {MDBAccordion, MDBAccordionItem, MDBCheckbox} from "mdb-vue-ui-kit";
import {ref} from "vue";

export default {
  name: 'RolesComponent',
  components: {MDBAccordion, MDBAccordionItem, MDBCheckbox, Checkbox},
  setup() {
    const categories = ref([
      {name: "Accounting", key: "A"},
      {name: "Marketing", key: "M"},
      {name: "Production", key: "P"},
      {name: "Research", key: "R"}
    ]);
    const selectedCategories = ref(['Marketing']);
    return { categories, selectedCategories };
  }
}
</script>
<style scoped>
:deep(.accordion-button) {
  padding: 0.3rem;
  gap: 0.3rem;
}
:deep(.accordion-button:not(.collapsed)) {
  background-color: #eeeeee !important;
  color: black!important;
}
:deep(.accordion-button:not(.collapsed)::after) {
  filter: invert(0%) sepia(6%) saturate(0%) hue-rotate(93deg) brightness(106%) contrast(106%)!important;
}
</style>