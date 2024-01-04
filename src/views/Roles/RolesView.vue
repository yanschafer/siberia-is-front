<template>
  <template v-if="!$route.params.id">
    <SearchComponent @search="handleSearch" />
    <TableComponent :rows="filteredRoles" :columns="rolesStore.rolesColumns" :searchTerm="rolesStore.searchTerm" @rowClick="handleRowClick" />
  </template>
  <router-view v-if="$route.params.id !== undefined" :rolesData="rolesStore.rolesData" :currentRole="getCurrentRole" :id="$route.params.id" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import {useRolesStore} from "@/stores/store";
import {computed} from "vue";

export default {
  name: "RolesView",
  components: {SearchComponent, TableComponent},
  setup() {
    const rolesStore = useRolesStore();
    const filteredRoles = computed(() => {
      const searchTerm = rolesStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return rolesStore.rolesRows;
      } else {
        return rolesStore.rolesRows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });

    const getCurrentRole = (roleId) => {
      return rolesStore.rolesData.find((role) => role.id === roleId);
    };

    return {
      rolesStore,
      filteredRoles,
      getCurrentRole,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.rolesStore.loadRolesData();
    },
    handleSearch(searchTerm) {
      this.rolesStore.searchTerm = searchTerm;
      if (searchTerm.trim() === "") {
        this.loadData();
      } else {
        this.rolesStore.getFilteredRoles(searchTerm);
      }
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Role', params: { id: row.id.toString() } });
    },
  },
}
</script>
<style scoped>

</style>