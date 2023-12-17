<template>
  <SearchComponent @search="handleSearch" />
  <TableComponent :rows="storehousesData" :columns="storehousesColumns" :searchTerm="searchTerm" />
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default  {
  name: 'ProductsView',
  components: {SearchComponent, TableComponent },
  data() {
    return {
      searchTerm: '',
      storehousesData: [
        { name: 'Main Storehouse, named “Storehouse 1”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 2”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 3”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 4”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 5”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 6”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 7”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse 8”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Main Storehouse, named “Storehouse ”', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },
        { name: 'Yan', adress: '20152,  Via San Cosmo fuori Porta Nolana 91' },

      ],
      storehousesColumns: [
        { field: 'name', header: 'NAME' },
        { field: 'adress', header: 'ADRESS' },
      ],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
}
</script>

<style scoped>

</style>