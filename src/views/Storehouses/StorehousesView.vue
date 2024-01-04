<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent v-model="storehousesStore.searchTerm" @search="handleSearch" />
      <TableComponent :rows="filteredStorehouses" :columns="storehousesStore.storehousesColumns" :searchTerm="storehousesStore.searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="$route.params.id !== undefined" :storehousesData="storehousesStore.storehousesData" :id="$route.params.id" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useStorehousesStore } from '@/stores/store';
import { computed } from 'vue';

export default  {
  name: 'StorehousesView',
  components: {SearchComponent, TableComponent },
  setup() {
    const storehousesStore = useStorehousesStore();
    const filteredStorehouses = computed(() => {
      const searchTerm = storehousesStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return storehousesStore.storehousesRows;
      } else {
        return storehousesStore.storehousesRows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });

    return {
      storehousesStore,
      filteredStorehouses,
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    handleSearch(searchTerm) {
      this.storehousesStore.searchTerm = searchTerm;
      if (searchTerm.trim() === "") {
        this.resetSearchTerm();
        this.loadData();
      } else {
        this.storehousesStore.getFilteredStorehouses(searchTerm);
      }
    },
    resetSearchTerm() {
      this.storehousesStore.searchTerm = ""; // Сбросить значение в компоненте
      this.loadData();
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Storehouse', params: { id: row.id.toString() } });
    },
    loadData() {
      this.storehousesStore.loadStorehousesData();
    },
  },
}
</script>

<style scoped>

</style>