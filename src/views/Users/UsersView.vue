<template>
  <SearchComponent @search="handleSearch" />
  <TableComponent :rows="usersData" :columns="usersColumns" :searchTerm="searchTerm" />
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default  {
  name: 'UsersView',
  components: {SearchComponent, TableComponent },
  data() {
    return {
      searchTerm: '',
      usersData: [
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Orlando R Fiorentini' },
        { name: 'Yan4ik' },
        { name: 'Sane4ka' },

      ],
      usersColumns: [
        { field: 'name', header: 'NAME' },
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