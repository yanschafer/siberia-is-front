<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!isIdProvided">
      <SearchComponent @search="handleSearch" />
      <TableComponent :editableColumns="editableColumns" :showEditColumn=true :rows="productsStore.productRows" :columns="productsStore.productColumns" :searchTerm="productsStore.searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useProductsStore } from '@/stores/products.store';
import {useRoute, useRouter} from "vue-router";

export default {
  name: 'ProductsView',
  components: { SearchComponent, TableComponent },
  async setup() {
    const productsStore = useProductsStore();
    const route = useRoute()
    const router = useRouter()
    await productsStore.loadProductList()
    return {
      productsStore,
      route, router
    };
  },
  data() {
    return {
      editableColumns: ['price'],
    }
  },
  computed: {
    getFilteredProducts() {
      const searchTerm = this.productsStore.getSearchTerm
      
      if (searchTerm.trim() === "")
        return this.productsStore.getProductList
      
      return this.productsStore.getProductList.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
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
      this.productsStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.router.push({ name: 'Product details', params: { id: row.id.toString() } });
    },
  },
}
</script>

<style scoped>

  </style>