<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex flex-row justify-content-between main-row">
      <MDBCol class="col-auto">
        <MDBRow class="d-flex">
          <div class="d-flex flex-row">
            <h1 class="username-heading">
              {{ operation }}
              <template v-if="from !== ''"
                >{{ localize("from") }} "{{ from }}"</template
              >
              <template v-if="to !== ''">
                {{ localize("to") }} "{{ to }}"</template
              >
            </h1>
          </div>
        </MDBRow>
        <MDBRow class="d-flex flex-nowrap mt-2">
          <MDBCol class="col-auto col-status">
            <span class="user-roles-heading"
              >{{ localize("statusCapslock") }}:
            </span>
            <span class="username">{{ status }}</span>
          </MDBCol>
          <template v-if="haveAvailableStatuses">
            <MDBCol class="col-auto">
              <MDBBtn
                class="btn-outline-black outlined utility-btn"
                @click="toggleStatusChange"
              >
                {{ changeStatusTitle }}
              </MDBBtn>
            </MDBCol>
            <template v-if="isStatusOnSelect">
              <MDBCol class="col-auto">
                <span class="user-roles-heading">{{
                  localize("statusCapslock")
                }}</span>
                <SelectComponent
                  v-model="selectedStatus"
                  @change="handleStatusChange"
                  :placeholder="statusPlaceholder"
                  :filter="false"
                  :items="availableStatuses"
                />
              </MDBCol>
              <MDBCol class="col-auto" v-if="selectedStatusNeedStock">
                <span class="user-roles-heading">{{
                  localize("storehouseCapslock")
                }}</span>
                <SelectComponent
                  v-model="selectedStorehouse"
                  @click="handleStorehouseChange"
                  :placeholder="storehousesPlaceholder"
                  :filter="true"
                  :items="storehousesList"
                />
              </MDBCol>
              <MDBBtn
                class="btn-outline-black outlined utility-btn"
                @click="saveStatus"
              >
                {{ localize("save") }}
              </MDBBtn>
            </template>
          </template>
        </MDBRow>
      </MDBCol>
      <div v-if="showTransactionQr" class="w-auto">
        <img class="qr" :src="transactionQrUrl" />
      </div>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">
        {{ localize("productsIn") }} {{ operation }}
      </h1>
    </MDBRow>
    <SearchComponent />
    <TableComponent
      :rows="products"
      :columns="productColumns"
      :search-term="searchTerm"
    />
  </MDBContainer>
</template>
<script lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { useOperationStore } from "@/stores/operation.store";
import { useRoute, useRouter } from "vue-router";
import {
  appConf,
  TransactionStatus,
  TransactionType,
} from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import { useStorehousesStore } from "@/stores/storehouse.store";
import loggerUtil from "@/utils/logger/logger.util";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import PrintUtil from "@/utils/localization/print.util";
import TokenUtil from "@/utils/token.util";
import AuthModel from "@/api/modules/auth/models/auth.model";
import { useTransactionSocketHandler } from "@/stores/transaction-socket-handler.store";
import { useAuthCheckStore } from "@/stores/auth-check.store";

export default {
  name: "SingleOperationView",
  components: {
    SelectComponent,
    SearchComponent,
    TableComponent,
    MDBRow,
    MDBContainer,
    MDBCol,
    MDBBtn,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    typeMapper: {
      [TransactionType.INCOME]: "Arrival",
      [TransactionType.OUTCOME]: "Sale",
      [TransactionType.TRANSFER]: "Request",
      [TransactionType.WriteOff]: "Write-off",
    },
    productColumns: [
      {
        field: "name",
        header: PrintUtil.localize("nameCapslock", "operations"),
      },
      {
        field: "vendorCode",
        header: PrintUtil.localize("skuCapslock", "operations"),
      },
      {
        field: "amount",
        header: PrintUtil.localize("quantityCapslock", "operations"),
      },
    ],
    searchTerm: "",
    storehousesPlaceholder: PrintUtil.localize(
      "selectStorehousePlaceholder",
      "operations",
    ),
    selectedStatus: null,
    selectedStorehouse: null,
    isStatusOnSelect: false,
    transactionQrUrl: "",
  }),
  async setup() {
    const operationStore = useOperationStore();
    const storehousesStore = useStorehousesStore();
    const transactionSocketHandler = useTransactionSocketHandler();
    const authCheckStore = useAuthCheckStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      storehousesStore.loadStorehouseList(),
      operationStore.loadSelectedOperation(
        parseInt(route.params.id.toString()),
      ),
    ]);

    return {
      transactionId: parseInt(route.params.id.toString()),
      operationStore,
      storehousesStore,
      authCheckStore,
      transactionSocketHandler,
      loaders,
      router,
    };
  },
  async created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    const authModel = new AuthModel();
    this.transactionQrUrl = await authModel.getTransactionQr(
      this.transactionId,
    );

    if (
      this.selectedOperation.type.id != TransactionType.TRANSFER &&
      this.selectedOperation.type.id != TransactionType.WriteOff
    )
      this.productColumns.push({
        field: "price",
        header: this.localize("priceCapslock"),
      });

    this.transactionSocketHandler.$onAction((action) => {
      if (action.name == "updateTransaction") {
        this.operationStore.catchTransactionSocketUpdate(
          action.args[0],
          action.args[1],
        );
      }
    });

    this.authCheckStore.$onAction(async (action) => {
      if (action.name == "refresh") {
        const loaded = await this.operationStore.loadSelectedOperation(
          this.selectedOperation.id,
        );
        if (!loaded.success) this.router.push({ name: "Operations" });
      }
    });
  },
  methods: {
    localize(key, module = "operations") {
      return PrintUtil.localize(key, module);
    },
    async changeToStatus(statusId: number) {
      return await this.operationStore.changeStatus(this.id, statusId);
    },
    async changeToStatusWithStock(statusId: number, stockId: number) {
      return await this.operationStore.changeStatus(this.id, statusId, stockId);
    },
    toggleStatusChange() {
      this.isStatusOnSelect = !this.isStatusOnSelect;
    },
    handleStatusChange() {
      loggerUtil.debug(this.selectedStatus);
    },
    handleStorehouseChange() {},
    async saveStatus() {
      if (this.selectedStatusNeedStock && !this.selectedStorehouse) {
        this.$toast.add({
          severity: "error",
          summary: this.localize("updateStatusError"),
          detail: this.localize("storehouseIsRequired"),
          life: 3000,
        });
        return;
      }

      if (
        this.selectedStatusNeedStock &&
        this.selectedStorehouse &&
        this.selectedStorehouse.id == this.selectedOperation.to.id
      ) {
        this.$toast.add({
          severity: "error",
          summary: this.localize("updateStatusError"),
          detail: this.localize("selectDifferentStorehouse"),
          life: 3000,
        });
        return;
      }

      LoggerUtil.debug(
        this.selectedStatus,
        !this.selectedStatusNeedStock,
        this.selectedStorehouse,
        this.selectedOperation,
      );

      if (this.selectedStatus) {
        let changed: ApiResponseDto<TransactionSimpleDto> | null = null;
        if (!this.selectedStatusNeedStock) {
          changed = await this.changeToStatus(this.selectedStatus.id);
        } else if (this.selectedStorehouse)
          changed = await this.changeToStatusWithStock(
            this.selectedStatus.id,
            this.selectedStorehouse.id,
          );

        if (changed == null) {
          this.$toast.add({
            severity: "error",
            summary: this.localize("updateStatusError"),
            detail: this.localize("storehouseAndStatusRequiredError"),
            life: 3000,
          });
          return;
        }

        if (changed.success) {
          this.selectedStatus = null;
          this.selectedStorehouse = null;
          this.$toast.add({
            severity: "success",
            summary: this.localize("success"),
            detail: this.localize("statusUpdated"),
            life: 3000,
          });
          const loadRes = await this.operationStore.loadOperationList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.toggleStatusChange();
        } else {
          if (
            changed.getError().httpStatusCode == 400 &&
            changed.getError().data?.includes("enough")
          ) {
            this.$toast.add({
              severity: "error",
              summary: this.localize("updateStatusError"),
              detail: this.localize("notEnoughProductsInStore"),
              life: 3000,
            });
            return;
          }
          changed.getError().showServerErrorToast(this.$toast, this.$nextTick);
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: this.localize("updateStatusError"),
          detail: this.localize("statusRequired"),
          life: 3000,
        });
      }
    },
  },
  computed: {
    changeStatusTitle() {
      return this.isStatusOnSelect
        ? this.localize("Cancel")
        : this.localize("Change status");
    },
    selectedStatusNeedStock() {
      if (!this.selectedStatus) return false;
      return this.selectedStatus.id == appConf.transferInProgressStatus;
    },
    statusPlaceholder() {
      return this.status;
    },
    storehousesList() {
      return this.storehousesStore.getStorehouseList.filter((el) =>
        TokenUtil.hasInProgressAccessToStock(el.id),
      );
    },
    selectedOperation() {
      return this.operationStore.getSelectedOperation;
    },
    availableStatuses() {
      return this.operationStore.getAvailableStatuses;
    },
    haveAvailableStatuses() {
      return this.selectedOperation.availableStatuses;
    },
    operation() {
      if (this.selectedOperation.type)
        return this.localize(this.typeMapper[this.selectedOperation.type.id]);
      else return "";
    },
    from() {
      return this.selectedOperation.from?.name || "";
    },
    to() {
      return this.selectedOperation.to?.name || "";
    },
    status() {
      if (this.selectedOperation.status)
        return this.localize(this.selectedOperation.status.name);
      else return "";
    },
    products() {
      return this.selectedOperation.products.map((el) => ({
        id: el.product.id,
        name: el.product.name,
        amount: el.amount,
        vendorCode: el.product.vendorCode,
        price: el.price,
      }));
    },
    showTransactionQr() {
      let urlExist = this.transactionQrUrl && this.transactionQrUrl != "";

      return urlExist;
    },
  },
};
</script>
<style scoped>
.username-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
  text-align: left;
}
.user-roles-heading {
  width: fit-content;
}
.username {
  color: #121212;
  font-weight: 600;
}
.single-user-info {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800 !important;
}
:deep(.nav-link) {
  font-weight: 600 !important;
}
.qr {
  width: 10rem;
  height: 10rem;
}
.col-status {
  align-items: center;
  justify-content: center;
  display: flex;
}
.main-row {
  width: 85vw;
}
</style>
