<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent @search="handleSearch" />
      <TableComponent :rows="filteredUsers" :columns="usersStore.usersColumns" :searchTerm="usersStore.searchTerm" @rowClick="handleRowClick" />
    </template>
  </div>
  <router-view v-if="$route.params.id !== undefined" :usersData="usersStore.usersData" :currentUser="getCurrentUser" :id="$route.params.id" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useUsersStore } from "@/stores/store";
import { computed, ref } from "vue";

export default {
  name: 'UsersView',
  components: { SearchComponent, TableComponent },
  setup() {
    const usersStore = useUsersStore();
    const filteredUsers = computed(() => {
      const searchTerm = usersStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return usersStore.usersRows;
      } else {
        return usersStore.usersRows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });

    const getCurrentUser = (userId) => {
      return usersStore.usersData.find((user) => user.id == userId);
    };

    return {
      usersStore,
      filteredUsers,
      getCurrentUser,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.usersStore.loadUsersData();
    },
    handleSearch(searchTerm) {
      this.usersStore.searchTerm = searchTerm;
      if (searchTerm.trim() === "") {
        this.loadData();
      } else {
        this.usersStore.getFilteredUsers(searchTerm);
      }
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'User', params: { id: row.id.toString() } });
    },
  },
};
</script>

<style scoped>

</style>