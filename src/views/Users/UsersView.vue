<template>
  <div class="container-fluid" style="padding: 0">
    <template v-if="!isIdProvided">
      <MDBContainer class="d-flex container-content">
        <MDBCol class="col-auto">
          <FiltersSidebarComponent
            :filters-input="filtersInput"
            @start-search="handleFiltersSearch"
          />
        </MDBCol>
        <MDBCol class="col-auto">
          <SearchComponent @search="handleSearch" />
          <TableComponent
            :rows="filteredUsers"
            :columns="usersStore.usersColumns"
            :searchTerm="usersStore.searchTerm"
            @rowClick="handleRowClick"
          />
        </MDBCol>
      </MDBContainer>
    </template>
  </div>
  <Suspense>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </Suspense>
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useUsersStore } from "@/stores/user.store";
import { MDBCol, MDBContainer } from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/Filter/FiltersSidebarComponent.vue";
import { FilterType } from "@/api/conf/app.conf";
import { useToast } from "primevue/usetoast";
import loggerUtil from "@/utils/logger/logger.util";

export default {
  name: "UsersView",
  components: {
    MDBCol,
    FiltersSidebarComponent,
    MDBContainer,
    SearchComponent,
    TableComponent,
  },
  data: () => ({
    filtersInput: {
      name: {
        title: "Name",
        type: FilterType.TEXT,
        value: null,
      },
      login: {
        title: "Login",
        type: FilterType.TEXT,
        value: null,
      },
    },
  }),
  async setup() {
    const usersStore = useUsersStore();
    const route = useRoute();
    const router = useRouter();

    const loadRes = await usersStore.loadUsersList();
    return {
      usersStore,
      router,
      route,
      loadRes,
    };
  },
  mounted() {
    this.loadRes.toastIfError(this.$toast, this.$nextTick);
  },
  computed: {
    filteredUsers() {
      const searchTerm = this.usersStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return this.usersStore.getUserList;
      } else {
        return this.usersStore.getUserList.filter((row) =>
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
      this.usersStore.searchTerm = searchTerm;
    },
    async handleFiltersSearch(filter) {
      const res = await this.usersStore.loadUsersList(filter);
      res.toastIfError(this.$toast, this.$nextTick);
    },
    handleRowClick(row) {
      this.router.push({ name: "User", params: { id: row.id.toString() } });
    },
  },
};
</script>

<style scoped></style>
