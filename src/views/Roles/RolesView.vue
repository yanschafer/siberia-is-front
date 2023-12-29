<template>
  <template v-if="!$route.params.id">
    <SearchComponent @search="handleSearch" />
    <TableComponent :rows="rolesData" :columns="rolesColumns" :searchTerm="searchTerm" @rowClick="handleRowClick" />
  </template>
  <router-view v-if="$route.params.id !== undefined" v-bind="getSelectedRole($route.params.id)" />
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: "RolesView",
  components: {SearchComponent, TableComponent},
  data() {
    return {
      searchTerm: '',
      rolesData: [
        { id: 1, roleName: 'Administrator', usersPerRole: '2' },
        { id: 2, roleName: 'Moderator', usersPerRole: '10' },
        { id: 3, roleName: 'Seller', usersPerRole: '20' },
      ],
      rolesColumns: [
        { field: 'roleName', header: 'ROLE NAME' },
        { field: 'usersPerRole', header: 'USERS PER ROLE' }
      ],
      rolesDetails: [
        { id: 1, details: 'Details for user 1' },
        { id: 2, details: 'Details for user 2' },
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
      this.$router.push({ name: 'Role', params: { id: row.id.toString() } });
    },
    getSelectedRole(id) {
      return this.rolesDetails.find(user => user.id === id) || {};
    },
  },
}
</script>
<style scoped>

</style>