<template>
  <Button class="btn-outlined-black utility-btn" @click="visible = true" >
    {{ buttonText }}
  </Button>
  <Dialog v-model:visible="visible" modal header="Create a collection" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <MDBContainer class="d-flex flex-column">
      <span>{{ inputTextName }}</span>
      <InputText :placeholder="inputPlaceholder" v-model="inputValue" />
      <span>{{ selectorText }}</span>
<!--      <TreeDropdownComponent-->
<!--          :placeholder="dropdownPlaceholder"-->
<!--          class="animate__animated animate__flipInX animate__faster"-->
<!--          :nodes="dropdownData"-->
<!--          v-model="selectedDropdownItem"/>-->
      <MDBRow>
        <Button @click="save">{{ saveButtonText }}</Button>
      </MDBRow>
    </MDBContainer>
  </Dialog>
</template>
<script lang="ts">
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import {MDBContainer, MDBRow} from "mdb-vue-ui-kit";

export default {
  name: 'DialogComponent',
  components: {MDBContainer, MDBRow, TreeDropdownComponent, Button, InputText, Dialog},
  data() {
    return {
      buttonText: 'Create',
      visible: false,
      inputPlaceholder: 'Create name for a collection',
      inputValue: '',
      spanText1: 'Name',
      spanText2: 'Parent collection',
      dropdownPlaceholder: 'Select a category',
      dropdownData: [],
      selectedDropdownItem: null,
      saveButtonText: 'Save',
    };
  },
  methods: {
    save() {
      // Логика сохранения
    },
  },
}
</script>
<style scoped>

</style>