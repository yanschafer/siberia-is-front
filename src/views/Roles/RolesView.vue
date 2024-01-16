<template>
  <template v-if="!isIdProvided">
    <SearchComponent @search="handleSearch" />
    <TableComponent
      :rows="filteredRoles"
      :columns="rolesStore.rolesColumns"
      :searchTerm="rolesStore.searchTerm"
      @rowClick="handleRowClick"
    />
  </template>
  <router-view v-if="isIdProvided" :id="routeIdParam" />
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useRolesStore } from "@/stores/roles.store";

export default {
  name: "RolesView",
  components: { SearchComponent, TableComponent },
  props: {
    id: String,
  },
  async setup() {
    const rolesStore = useRolesStore();
    const route = useRoute();
    const router = useRouter();
    return {
      rolesStore,
      route,
      router,
      loadRes: await rolesStore.loadRolesList(),
    };
  },
  mounted() {
    if (!this.loadRes.success)
      this.loadRes.getError().showServerErrorToast(this.$toast, this.$nextTick);
  },
  computed: {
    filteredRoles() {
      const searchTerm = this.rolesStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return this.rolesStore.getRolesList;
      } else {
        return this.rolesStore.getRolesList.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      }
    },
    routeIdParam() {
      return parseInt(this.route.params.id.toString());
    },
    isIdProvided() {
      return !!this.route.params.id;
    },
  },
  methods: {
    handleSearch(searchTerm) {
      this.rolesStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      this.router.push({ name: "Role", params: { id: row.id.toString() } });
    },
  },
};
</script>
<style scoped></style>
