<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!isIdProvided">
      <SearchComponent v-model="storehousesStore.searchTerm" @search="handleSearch" />
      <TableComponent :rows="filteredStorehouses" :columns="storehousesStore.storehousesColumns" :searchTerm="storehousesStore.searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useStorehousesStore } from '@/stores/storehouse.store';
import {useRoute, useRouter} from "vue-router";

export default  {
  name: 'StorehousesView',
  components: {SearchComponent, TableComponent },
  async setup() {
    const storehousesStore = useStorehousesStore();
    const route = useRoute()
    const router = useRouter()
    await storehousesStore.loadStorehouseList()
    
    return {
      storehousesStore,
      route,
      router,
    };
  },
  computed: {
    filteredStorehouses() {
      const searchTerm = this.storehousesStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return this.storehousesStore.getStorehouseList;
      } else {
        return this.storehousesStore.getStorehouseList.filter((row) =>
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
      this.storehousesStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.router.push({ name: 'Storehouse', params: { id: row.id } });
    },
  },
}
</script>

<style scoped>

</style>