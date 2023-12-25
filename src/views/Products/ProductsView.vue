<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent @search="handleSearch" />
      <TableComponent :getFilteredData="getFilteredProducts" :rows="productsStore.productRows" :columns="productsStore.productColumns" :searchTerm="searchStore.searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="$route.params.id !== undefined" :productData="productsStore.productData" :id="$route.params.id" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import { useProductsStore, useSearchStore } from '@/stores/store';

export default {
  name: 'ProductsView',
  components: { SearchComponent, TableComponent },
  setup() {
    const productsStore = useProductsStore();
    const searchStore = useSearchStore();

    const getFilteredProducts = () => {
      return productsStore.getFilteredProducts(searchStore.searchTerm);
    };

    return {
      productsStore,
      searchStore,
      getFilteredProducts,
    };
  },
  mounted() {
    this.productsStore.loadProductData();
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchStore.setSearchTerm(searchTerm);
    },
    handleRowClick(row) {
      console.log('Clicked row with id:', row.id);
      this.$router.push({ name: 'Product details', params: { id: row.id.toString() } });
    },
  },
}
</script>

<style scoped>

  </style>