<template>
  <h5>{{ title }}</h5>
  <MDBRow class="d-flex flex-row flex-nowrap">
    <MDBCol class="col-auto">
      <SelectComponent :placeholder="placeholder" :items="productList" v-model="selectedProduct" />
    </MDBCol>
    <MDBCol class="col-auto">
      <InputText class="input-wrapper animate__animated animate__fadeIn username-input" type="text" placeholder="Quantity" v-model="quantity" />
    </MDBCol>
    <MDBCol v-if="showPrice" class=col-auto>
      <InputText class="input-wrapper animate__animated animate__fadeIn username-input" type="text" placeholder="Price" v-model="price" />
    </MDBCol>
    <MDBCol class="col-auto">
      <MDBBtn class="utility-btn btn-black" @click="add">+</MDBBtn>
    </MDBCol>
    <MDBCol>
      <MDBBtn class="utility-btn btn-black" @click="cancel">{{ localize("cancelCapslock", "default") }}</MDBBtn>
      <MDBBtn class="utility-btn btn-success" @click="save">{{ localize("saveCapslock", "default") }}</MDBBtn>
    </MDBCol>
  </MDBRow>
  <SearchComponent @search="handleAddedSearch" />
  <TableComponent
       :rowsPerPage="6"
       :rows="addedList"
       :enable-delete="true"
       :columns="addedColumns"
       :searchTerm="addedSearchTerm"
  />
</template>
<script lang="ts">
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-vue-ui-kit";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import TableComponent from "@/components/Elements/TableComponent.vue";
import {useProductsStore} from "@/stores/products.store.js";
import {useStorehousesStore} from "@/stores/storehouse.store";
import PrintUtil from "@/utils/localization/print.util";
import InputText from "primevue/inputtext";
import SearchComponent from "@/components/Elements/SearchComponent.vue";


export default {
  name: "StorehouseOperation",
  components: {
    SearchComponent,
    MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, SelectComponent, TableComponent, InputText
  },
  props: {
    title: String,
    needValidation: {
      type: Boolean,
      "default": false
    },
    amountValidation: Object,
    showPrice: {
      type: Boolean,
      "default": true
    }
  },
  emits: [
    "cancel", "save"
  ],
  data (){
      return{
          searchTerm: "",
          selectedProduct: {},
          quantity: null,
          price: null,
          addedSearchTerm: "",
          addedList: [],
          placeholder: this.localize("selectAProduct"),
          addedColumns: [
              { field: 'name', header: this.localize("nameCapslock", "default") },
              { field: 'sku', header: this.localize("skuCapslock", "products") },
              { field: 'quantity', header: this.localize("quantityCapslock", "products") },
          ]
      }
  },
  async setup() {
    const productStore = useProductsStore()
    const storehouseStore = useStorehousesStore()
    return {
      storehouseStore,
      productList: await productStore.getProductList
    }
  },
  created() {
    if (this.showPrice)
      this.addedColumns.push({ field: 'price', header: this.localize("priceCapslock", "products") })
    this.storehouseStore.$onAction(({name}) => {
      if (name == "operationSucceed")
        this.addedList = []
    })
  },
  methods: {
    handleAddedSearch(searchTerm) {
      this.addedSearchTerm = searchTerm;
    },
    localize(key, module = "storehouses") {
          return PrintUtil.localize(key, module);
    },
    add() {
      if (!this.selectedProduct || !this.quantity)
        return
      if (this.showPrice && !this.price)
        return
      //TODO: Show errors
      
      if (this.needValidation) {
        if (this.amountValidation[this.selectedProduct.id] < this.quantity)
          return
        //TODO: Tell to user that amount is too big
      }
      this.addedList.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        sku: this.selectedProduct.vendorCode,
        quantity: this.quantity,
        price: this.price
      })
      this.selectedProduct = null
      this.price = null
      this.quantity = null
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
  margin-top: 0;
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
:deep(td.p-editable-column) {
  height: 40px !important;
  padding: 8px;
}
</style>