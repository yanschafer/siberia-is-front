<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!isIdProvided">
      <MDBContainer class="d-flex container-content">
        <MDBCol class="col-auto">
          <FiltersSidebarComponent />
        </MDBCol>
        <MDBCol class="col-auto">
          <SearchComponent @search="handleSearch" />
          <TableComponent :rows="filteredUsers" :columns="usersStore.usersColumns" :searchTerm="usersStore.searchTerm" @rowClick="handleRowClick" />
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
import {useRoute, useRouter} from "vue-router";
import {useUsersStore} from "@/stores/user.store";
import {MDBCol, MDBContainer} from "mdb-vue-ui-kit";
import FiltersSidebarComponent from "@/components/Elements/FiltersSidebarComponent.vue";


export default {
  name: 'UsersView',
  components: {MDBCol, FiltersSidebarComponent, MDBContainer, SearchComponent, TableComponent },
  async setup() {
    const usersStore = useUsersStore()
    const route = useRoute()
    const router = useRouter()
    await usersStore.loadUsersList()
    return {
      usersStore,
      router,
      route
    };
  },
  computed: {
    filteredUsers() {
      const searchTerm = this.usersStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return this.usersStore.getUserList;
      } else {
        return this.usersStore.getUserList.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    },
    routeIdParam() {
      return parseInt(this.route.params.id.toString())
    },
    isIdProvided() {
      return !!this.route.params.id
    }
  },
  methods: {
    handleSearch(searchTerm) {
      this.usersStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.router.push({ name: 'User', params: { id: row.id.toString() } });
    },
  },
};
</script>

<style scoped>

</style>