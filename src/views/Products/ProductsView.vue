<template>
  <div class="container-fluid" style="padding: 0;">
    <template v-if="!isIdProvided">
      <MDBContainer class="d-flex container-content">
        <MDBCol class="col-auto">
          <FiltersSidebarComponent :filters="sidebarProductFilters" />
        </MDBCol>
        <MDBCol class="col-auto">
          <MDBContainer class="table-container">
            <SearchComponent @search="handleSearch" />
            <TableComponent :editableColumns="editableColumns" :showEditColumn=true :rows="productsStore.productRows" :columns="productsStore.productColumns" :searchTerm="productsStore.searchTerm" @rowClick="handleRowClick" />
          </MDBContainer>
          </MDBCol>
        </MDBContainer>
    </template>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </div>
</template>

<script lang="ts">
import FiltersSidebarComponent from "@/components/Elements/FiltersSidebarComponent.vue";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import { useProductsStore } from '@/stores/products.store';
import {useRoute, useRouter} from "vue-router";
import {MDBContainer, MDBCol} from "mdb-vue-ui-kit";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import {ref} from "vue";

export default {
  name: 'ProductsView',
  components: { SearchComponent, TableComponent, FiltersSidebarComponent, MDBCol, MDBContainer },
  async setup() {
    const productsStore = useProductsStore();
    const filterDto = ref(new ProductSearchFilterDto());
    const route = useRoute()
    const router = useRouter()
    await productsStore.loadProductList()
    return {
      productsStore,
      route, router,
      filterDto
    };
  },
  data() {
    return {
      editableColumns: ['price'],
    }
  },
  computed: {
    sidebarProductFilters() {
      return this.filterDto.value
    },
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
.container-content {
  width: 100%;
  margin: 0;
}
.table-container {
  width: 83vw;
}
  </style>