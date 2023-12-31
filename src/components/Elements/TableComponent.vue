<!-- TableComponent.vue -->
<template>
  <DataTable
      class="animate__animated animate__fadeIn"
      v-if="paginatedRows.length > 0"
      v-model:editingRows="editingRows"
      editMode="row"
      :value="paginatedRows"
      :paginator="true"
      :rows="7"
      :currentPage="currentPage - 1"
      selectionMode="single"
      @onPage="changePage"
      @row-select="handleRowClick"
      :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
                    })
                }
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
        <InputNumber size="small" class="animate__animated animate__fadeIn number w-auto"  v-if="isEditable(column.field)" mode="currency" currency="USD" locale="en-US" v-model="data[field]" />
        <div class="animate__animated animate__fadeIn" v-else>{{ data[field] }}</div>
      </template>
    </Column>
    <div @row-select.stop="handleRowClick" class="container-fluid">
      <Column v-if="showEditColumn" class="animate__animated animate__fadeIn utility-col" :rowEditor="true" style="width: 5rem; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </div>
  </DataTable>
  <div v-else>
    Nothing was found, try to classify search query.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import InputNumber from "primevue/inputnumber";

export default defineComponent({
  components: {
    DataTable,
    Column,
    Paginator,
    InputNumber
  },

  props: {
    rows: Array,
    columns: Array,
    searchTerm: String,
    showEditColumn: Boolean,
    editableColumns: Array,
  },
  emits: ["rowClick"],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 7,
      editingRows: [],
    };
  },
  computed: {
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const filteredData = this.filterDataBySearchTerm();
      return filteredData ? filteredData.slice(start, end) : [];
    },
  },
  methods: {
    isEditable(columnField) {
      return this.editableColumns && this.editableColumns.includes(columnField);
    },
    handleRowClick(event) {
      if (!event.originalEvent.target.classList.contains('utility-col')) {
        const selectedRow = event.data;
        this.$emit('rowClick', selectedRow);
      }
    },
    changePage(page: number) {
      this.currentPage = page;
    },
    filterDataBySearchTerm() {
      if (this.searchTerm) {
        return this.rows?.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(<string>this.searchTerm?.toLowerCase())
            )
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
  background: black!important;
  color: white;
}
:deep(td.p-editable-column) {
  height: 75px!important;
}
.number {
  width: 10rem;
}
</style>