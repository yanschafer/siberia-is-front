<template>
  <MDBAccordion v-model="activeItem" borderless>
    <MDBAccordionItem
        headerTitle="Permission group 1"
        collapseId="collapseOne"
    >
      <MDBCheckbox label="Permission 1" v-model="checkbox1" />
      <MDBCheckbox label="Permission 2" v-model="checkbox2" />
      <MDBCheckbox label="Permission 3" v-model="checkbox3" />
    </MDBAccordionItem>
  </MDBAccordion>
</template>

<script lang="ts">
import {MDBAccordion, MDBAccordionItem, MDBCheckbox} from "mdb-vue-ui-kit";

export default {
  name: 'CheckboxGroup',
  components: {MDBAccordion, MDBAccordionItem, MDBCheckbox},
}
</script>
<style scoped>

</style>