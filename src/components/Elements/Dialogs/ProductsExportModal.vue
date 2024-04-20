<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { IconFileArrowRight, IconInfoCircle } from "@tabler/icons-vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter sidebar/FiltersSidebarComponent.vue";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";
import PrintUtil from "@/utils/localization/print.util";

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
  methods: {
    localize(key: string, module: string = "products") {
      return PrintUtil.localize(key, module);
    },
  },
});
</script>

<template>
  <span
    class="export-btn d-flex justify-content-center align-items-center gap-2"
    @click="visible = true"
    ><IconFileArrowRight color="#9b9b9b" :size="16" stroke-width="2" />
    {{ localize("exportToFile") }}
  </span>

  <Dialog
    v-model:visible="visible"
    modal
    :header="localize('exportToFile')"
    :style="{ width: '80vw', height: '90vh' }"
  >
    <div class="row justify-content-between">
      <div class="col-auto">
        <p>{{ localize("columnsForExport") }}</p>
        <!--      <MultiSelectComponent />-->
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-black utility-btn">
          {{ localize("export") }}
        </button>
      </div>
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
