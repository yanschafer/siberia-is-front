<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent @search="handleSearch" />
      <TableComponent :rows="storehousesRows" :columns="storehousesColumns" :searchTerm="searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="$route.params.id !== undefined" :storehousesData="storehousesData" :id="$route.params.id" /></div>
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default  {
  name: 'StorehousesView',
  components: {SearchComponent, TableComponent },
  data() {
    return {
      searchTerm: '',
      storehousesRows: [
        { id: 1, name: 'Storehouse 1', address: '123 Main St' },
        { id: 2, name: 'Storehouse 2', address: '456 Oak St' },
        { id: 3, name: 'Storehouse 3', address: '123 Main St' },
      ],
      storehousesColumns: [
        { field: 'name', header: 'NAME' },
        { field: 'address', header: 'ADDRESS' },
      ],
      storehousesData: [
        {
          id: '1',
          storehouseName: 'Storehouse 1',
          storehouseAdress: 'Storehouse adress 1'
        },
        {
          id: '2',
          storehouseName: 'Storehouse 2',
          storehouseAdress: 'Storehouse adress 2'
        },
        {
          id: '3',
          storehouseName: 'Storehouse 3',
          storehouseAdress: 'Storehouse adress 3'
        }
      ],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Storehouse', params: { id: row.id.toString() } });
    },
  },
}
</script>

<style scoped>

</style>