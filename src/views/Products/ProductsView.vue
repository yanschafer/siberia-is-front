<template>
<div class="container-fluid" style="padding: 0;">
  <SearchComponent @search="handleSearch" />
  <TableComponent :rows="productsData" :columns="productColumns" :searchTerm="searchTerm" />
  <router-view name="product" />
</div>
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default  {
  name: 'ProductsView',
  components: {SearchComponent, TableComponent },
  data() {
    return {
      searchTerm: '',
      productsData: [
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Yan', sku: 'NE-60-12', quantity: 20, price: 12.75 },
        { name: 'Professional nail nippers EXPERT 60 12 mm', sku: 'NE-60-12', quantity: 20, price: 12.75 },
      ],
      productColumns: [
        { field: 'name', header: 'NAME' },
        { field: 'sku', header: 'SKU' },
        { field: 'quantity', header: 'QUANTITY' },
        { field: 'price', header: 'PRICE' },
      ],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
}
</script>

<style scoped>

</style>