<template>
  <Toast position="center" group="tl" />
  <ModalComponent v-if="showModal" @closeModal="closeModal" />
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <h1 v-if="!editing" class="storehouse-heading">{{ storehouseName }}</h1>
    <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newStorehouseName" />
    <span v-if="!editing" class="storehouse-adress">
    <IconMapPinFilled color="#4E4E4E" :size="24" stroke-width="1" />
      {{ storehouseAddress }}
    </span>
    <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newStorehouseAdress" />
    <MDBBtn v-if="!editing" @click="startEditing" class="utility-btn" outline="black">Edit storehouse</MDBBtn>
    <MDBCol v-else class="d-flex justify-content-start">
      <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">CANCEL</MDBBtn>
      <MDBBtn @click="openDeleteModal" class="utility-btn btn-danger">DELETE STOREHOUSE</MDBBtn>
      <MDBBtn @click="saveChanges" class="utility-btn btn-black">SAVE</MDBBtn>
    </MDBCol>
  </MDBContainer>
  <MDBContainer class="d-flex flex-column gap-3">
    <MDBRow class="d-flex flex-row w-100 align-items-center align-self-center gap-3 pt-4">
      <h1 class="storehouse-heading">Products in stock</h1>
      <template v-if="!newArrival && !newSale && !newRequest">
        <MDBBtn @click="addNewArrival" class="utility-btn" outline="black">+ NEW ARRIVAL</MDBBtn>
        <MDBBtn @click="addNewSale" class="utility-btn" outline="black">+ NEW SALE</MDBBtn>
        <MDBBtn @click="addNewRequest" class="utility-btn" outline="black">+ NEW REQUEST</MDBBtn>
        <SearchComponent class="search" @search="handleSearch" />
      </template>
      <template v-else>
        <template v-if="newArrival">
          <h5>New Arrival Registration</h5>
          <MDBRow class="d-flex flex-row flex-nowrap">
            <MDBCol class="col-auto">
              <SelectComponent :items="productsList" v-model="newArrivalItem" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBInput class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newArrivalQuantity" />
            </MDBCol>
            <MDBCol class=col-auto>
              <MDBInput class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newArrivalPrice" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBBtn class="utility-btn btn-black">+</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn class="utility-btn btn-black">CANCEL</MDBBtn>
              <MDBBtn class="utility-btn btn-success">SAVE</MDBBtn>
            </MDBCol>
          </MDBRow>
        </template>
        <template v-else-if="newSale">
          <h5>New Sale Registration</h5>
          <MDBRow class="d-flex flex-row flex-nowrap">
            <MDBCol class="col-auto">
              <SelectComponent  :items="productsList" v-model="newSaleItem" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBInput  class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newSaleQuantity" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBInput  class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newSalePrice" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBBtn class="utility-btn btn-black">+</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn class="utility-btn btn-black">CANCEL</MDBBtn>
              <MDBBtn class="utility-btn btn-success">SAVE</MDBBtn>
            </MDBCol>
          </MDBRow>
          </template>
        <template v-else-if="newRequest">
          <h5>New Request Registration</h5>
          <MDBRow class="d-flex flex-row flex-nowrap">
            <MDBCol class="col-auto">
              <SelectComponent  :items="productsList" v-model="newRequestItem" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBInput  class="input-wrapper animate__animated animate__fadeIn username-input" type="text" value="asdsad" v-model="newRequestQuantity" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBInput  class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newRequestPrice" />
            </MDBCol>
            <MDBCol class="col-auto">
              <MDBBtn class="utility-btn btn-black">+</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn class="utility-btn btn-black">CANCEL</MDBBtn>
              <MDBBtn class="utility-btn btn-success">SAVE</MDBBtn>
            </MDBCol>
          </MDBRow>
        </template>
      </template>
    </MDBRow>
    <TableComponent :rows="productRows" :columns="productColumns" :searchTerm="searchTerm" />
  </MDBContainer>
</template>

<script lang="ts">
import { IconMapPinFilled, IconRoute } from '@tabler/icons-vue';
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import {useRoute} from "vue-router";
import {useStorehousesStore} from "@/stores/storehouse.store";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";
import LoggerUtil from "@/utils/logger/logger.util";
import { useToast } from "primevue/usetoast";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import {useProductsStore} from "@/stores/products.store";
import { ref } from 'vue';

export default {
  name: "SingleStorehouseView",
  components: {
    SelectComponent,
    MDBCol,
    MDBInput, SearchComponent, TableComponent, IconRoute, IconMapPinFilled, MDBBtn, MDBContainer, MDBRow,
    ModalComponent,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    newArrival: false,
    newSale: false,
    newRequest: false,
    editing: false,
    showModal: false,
    searchTerm: '',
    newStorehouseName: '',
    originalStorehouseName: '',
    newStorehouseAdress: '',
    originalStorehouseAdress: '',
    productColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'sku', header: 'SKU' },
      { field: 'quantity', header: 'QUANTITY' },
      { field: 'price', header: 'PRICE' },
    ]
  }),
  async setup() {
    const productStore = useProductsStore();
    const toast = useToast();
    const showSuccess = () => {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    };

    // await productStore.loadProductList()
    const storehouseStore = useStorehousesStore();
    const route = useRoute();

    await productStore.loadProductList();

    await storehouseStore.loadSelectedStoreHouse(parseInt(route.params.id.toString()));

    return {
      toast,
      storehouseStore,
      showSuccess,
      productStore,
      productRows: productStore.productRows
    };
  },
  computed: {
    productsList() {
      return this.productStore.getProductList;
    },
    selectedStorehouse() {
      return this.storehouseStore.getSelectedStorehouse
    },
    storehouseName() {
      return this.selectedStorehouse.name || '';
    },
    storehouseAddress() {
      return this.selectedStorehouse.address || '';
    },
    productRows() {
      LoggerUtil.debug(this.selectedStorehouse.products)
      return this.selectedStorehouse.products || []
    }
  },
  methods: {
    addNewArrival() {
      this.newArrival = true;
      this.newSale = false;
      this.newRequest = false;
    },
    addNewSale() {
      this.newArrival = false;
      this.newSale = true;
      this.newRequest = false;
    },
    addNewRequest() {
      this.newArrival = false;
      this.newSale = false;
      this.newRequest = true;
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    openDeleteModal() {
      this.showModal = true;
    },
    closeModal() {
      console.log('closeModal called');
      this.showModal = false;
    },
    startEditing() {
      this.editing = true;
      this.originalStorehouseName = this.storehouseName;
      this.newStorehouseName = this.storehouseName;
      this.originalStorehouseAdress = this.storehouseAddress;
      this.newStorehouseAdress = this.storehouseAddress;
    },
    async saveChanges() {
      this.editing = false;
      const result = await this.storehouseStore.updateStorehouse(this.id, new StockUpdateDto(
          this.newStorehouseName, this.newStorehouseAdress
      ));
      this.showSuccess();
      this.editing = !result.success;
      //TODO: Check for errors
    },
    cancelEditing() {
      this.showToast()
      this.editing = false;
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
  max-width: 20vw;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-left: 0.3rem;
  align-self: center;
}
:deep(.p-toast) {
  position: relative;
  z-index: 99999999999999999999999999999999999!important;
}
</style>