<!-- TableComponent.vue -->
<template>
  <table v-if="paginatedRows.length > 0" class="table table-bordered animate__animated animate__fadeIn">
    <thead>
    <tr>
      <th class="table-header" v-for="column in columns" :key="column.field">{{ column.header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr class="table-row" @click="handleRowClick(row)" v-for="(row, index) in paginatedRows" :key="index" :class="{ 'table-row-odd': index % 2 !== 0 }">
      <td v-for="column in columns" :key="column.field">{{ row[column.field] }}</td>
    </tr>
    </tbody>
  </table>
  <div v-else>
    Nothing was found, try to classify search query.
  </div>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
        <a class="page-link" @click="changePage(page)">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
  props: {
    rows: Array,
    columns: Array,
    searchTerm: String,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 7,
    };
  },
  computed: {
    paginatedRows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const filteredData = this.filterDataBySearchTerm();
      return filteredData ? filteredData.slice(start, end) : [];
    },
    totalPages() {
      const filteredData = this.filterDataBySearchTerm();
      return filteredData ? Math.ceil(filteredData.length / this.itemsPerPage) : 0;
    },
  },
  methods: {
    handleRowClick(row) {
      // Вызываем событие rowClick и передаем в него объект строки (row)
      this.$emit('rowClick', row);
    },
    changePage(page: number) {
      this.currentPage = page;
    },
    filterDataBySearchTerm() {
      if (this.searchTerm) {
        return this.rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
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
</style>