<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <div class="storehouse-container">
    <MDBContainer
      class="animate__animated animate__fadeIn storehouse-info d-flex flex-column gap-3"
    >
      <h1 v-if="!editing" class="storehouse-heading">{{ storehouseName }}</h1>
      <InputText
        v-else
        class="input-wrapper animate__animated animate__fadeIn username-input"
        :class="{ 'p-invalid': !validate.name }"
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
        :class="{ 'p-invalid': !validate.address }"
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
      <MDBCol v-else class="d-flex justify-content-start gap-2">
        <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">{{
          localize("cancelCapslock", "default")
        }}</MDBBtn>
        <MDBBtn @click="confirmDeletion" class="utility-btn btn-danger">{{
          localize("deleteStorehouseCapslock")
        }}</MDBBtn>
        <MDBBtn @click="saveChanges" class="utility-btn btn-black">{{
          localize("saveCapslock", "default")
        }}</MDBBtn>
      </MDBCol>
    </MDBContainer>
    <MDBContainer class="d-flex flex-column gap-3">
      <MDBRow
        class="d-flex flex-row w-100 align-items-center align-self-center gap-3 pt-4"
      >
        <h1 class="storehouse-heading">{{ localize("productsInStock") }}</h1>
        <template v-if="!newArrival && !newSale && !newRequest">
          <MDBBtn
            v-if="arrivalAvailable"
            @click="addNewArrival"
            class="utility-btn"
            outline="black"
            >{{ localize("newArrivalCapslock") }}</MDBBtn
          >
          <MDBBtn
            v-if="saleAvailable"
            @click="addNewSale"
            class="utility-btn"
            outline="black"
            >{{ localize("newSaleCapslock") }}</MDBBtn
          >
          <MDBBtn
            v-if="requestAvailable"
            @click="addNewRequest"
            class="utility-btn"
            outline="black"
            >{{ localize("newRequestCapslock") }}</MDBBtn
          >
          <SearchComponent class="search" @search="handleSearch" />
          <TableComponent
            :info-message="noDataMessage"
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
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { useStorehousesStore } from "@/stores/storehouse.store";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";
import { useToast } from "primevue/usetoast";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import { useProductsStore } from "@/stores/products.store";
import StorehouseOperation from "@/views/Storehouses/StorehouseOperation.vue";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import Toast from "primevue/toast";
import PrintUtil from "@/utils/localization/print.util";
import { useModalStore } from "@/stores/modal.store";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import { appConf, TransactionStatus } from "@/api/conf/app.conf";
import TokenUtil from "@/utils/token.util";
import loggerUtil from "@/utils/logger/logger.util";
import InputText from "primevue/inputtext";
import { useAuthCheckStore } from "@/stores/auth-check.store";

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
    InputText,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newArrival: false,
      newSale: false,
      modalTitle: this.localize("confirmDeletion"),
      disclaimerText: this.localize("deleteWarn"),
      newRequest: false,
      editing: false,
      searchTerm: "",
      newStorehouseName: "",
      originalStorehouseName: "",
      newStorehouseAdress: "",
      originalStorehouseAdress: "",
      productColumns: [
        { field: "name", header: this.localize("nameCapslock", "default") },
        {
          field: "vendorCode",
          header: this.localize("skuCapslock", "products"),
        },
        {
          field: "quantity",
          header: this.localize("quantityCapslock", "products"),
        },
        { field: "price", header: this.localize("priceCapslock", "products") },
      ],
      error: "",
      validate: {
        name: true,
        address: true,
      },
      validator: new ValidatorUtil(),
      noDataMessage: {
        icon: "IconInfoCircle",
        title: this.localize("noProductInList"),
        text: this.localize("pleaseAddOneFirst"),
      },
      arrivalAvailable: true,
      saleAvailable: true,
      requestAvailable: true,
    };
  },
  async setup() {
    const productStore = useProductsStore();
    const storehouseStore = useStorehousesStore();
    const authCheckStore = useAuthCheckStore();
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    return {
      storehouseStore,
      productStore,
      modalStore,
      route,
      router,
      loadProductListRes: await productStore.loadProductList(),
      loadSelectedStorehouse: await storehouseStore.loadSelectedStoreHouse(
        parseInt(route.params.id.toString()),
      ),
      authCheckStore,
    };
  },
  created() {
    this.loadProductListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadSelectedStorehouse.toastIfError(this.$toast, this.$nextTick);
    if (this.loadSelectedStorehouse.success) this.updateMangeButtons();

    this.authCheckStore.$onAction(async ({ name }) => {
      if (name == "refresh") {
        const loadRes = await this.storehouseStore.loadSelectedStoreHouse(
          this.id,
        );
        if (!loadRes.success) {
          if (loadRes.getError().httpStatusCode != 403) {
            loadRes.toastIfError(this.$toast, this.$nextTick);
          }
        } else this.updateMangeButtons();
      }
    });

    const nameValidateRule = new ValidateRule().skipIfNull().required();
    const addressValidateRule = new ValidateRule().skipIfNull().required();

    this.validator = this.validator
      .addRule("name", nameValidateRule)
      .addRule("address", addressValidateRule);
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
    clearValidationErrors() {
      this.validate = {
        name: true,
        address: true,
      };
    },
    localize(key, module = "storehouses") {
      return PrintUtil.localize(key, module);
    },
    updateMangeButtons() {
      this.arrivalAvailable = TokenUtil.hasAccessToStock(
        appConf.rules.arrivalCreation,
        this.id,
      );
      this.saleAvailable = TokenUtil.hasAccessToStock(
        appConf.rules.saleCreation,
        this.id,
      );
      this.requestAvailable = TokenUtil.hasAccessToStock(
        appConf.rules.requestCreation,
        this.id,
      );
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success"),
        detail: this.localize("changesWereSaved"),
        life: 3000,
      });
    },
    showSuccessTransactionCreation(type, autoApproved) {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success"),
        detail: `${this.localize(type, "operations")} ${this.localize("created")}`,
        life: 3000,
      });
      if (autoApproved) {
        this.$toast.add({
          severity: "success",
          summary: this.localize("success"),
          detail: `${this.localize(type, "operations")} ${this.localize("autoApproved")}`,
          life: 3000,
        });
      }
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
        const data = res.getData();
        this.showSuccessTransactionCreation(
          "Arrival",
          data.status == TransactionStatus.PROCESSED,
        );
      } else {
        res.toastIfError(this.$toast, this.$nextTick);
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
        const data = res.getData();
        this.showSuccessTransactionCreation(
          "Sale",
          data.status == TransactionStatus.PROCESSED,
        );
        this.newSale = false;
      } else {
        const error = res.getError();
        if (error.httpStatusCode == 400 && error.data?.includes("enough")) {
          this.$toast.add({
            severity: "error",
            summary: this.localize("failed"),
            detail: this.localize("notEnoughProducts"),
            life: 3000,
          });
        }
        res.toastIfError(this.$toast, this.$nextTick);
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
        const data = res.getData();
        this.showSuccessTransactionCreation(
          "Request",
          data.status == TransactionStatus.OPEN,
        );
        this.newRequest = false;
      } else {
        res.toastIfError(this.$toast, this.$nextTick);
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
        this.$toast.add({
          severity: "success",
          summary: this.localize("success"),
          detail: this.localize("storehouseIsRemoved"),
          life: 3000,
        });
        this.router.push({ name: "storehouses" });
      } else {
        const error = removed.getError();
        if (error.httpStatusCode == 404) {
          this.$toast.add({
            severity: "error",
            summary: this.localize("failed"),
            detail: this.localize("storehouseNotFound"),
            life: 3000,
          });
          return;
        }
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
    startEditing() {
      this.editing = true;
      this.originalStorehouseName = this.storehouseName;
      this.newStorehouseName = this.storehouseName;
      this.originalStorehouseAdress = this.storehouseAddress;
      this.newStorehouseAdress = this.storehouseAddress;
      this.clearValidationErrors();
    },
    async saveChanges() {
      this.clearValidationErrors();
      const data = new StockUpdateDto(
        ValidatorUtil.getNullIfNoChange(
          this.newStorehouseName,
          this.storehouseName,
        ),
        ValidatorUtil.getNullIfNoChange(
          this.newStorehouseAdress,
          this.storehouseAddress,
        ),
      );

      const validateRes = this.validator.validate(data);
      if (validateRes !== true) {
        loggerUtil.debug(validateRes);
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      this.editing = false;
      const result = await this.storehouseStore.updateStorehouse(this.id, data);
      if (result && result.success) {
        this.showSuccessToast();
        this.editing = !result.success;
      } else {
        result.toastIfError(this.$toast, this.$nextTick);
      }
    },
    cancelEditing() {
      this.clearValidationErrors();
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
