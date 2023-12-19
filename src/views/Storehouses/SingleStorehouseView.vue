<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <h1 class="storehouse-heading">{{ storehouseName }}</h1>
    <span class="storehouse-adress">
    <IconMapPinFilled color="#4E4E4E" :size="24" stroke-width="1" />
    {{ storehouseAdress }}
  </span>
    <MDBBtn class="utility-btn" outline="black">Edit storehouse</MDBBtn>
  </MDBContainer>
  <MDBContainer class="d-flex flex-column gap-3">
    <MDBRow class="d-flex flex-row w-100 align-items-center align-self-center gap-3 pt-4">
      <h1 class="storehouse-heading">Products in stock</h1>
      <MDBBtn class="utility-btn" outline="black">+ NEW ARRIVAL</MDBBtn>
      <MDBBtn class="utility-btn" outline="black">+ NEW SALE</MDBBtn>
      <MDBBtn class="utility-btn" outline="black">+ REQUEST</MDBBtn>
      <SearchComponent class="search" @search="handleSearch" />
    </MDBRow>
    <TableComponent class="table" :rows="productRows" :columns="productColumns" :searchTerm="searchTerm" />
  </MDBContainer>
</template>

<script lang="ts">
import { IconMapPinFilled, IconRoute } from '@tabler/icons-vue';
import { MDBBtn,MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import TableComponent from "@/components/TableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: "SingleStorehouseView",
  components: {SearchComponent, TableComponent, IconRoute, IconMapPinFilled, MDBBtn, MDBContainer, MDBRow },
  props: {
    storehousesData: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    selectedStorehouse() {
      return this.storehousesData.find(storehouse => storehouse.id === this.id) || {};
    },
    storehouseName() {
      return this.selectedStorehouse.storehouseName || '';
    },
    storehouseAdress() {
      return this.selectedStorehouse.storehouseAdress || '';
    },
  },
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
    }
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  }
}
</script>

<style scoped>
.table {
  margin-top: 2rem;
}
.storehouse-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
}
.storehouse-adress {
  font-weight: 500;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
}
.storehouse-info {
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2rem;
}
.search {
  width: 100%;
  max-width: 35vw;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>