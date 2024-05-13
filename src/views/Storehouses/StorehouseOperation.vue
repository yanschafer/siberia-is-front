<template>
  <h5>{{ title }}</h5>
  <MDBRow class="d-flex flex-row flex-nowrap">
    <MDBCol class="col-auto">
      <SelectComponent
        :placeholder="placeholder"
        :items="productList"
        v-model="selectedProduct"
        :showBadge="true"
        :filter="true"
      />
    </MDBCol>
    <MDBCol class="col-auto">
      <MDBInput
        class="input-wrapper animate__animated animate__fadeIn username-input"
        type="number"
        :placeholder="localize('quantity')"
        v-model="quantity"
      />
    </MDBCol>
    <MDBCol v-if="showPrice" class="col-auto">
      <MDBInput
        class="input-wrapper animate__animated animate__fadeIn username-input"
        type="number"
        :placeholder="localize('price')"
        v-model="price"
      />
    </MDBCol>
    <MDBCol class="col-auto">
      <MDBBtn class="utility-btn btn-black" @click="add">+</MDBBtn>
    </MDBCol>
    <MDBCol class="d-flex gap-2">
      <MDBBtn class="utility-btn btn-black" @click="cancel">{{
        localize("cancelCapslock", "default")
      }}</MDBBtn>
      <MDBBtn class="utility-btn btn-success" @click="save">{{
        localize("saveCapslock", "default")
      }}</MDBBtn>
    </MDBCol>
  </MDBRow>
  <SearchComponent @search="handleAddedSearch" />
  <TableComponent
    :info-message="noDataMessage"
    :rowsPerPage="6"
    :infoMessage="noDataMessage"
    :rows="addedList"
    :enable-delete="true"
    :columns="addedColumns"
    :searchTerm="addedSearchTerm"
    @row-delete="handleRowDelete"
  />
</template>
<script lang="ts">
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-vue-ui-kit";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { useProductsStore } from "@/stores/products.store.js";
import { useStorehousesStore } from "@/stores/storehouse.store";
import PrintUtil from "@/utils/localization/print.util";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import loggerUtil from "@/utils/logger/logger.util";
import InputText from "primevue/inputtext";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "StorehouseOperation",
  components: {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    SelectComponent,
    TableComponent,
    SearchComponent,
    InputText,
  },
  props: {
    title: String,
    needValidation: {
      type: Boolean,
      default: false,
    },
    amountValidation: Object,
    showPrice: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["cancel", "save"],
  data() {
    return {
      noDataMessage: {
        icon: "IconInfoCircle",
        title: this.localize("noProductInList"),
        text: this.localize("pleaseAddOneFirst"),
      },
      selectedProduct: null,
      quantity: null,
      price: null,
      addedSearchTerm: "",
      addedList: [],
      placeholder: this.localize("selectAProduct"),
      addedColumns: [
        { field: "name", header: this.localize("nameCapslock", "default") },
        { field: "sku", header: this.localize("skuCapslock", "products") },
        { field: "ean", header: "EAN" },
        {
          field: "quantity",
          header: this.localize("quantityCapslock", "products"),
        },
      ],
    };
  },
  async setup() {
    const productStore = useProductsStore();
    const storehouseStore = useStorehousesStore();
    return {
      storehouseStore,
      productStore,
    };
  },
  created() {
    LoggerUtil.debug(this.amountValidation, this.needValidation);
    if (this.showPrice)
      this.addedColumns.push({
        field: "price",
        header: this.localize("priceCapslock", "products"),
      });
    this.storehouseStore.$onAction(({ name }) => {
      if (name == "operationSucceed") this.addedList = [];
    });
  },
  computed: {
    productList() {
      let list;
      if (!this.needValidation) list = this.productStore.getProductList;
      else
        list = this.productStore.getProductList.filter(
          (el) => this.amountValidation[el.id],
        );

      return list.map((el) => ({
        ...el,
        badgeName: el.vendorCode,
      }));
    },
  },
  methods: {
    handleRowDelete(data) {
      this.addedList = this.addedList.filter((el) => el.id != data.id);
    },
    handleAddedSearch(searchTerm) {
      this.addedSearchTerm = searchTerm;
    },
    localize(key, module = "storehouses") {
      return PrintUtil.localize(key, module);
    },
    showErrorToast(detail) {
      loggerUtil.debug(detail);
      this.$toast.add({
        severity: "error",
        summary: this.localize("failed"),
        detail,
        life: 3000,
      });
    },
    add() {
      const validator = new ValidatorUtil();
      const quantityValidateRule = new ValidateRule().required().setMin(0);
      validator.addRule("quantity", quantityValidateRule);

      if (!this.selectedProduct || !this.quantity) {
        this.showErrorToast(this.localize("quantityAndProductMustBeSelected"));
        return;
      }

      if (this.showPrice && !this.price) {
        if (!this.price) {
          this.showErrorToast(this.localize("priceMustBeSelected"));
          return;
        }
        const priceValidateRule = new ValidateRule().required().setMin(0);
        validator.addRule("price", priceValidateRule);
      }

      const validateRes = validator.validate({
        quantity: parseInt(this.quantity),
        price: parseFloat(this.price),
      });
      if (validateRes !== true) {
        validator.showErrorToast(this.$toast);
        return;
      }

      const alreadyInList =
        this.addedList.filter((el) => el.id == this.selectedProduct.id)
          .length != 0;

      if (alreadyInList) {
        this.showErrorToast(this.localize("productAlreadyInList"));
        return;
      }

      if (this.needValidation) {
        if (
          this.amountValidation[this.selectedProduct.id] < this.quantity ||
          !this.amountValidation[this.selectedProduct.id]
        ) {
          this.showErrorToast(this.localize("notEnoughProductsStorehouses"));
          return;
        }
      }

      this.addedList.push({
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        sku: this.selectedProduct.vendorCode,
        ean: this.selectedProduct.eanCode,
        quantity: this.quantity,
        price: parseFloat(`${this.price}`.replace(",", ".")),
      });
      this.selectedProduct = null;
      this.price = null;
      this.quantity = null;
    },
    cancel() {
      this.storehouseStore.operationSucceed();
      this.$emit("cancel");
    },
    save() {
      if (this.addedList.length) this.$emit("save", this.addedList);
      else this.cancel();
    },
  },
};
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
.storehouse-info {
  border-bottom: 1px solid #eeeeee;
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
  z-index: 99999999999999999999999999999999999 !important;
}
:deep(td.p-editable-column) {
  height: 40px !important;
  padding: 8px;
}
</style>
