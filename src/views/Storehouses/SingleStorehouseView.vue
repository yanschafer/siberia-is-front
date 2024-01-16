<template>
  <Toast />
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <div class="storehouse-container">
    <MDBContainer class="animate__animated animate__fadeIn storehouse-info d-flex flex-column gap-3">
      <h1 v-if="!editing" class="storehouse-heading">{{ storehouseName }}</h1>
      <InputText
          v-else
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="newStorehouseName"
      />
      <span v-if="!editing" class="storehouse-adress">
      <IconMapPinFilled color="#4E4E4E" :size="24" stroke-width="1" />
      {{ storehouseAddress }}
    </span>
      <InputText
          v-else
          class="input-wrapper animate__animated animate__fadeIn username-input"
          type="text"
          v-model="newStorehouseAdress"
      />
      <MDBBtn
          v-if="!editing"
          @click="startEditing"
          class="utility-btn"
          outline="black"
      >{{ localize("editStorehouse") }}</MDBBtn
      >
      <MDBCol v-else class="d-flex justify-content-start">
        <MDBBtn @click="cancelEditing" class="utility-btn" outline="black"
        >{{ localize("cancelCapslock", "default") }}</MDBBtn
        >
        <MDBBtn @click="confirmDeletion" class="utility-btn btn-danger"
        >{{ localize("deleteStorehouseCapslock") }}</MDBBtn
        >
        <MDBBtn @click="saveChanges" class="utility-btn btn-black">{{ localize("saveCapslock", "default") }}</MDBBtn>
      </MDBCol>
    </MDBContainer>
    <MDBContainer class="d-flex flex-column gap-3">
      <MDBRow
          class="d-flex flex-row w-100 align-items-center align-self-center gap-3 pt-4"
      >
        <h1 class="storehouse-heading">Products in stock</h1>
        <template v-if="!newArrival && !newSale && !newRequest">
          <MDBBtn @click="addNewArrival" class="utility-btn" outline="black"
          >{{ localize("newArrivalCapslock") }}</MDBBtn
          >
          <MDBBtn @click="addNewSale" class="utility-btn" outline="black"
          >{{ localize("newSaleCapslock") }}</MDBBtn
          >
          <MDBBtn @click="addNewRequest" class="utility-btn" outline="black"
          >{{ localize("newRequestCapslock") }}</MDBBtn
          >
          <SearchComponent class="search" @search="handleSearch" />
          <TableComponent
              :rows="productRows"
              :columns="productColumns"
              :searchTerm="searchTerm"
          />
        </template>
        <template v-else>
          <template v-if="newArrival">
            <StorehouseOperation
                :title="localize('newArrivalRegistration')"
                @cancel="newArrival = false"
                @save="saveNewArrival"
            ></StorehouseOperation>
          </template>
          <template v-else-if="newSale">
            <StorehouseOperation
                :title="localize('newSaleRegistration')"
                :need-validation="true"
                :amount-validation="productListValidateObject"
                @cancel="newSale = false"
                @save="saveNewSale"
            ></StorehouseOperation>
          </template>
          <template v-else-if="newRequest">
            <StorehouseOperation
                :title="localize('newRequestRegistration')"
                :show-price="false"
                @cancel="newRequest = false"
                @save="saveNewRequest"
            ></StorehouseOperation>
          </template>
        </template>
      </MDBRow>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { IconMapPinFilled, IconRoute } from "@tabler/icons-vue";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useStorehousesStore } from "@/stores/storehouse.store";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";
import { useToast } from "primevue/usetoast";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import StorehouseOperation from "@/views/Storehouses/StorehouseOperation.vue";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import Toast from "primevue/toast";
import PrintUtil from "@/utils/localization/print.util";
import { useModalStore } from "@/stores/modal.store";
import InputText from "primevue/inputtext";

export default {
  name: "SingleStorehouseView",
  components: {
    StorehouseOperation,
    SelectComponent,
    MDBCol,
    MDBInput,
    SearchComponent,
    TableComponent,
    IconRoute,
    IconMapPinFilled,
    MDBBtn,
    MDBContainer,
    MDBRow,
    ModalComponent,
    Toast,
    InputText
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data () {
      return{
          newArrival: false,
          newSale: false,
          modalTitle: this.localize("confirmDeletion"),
          disclaimerText:
                  this.localize("deleteWarn"),
          newRequest: false,
          editing: false,
          searchTerm: "",
          newStorehouseName: "",
          originalStorehouseName: "",
          newStorehouseAdress: "",
          originalStorehouseAdress: "",
          productColumns: [
              { field: "name", header: this.localize("nameCapslock", "default") },
              { field: "vendorCode", header: this.localize("skuCapslock", "products") },
              { field: "quantity", header: this.localize("quantityCapslock", "products") },
              { field: "price", header: this.localize("priceCapslock", "products") },
          ],
          error: "",
      }
  },
  async setup() {
    const productStore = useProductsStore();

    // await productStore.loadProductList()
    const storehouseStore = useStorehousesStore();
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    await productStore.loadProductList();

    await storehouseStore.loadSelectedStoreHouse(
      parseInt(route.params.id.toString()),
    );

    return {
      storehouseStore,
      productStore,
      modalStore,
      router,
    };
  },
  computed: {
    modalText() {
      return `${this.localize("messageForUser")} "${this.storehouseName}?"`;
    },
    selectedStorehouse() {
      return this.storehouseStore.getSelectedStorehouse;
    },
    storehouseName() {
      return this.selectedStorehouse.name || "";
    },
    storehouseAddress() {
      return this.selectedStorehouse.address || "";
    },
    productRows() {
      return this.selectedStorehouse.products || [];
    },
    productListValidateObject() {
      const obj = {};
      this.productRows.forEach((el) => {
        obj[el.id] = el.quantity;
      });
      return obj;
    },
  },
  methods: {
    localize(key, module = "storehouses") {
          return PrintUtil.localize(key, module);
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success"),
        detail: this.localize("changesWereSaved"),
        life: 3000,
      });
    },
    async showErrorToast() {
      const errorMessage = await PrintUtil.localize(
        "wrong_data_type",
        "storehousesSave",
      );
      const errorDetail = `Something went wrong, provide this error code to administrator.
    <p style="font-weight: 600; text-decoration: underline; cursor: pointer;">${errorMessage}</p>`;
      this.$toast.add({
        severity: "error",
        summary: "Error occurred",
        detail: errorDetail,
        life: 10000,
      });

      this.$nextTick(() => {
        const toastElement = document.querySelector(".p-toast-detail");
        if (toastElement) {
          toastElement.innerHTML = errorDetail;

          const errorMessageElement = toastElement.querySelector("p");
          errorMessageElement.addEventListener("click", () => {
            navigator.clipboard.writeText(errorMessage);
            this.$toast.add({
              severity: "success",
              summary: this.localize("errorMessageCopiedToClipboard", "default"),
              life: 2000,
            });
          });
        }
      });
    },
    addNewArrival() {
      this.newArrival = true;
      this.newSale = false;
      this.newRequest = false;
    },
    async saveNewArrival(arrivalData: ProductListItemDto[]) {
      const res = await this.storehouseStore.newArrival(this.id, arrivalData);
      if (res.success) {
        this.newArrival = false;
      } else {
        //TODO: Check for errors
      }
    },
    addNewSale() {
      this.newArrival = false;
      this.newSale = true;
      this.newRequest = false;
    },
    async saveNewSale(saleData: ProductListItemDto[]) {
      const res = await this.storehouseStore.newSale(this.id, saleData);
      if (res.success) {
        this.newSale = false;
      } else {
        //TODO: Check for errors
      }
    },
    addNewRequest() {
      this.newArrival = false;
      this.newSale = false;
      this.newRequest = true;
    },
    async saveNewRequest(requestData: ProductListItemDto[]) {
      const res = await this.storehouseStore.newRequest(this.id, requestData);
      if (res.success) {
        this.newRequest = false;
      } else {
        //TODO: Check for errors
      }
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    confirmDeletion() {
      this.modalStore.show({
        title: this.modalTitle,
        text: this.modalText,
        disclaimer: this.disclaimerText,
      });
    },
    closeModal() {
      this.modalStore.hide();
    },
    async removeAndCloseModal() {
      const removed = await this.storehouseStore.remove(this.id);
      if (removed.success) {
        this.modalStore.hide();
        await this.storehouseStore.loadStorehouseList();
        this.router.push({ name: "storehouses" });
      }
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
      const result = await this.storehouseStore.updateStorehouse(
        this.id,
        new StockUpdateDto(this.newStorehouseName, this.newStorehouseAdress),
      );
      if (result && result.success) {
        this.showSuccessToast();
        this.editing = !result.success;
      } else {
        this.showErrorToast();
        this.error = await PrintUtil.localize(
          "wrong_data_type",
          "storehousesSave",
        );
      }
    },
    cancelEditing() {
      this.editing = false;
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
.error-message {
  font-weight: 800 !important;
}
.storehouse-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  max-height: 80vh;
}
</style>
