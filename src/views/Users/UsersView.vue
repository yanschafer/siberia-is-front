<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent @search="handleSearch" />
      <TableComponent :rows="usersData" :columns="usersColumns" :searchTerm="searchTerm" @rowClick="handleRowClick" />
    </template>
  </div>
  <router-view v-if="$route.params.id !== undefined" v-bind="getSelectedUser($route.params.id)" />
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: 'UsersView',
  components: { SearchComponent, TableComponent },
  data() {
    return {
      searchTerm: '',
      usersData: [
        { id: 1, name: 'Orlando R Fiorentini' },
        { id: 2, name: 'Orlando R Fiorentini' },
        // ...
        { id: 15, name: 'Sane4ka' },
      ],
      usersColumns: [
        { field: 'name', header: 'NAME' },
      ],
      usersDetails: [
        { id: 1, details: 'Details for user 1' },
        { id: 2, details: 'Details for user 2' },
        // ...
        { id: 15, details: 'Details for user 15' },
      ],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'singleUser', params: { id: row.id.toString() } });
    },
    getSelectedUser(id) {
      return this.usersDetails.find(user => user.id === id) || {};
    },
  },
};
</script>

<style scoped>

</style>