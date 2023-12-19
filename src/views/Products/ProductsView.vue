<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!$route.params.id">
      <SearchComponent @search="handleSearch" />
      <TableComponent :rows="productRows" :columns="productColumns" :searchTerm="searchTerm" @rowClick="handleRowClick" />
    </template>
    <router-view v-if="$route.params.id !== undefined" :productData="productData" :id="$route.params.id" />
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
      productRows: [
        { id: 1, name: 'TableZalupa', sku: '11111', quantity: '23', price: 100 },
        { id: 2, name: 'TableZalupa2', sku: '2222', quantity: '3', price: 100 },
      ],
      productColumns: [
        { field: 'name', header: 'NAME' },
        { field: 'sku', header: 'SKU' },
        { field: 'quantity', header: 'QUANTITY' },
        { field: 'price', header: 'PRICE' },
      ],
      productData: [
        {
          id: 1,
          productName: "Zalupa",
          imageSource: "/product-img.jpg", // Путь к изображению продукта
          sku: "SKU123",
          barcodeImage: "/sku.png",
          brand: "EXPERT",
          link: "OPEN LINK IN NEW WINDOW",
          quantity: 10,
          lastTimeOrdered: "2023-01-01",
          lastPriceOrdered: 90,
          costPrice: 80,
          status: "Active",
          category: "NAIL NIPPERS",
          productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          collectionName: "COLLECTION",
          color: "RED",
          volume: '25 oz',
          size: 5,
          quantityPerPackage: 1,
          distributionPrice: 100,
          distributionPriceWithoutVat: 90,
          distributionMarkup: 10,
          professionalPrice: 120,
          professionalPriceWithoutVat: 110,
          professionalMarkup: 10,
          defaultPrice: 150,
          defaultPriceWithoutVat: 140,
          defaultMarkup: 10,
        },
        {
          id: 2,
          productName: "Zalupa2",
          imageSource: "path/to/image1.jpg", // Путь к изображению продукта
          sku: "SKU123",
          barcodeImage: "path/to/barcode1.jpg",
          brand: "BrandName",
          link: "http://example.com/product1",
          quantity: 10,
          lastTimeOrdered: "2023-01-01",
          lastPriceOrdered: 90,
          costPrice: 80,
          status: "Active",
          nailNippersCategory: "Category1",
          productDescription: "Product description 1",
          collectionName: "Collection1",
          color: "Red",
          volume: 250,
          size: 5,
          quantityPerPackage: 1,
          distributionPrice: 100,
          distributionPriceWithoutVat: 90,
          distributionMarkup: 10,
          professionalPrice: 120,
          professionalPriceWithoutVat: 110,
          professionalMarkup: 10,
          defaultPrice: 150,
          defaultPriceWithoutVat: 140,
          defaultMarkup: 10,
        }
      ],
    };
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
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