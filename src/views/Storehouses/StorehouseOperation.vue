<template>
  <h5>{{ title }}</h5>
  <MDBRow class="d-flex flex-row flex-nowrap">
    <MDBCol class="col-auto">
      <SelectComponent :items="productList" v-model="selectedProduct" />
    </MDBCol>
    <MDBCol class="col-auto">
      <MDBInput class="input-wrapper animate__animated animate__fadeIn username-input" type="text" placeholder="Quantity" v-model="quantity" />
    </MDBCol>
    <MDBCol class=col-auto>
      <MDBInput class="input-wrapper animate__animated animate__fadeIn username-input" type="text" placeholder="Price" v-model="price" />
    </MDBCol>
    <MDBCol class="col-auto">
      <MDBBtn class="utility-btn btn-black" @click="add">+</MDBBtn>
    </MDBCol>
    <MDBCol>
      <MDBBtn class="utility-btn btn-black" @click="cancel">CANCEL</MDBBtn>
      <MDBBtn class="utility-btn btn-success" @click="save">SAVE</MDBBtn>
    </MDBCol>
  </MDBRow>
  <TableComponent :rows="addedList" :columns="addedColumns" :searchTerm="addedSearchTerm" />
</template>

<script lang="ts">
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-vue-ui-kit";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import TableComponent from "@/components/Elements/TableComponent.vue";
import {useProductsStore} from "@/stores/products.store.js";
import {useStorehousesStore} from "@/stores/storehouse.store";

export default {
  name: "StorehouseOperation",
  components: {
    MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, SelectComponent, TableComponent
  },
  props: {
    title: String,
  },
  emits: [
    "cancel", "save"
  ],
  data: () => ({
    selectedProduct: {},
    quantity: null,
    price: null,
    addedSearchTerm: "",
    addedList: [],
    addedColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'sku', header: 'SKU' },
      { field: 'quantity', header: 'QUANTITY' },
      { field: 'price', header: 'PRICE' },
    ]
  }),
  async setup() {
    const productStore = useProductsStore()
    const storehouseStore = useStorehousesStore()
    return {
      storehouseStore,
      productList: await productStore.getProductList
    }
  },
  created() {
    this.storehouseStore.$onAction(({name}) => {
      if (name == "operationSucceed")
        this.addedList = []
    })
  },
  methods: {
    add() {
      if (!this.price || !this.selectedProduct || !this.quantity)
        return
      this.addedList.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        sku: this.selectedProduct.vendorCode,
        quantity: this.quantity,
        price: this.price
      })
    },
    cancel() {
      this.storehouseStore.operationSucceed()
      this.$emit("cancel")
    },
    save() {
      this.$emit("save", this.addedList)
    }
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