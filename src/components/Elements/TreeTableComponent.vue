<template>
  <div class="card">
    <TreeTable
      class="animate__animated animate__fadeIn"
      v-if="paginatedRows.length > 0"
      v-model:editingRows="editingRows"
      editMode="row"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
      :value="nodes"
      :paginator="true"
      :rows="5"
      scrollable
      scrollHeight="60vh"
      selectionMode="single"
      @row-select="handleRowClick"
      @row-edit-save="handleRowSave"
    >
      <Column field="label" header="NAME" expander>
        <template #default="slotProps">
          <b>{{ slotProps.node.label }}</b>
        </template>
      </Column>
      <div class="container-fluid">
        <Column
          v-if="showEditColumn"
          class="animate__animated animate__fadeIn utility-col"
          :rowEditor="true"
          style="width: 5rem; min-width: 8rem"
          bodyStyle="text-align:center"
        >
          <template #body>
            <div class="flex flex-wrap gap-2">
              <MDBBtn
                @click="emitEdit"
                type="button"
                class="utility-btn btn-info"
                >EDIT</MDBBtn
              >
            </div>
          </template>
        </Column>
        <Column v-if="enableDelete" headerStyle="width: 10rem">
          <template #body>
            <div class="flex flex-wrap gap-2">
              <MDBBtn
                @click="emitDelete"
                type="button"
                class="utility-btn btn-danger"
                >DELETE</MDBBtn
              >
            </div>
          </template>
        </Column>
      </div>
    </TreeTable>
  </div>
</template>

<script lang="ts">
import { MDBBtn } from "mdb-vue-ui-kit";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  name: "TreeTableComponent",
  components: {
    InputText,
    TreeTable,
    Column,
    Button,
    MDBBtn,
  },
  props: {
    nodes: Array,
    showEditColumn: Boolean,
    enableDelete: Boolean,
    editableColumns: Array,
  },
  data: () => ({
    deleteClick: false,
    editClick: false,
    editingRows: [],
    currentPage: 1,
    itemsPerPage: 7,
  }),
  emits: ["rowDelete", "rowEdit"],
  computed: {
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const filteredData = this.nodes;
      return filteredData ? filteredData.slice(start) : [];
    },
  },
  methods: {
    isEditable(columnField) {
      return this.editableColumns && this.editableColumns.includes(columnField);
    },
    handleRowClick(event) {
      if (this.deleteClick) {
        this.$emit("rowDelete", event.data);
        this.deleteClick = false;
        return;
      }
      if (this.deleteClick) {
        this.$emit("rowEdit", event.data);
        this.deleteClick = false;
        return;
      }

      if (!event.originalEvent.target.classList.contains("utility-col")) {
        const selectedRow = event.data;
        this.$emit("rowClick", selectedRow);
      }
    },
    handleRowSave() {},
    emitDelete(event) {
      this.deleteClick = true;
      event.target.parentElement.parentElement.parentElement.click();
    },
    emitEdit(event) {
      this.editClick = true;
      event.target.parentElement.parentElement.parentElement.click();
    },
  },
};
</script>
<style scoped></style>
