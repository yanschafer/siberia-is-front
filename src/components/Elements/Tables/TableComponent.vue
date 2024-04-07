<!-- TableComponent.vue -->
<template>
  <DataTable
    class="animate__animated animate__fadeIn my-custom-table"
    v-if="paginatedRows.length > 0"
    v-model:editingRows="editingRows"
    v-model:selection="selectedRows"
    editMode="row"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
    :value="paginatedRows"
    dataKey="id"
    :paginator="true"
    :rows="rowsPerPage"
    :selectionMode="selectionMode"
    @row-unselect="handleRowUnselect"
    @row-select="handleRowClick"
    @row-edit-save="handleRowSave"
    :select-all="false"
    :pt="{
      table: { style: 'min-width: 50rem' },
      column: {
        bodycell: ({ state }) => ({
          style:
            state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem',
        }),
      },
    }"
  >
    <Column
      class="animate__animated animate__fadeIn"
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
      sortable
    >
      <template #editor="{ data, field }">
        <template v-if="isEditable(column.field) && editInputType == 'num'">
          <InputNumber
            size="small"
            class="animate__animated animate__fadeIn number w-auto"
            mode="currency"
            currency="EUR"
            locale="en-US"
            v-model="data[field]"
          />
        </template>
        <template
          v-else-if="isEditable(column.field) && editInputType == 'str'"
        >
          <InputText
            size="small"
            class="animate__animated animate__fadeIn number w-auto"
            locale="en-US"
            v-model="data[field]"
          />
        </template>
        <div class="animate__animated animate__fadeIn" v-else>
          {{ data[field] }}
        </div>
      </template>
    </Column>
    <div class="container-fluid">
      <Column
        v-if="showEditColumn"
        class="animate__animated animate__fadeIn utility-col"
        :rowEditor="true"
        style="width: 5rem; min-width: 8rem"
        bodyStyle="text-align:center"
        headerStyle="width: 3rem"
      ></Column>
      <Column v-if="enableDelete" headerStyle="width: 5rem">
        <template #body>
          <div class="flex flex-wrap gap-2">
            <MDBBtn
              type="button"
              class="utility-btn btn-danger"
              @click="emitDelete"
              >{{ localize("deleteCapslock") }}</MDBBtn
            >
          </div>
        </template>
      </Column>
    </div>
  </DataTable>
  <div v-else>
    <InfoMessageComponent
      :infoIcon="infoMessage.icon"
      :infoTitle="infoMessage.title"
      :infoText="infoMessage.text"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { MDBBtn, MDBContainer } from "mdb-vue-ui-kit";
import { IconSearchOff, IconInfoCircle } from "@tabler/icons-vue";
import InfoMessageComponent from "@/components/Elements/Dialogs/InfoMessageComponent.vue";
import PrintUtil from "@/utils/localization/print.util";
import LoggerUtil from "@/utils/logger/logger.util";

export default defineComponent({
  components: {
    InfoMessageComponent,
    IconSearchOff,
    IconInfoCircle,
    MDBBtn,
    MDBContainer,
    DataTable,
    Column,
    Paginator,
    InputNumber,
    InputText,
  },

  props: {
    rows: Array,
    columns: Array,
    selectionMode: {
      type: String,
      default: "single",
    },
    searchTerm: String,
    showEditColumn: Boolean,
    showSelectionColumn: {
      type: Boolean,
      default: false,
    },
    editableColumns: Array,
    enableDelete: Boolean,
    editInputType: {
      type: String,
      default: "num",
    },
    rowsPerPage: {
      type: Number,
      default: 6,
    },
    infoMessage: {
      type: Object,
      required: false,
      default: {
        icon: "IconSearchOff",
        title: PrintUtil.localize("nothingFound"),
        text: PrintUtil.localize("nothingFoundClarifyQuery"),
      },
    },
    selectedOutputStore: {
      type: Object,
      default: {},
    },
  },
  emits: ["rowClick", "rowEditSave", "rowDelete"],
  created() {
    if (this.selectedOutputStore.selectedRows) {
      LoggerUtil.debug(
        "Have selected rows: ",
        this.selectedOutputStore.selectedRows,
      );
      this.selectedRows = this.selectedOutputStore.selectedRows;
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 7,
      editingRows: [],
      selectedRows: [],
      deleteClick: false,
      noSearchResultIcon: "IconSearchOff",
      noSearchResultTitle: this.localize("nothingFound"),
      noSearchResultText: this.localize("nothingFoundClarifyQuery"),
      selectAll: false,
    };
  },
  computed: {
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const filteredData = this.filterDataBySearchTerm();
      return filteredData ? filteredData.slice(start) : [];
    },
  },
  methods: {
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    isEditable(columnField) {
      return this.editableColumns && this.editableColumns.includes(columnField);
    },
    handleRowUnselect(event) {
      if (this.selectedOutputStore.selectedRows) {
        this.selectedOutputStore.selectedRows = this.selectedRows;
      }
    },
    handleRowClick(event) {
      if (this.deleteClick) {
        this.$emit("rowDelete", event.data);
        this.deleteClick = false;
        return;
      }
      if (!event.originalEvent.target.classList.contains("utility-col")) {
        const selectedRow = event.data;
        this.$emit("rowClick", selectedRow);
        if (this.selectedOutputStore.selectedRows) {
          this.selectedOutputStore.selectedRows = this.selectedRows;
        }
      }
    },
    emitDelete(event) {
      this.deleteClick = true;
      event.target.parentElement.parentElement.parentElement.click();
    },
    handleRowSave({ newData }) {
      this.$emit("rowEditSave", newData);
    },
    filterDataBySearchTerm() {
      if (this.searchTerm) {
        return this.rows?.filter((row) =>
          Object.values(row).some((value) =>
            String(value)
              .toLowerCase()
              .includes(<string>this.searchTerm?.toLowerCase()),
          ),
        );
      } else {
        return this.rows;
      }
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
    },
  },
});
</script>

<style scoped>
.table {
  width: 100%;
  max-width: 85vw;
  min-width: 85vw;
}
.table-row-odd {
  background-color: #f2f2f2;
}
.table-header {
  font-weight: 800;
  color: #121212;
}
.table-row:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}
.table-row {
  transition: all 0.3s ease-in-out;
}
.pagination .page-item.active .page-link {
  background-color: black;
  color: white;
}

.pagination .page-item.active .page-link:hover {
  background-color: black;
  color: white;
}
.page-item:hover {
  cursor: pointer;
}
* {
  transition: all 0.3s ease-in-out;
}
:deep(.p-paginator-page.p-highlight) {
  background: black !important;
  color: white;
}
:deep(td.p-editable-column) {
  height: 75px !important;
}
.number {
  width: 10rem;
}
.message-heading {
  color: #b8b8b8;
}
.message-container {
  height: 50vh;
}
#header {
  display: none;
}
</style>
