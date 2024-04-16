<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { IconFileArrowRight, IconInfoCircle } from "@tabler/icons-vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";

export default defineComponent({
  name: "ProductsExportModal",
  components: {
    MultiSelectComponent,
    FiltersSidebarComponent,
    MDBCol,
    MDBContainer,
    TableComponent,
    IconInfoCircle,
    Button,
    Dialog,
    IconFileArrowRight,
  },
  data() {
    return {
      visible: false,
    };
  },
});
</script>

<template>
  <span
    class="export-btn d-flex justify-content-center align-items-center gap-2"
    @click="visible = true"
    ><IconFileArrowRight color="#9b9b9b" :size="16" stroke-width="2" /> Export
    to file
  </span>

  <Dialog
    v-model:visible="visible"
    modal
    header="Export to file"
    :style="{ width: '80vw', height: '90vh' }"
  >
    <div class="row">
      <p>Columns for export</p>
      <MultiSelectComponent />
    </div>
    <MDBContainer class="d-flex container-content">
      <MDBCol class="col-auto">
        <FiltersSidebarComponent @start-search="handleFiltersSearch" />
      </MDBCol>
      <MDBCol class="">
        <TableComponent class="table-data" />
      </MDBCol>
    </MDBContainer>
  </Dialog>
</template>

<style scoped>
.export-btn {
  margin-right: 2rem;
  color: #9b9b9b;
  transition: all 0.3s ease-in-out;
}
.export-btn:hover {
  filter: brightness(0) saturate(100%);
  cursor: pointer;
}
</style>
