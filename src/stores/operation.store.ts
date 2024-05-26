import { defineStore } from "pinia";
import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import { TransactionStatus, TransactionType } from "@/api/conf/app.conf";
import IncomeTransactionModel from "@/api/modules/transaction/models/income-transaction.model";
import OutcomeTransactionModel from "@/api/modules/transaction/models/outcome-transaction.model";
import TransferTransactionModel from "@/api/modules/transaction/models/transfer-transaction.model";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import TransactionSearchFilterDto from "@/api/modules/transaction/dto/transaction-search-filter.dto";
import PrintUtil from "@/utils/localization/print.util";
import WriteOffTransactionModel from "@/api/modules/transaction/models/write-off-transaction.model";
import TransactionDto from "@/api/modules/transaction/dto/transaction.dto";

const localize = (key, module = "operations") =>
  PrintUtil.localize(key, module);

export const useOperationStore = defineStore({
  id: "operations",
  state: () => ({
    searchTerm: "",
    operationRows: [],
    operationColumns: [
      { field: "operation", header: localize("operationsCapslock") },
      { field: "from", header: localize("fromCapslock") },
      { field: "to", header: localize("toCapslock") },
      { field: "status", header: localize("statusCapslock") },
    ],
    selectedOperation: {},
    selectedOperationInitialProductsData: [],
    statusesList: [],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getOperationList: (state) => state.operationRows,
    getSelectedOperation: (state) => state.selectedOperation,
    getAvailableStatuses: (state) => {
      if (state.selectedOperation.availableStatuses)
        return state.selectedOperation.availableStatuses.map((el) => ({
          ...el,
          name: localize(el.name),
        }));
      else return [];
    },
    getStatusList: (state) => state.statusesList,
    getProductsDataMapped: (state) => {
      const data = {};
      state.selectedOperation.products.forEach((el) => {
        if (data[el.product.id]) data[el.product.id] += el.actualAmount;
        else data[el.product.id] = el.actualAmount;
      });

      return data;
    },
  },
  actions: {
    async loadOperationList(
      searchFilterDto: TransactionSearchFilterDto = new TransactionSearchFilterDto(),
    ) {
      const transactionModel = new TransactionModel();
      const list = await transactionModel.getAvailableFiltered(searchFilterDto);
      if (list.success) {
        this.operationRows = list.getData();
      }
      return list;
    },

    async loadSelectedOperation(operationId: number) {
      const transactionModel = new TransactionModel();
      const selected = await transactionModel.getOne(operationId);
      if (selected.success) {
        this.selectedOperation = selected.getData();
        this.selectedOperationInitialProductsData = this.getProductsDataMapped;
      }
      return selected;
    },

    catchTransactionSocketUpdate(
      transactionId: number,
      transactionDto: TransactionDto,
    ) {
      if (!this.selectedOperation || transactionId != this.selectedOperation.id)
        return;

      if (this.selectedOperation.id == transactionId) {
        this.selectedOperation = {
          ...transactionDto,
        };
        this.selectedOperationInitialProductsData = this.getProductsDataMapped;
      }
    },

    async updateActualAmount(productId, amount) {
      this.selectedOperation.products = this.selectedOperation.products.map(
        (el) => {
          if (el.product.id == productId) {
            const baseValue =
              this.selectedOperationInitialProductsData[el.product.id];
            if (amount == "" || amount == null || amount < baseValue)
              el.actualAmount = baseValue;
            else el.actualAmount = amount;
          }
          return el;
        },
      );
    },

    async partiallyReceived(): Promise<ApiResponseDto<any> | null> {
      const incomeTransactionModel = new IncomeTransactionModel();

      const modifiedProductDataMapped = this.getProductsDataMapped;
      const ids = Object.keys(this.selectedOperationInitialProductsData);
      let foundNegativeDiff = false;
      const productsDiff = ids.map((productId) => {
        const el = {
          productId: productId,
          amount:
            modifiedProductDataMapped[productId] -
            this.selectedOperationInitialProductsData[productId],
        };
        if (el.amount < 0) {
          foundNegativeDiff = true;
        }
        return el;
      });

      if (foundNegativeDiff) return null;

      return await incomeTransactionModel.partiallyReceive(
        this.selectedOperation.id,
        productsDiff,
      );
    },

    async changeStatus(
      operationId: number,
      statusId: number,
      stockId: number = 0,
    ) {
      let transactionModel: any;
      let result: ApiResponseDto<TransactionSimpleDto> | null = null;
      switch (this.selectedOperation.type.id) {
        case TransactionType.INCOME:
          transactionModel = new IncomeTransactionModel();
          if (statusId == TransactionStatus.PROCESSED) {
            result = await transactionModel.approve(operationId);
          }
          if (statusId == TransactionStatus.CREATION_CANCELLED) {
            result = await transactionModel.cancel(operationId);
          }
          break;
        case TransactionType.OUTCOME:
          transactionModel = new OutcomeTransactionModel();
          if (statusId == TransactionStatus.PROCESSED) {
            result = await transactionModel.approve(operationId);
          }
          if (statusId == TransactionStatus.CREATION_CANCELLED) {
            result = await transactionModel.cancel(operationId);
          }
          break;
        case TransactionType.TRANSFER:
          transactionModel = new TransferTransactionModel();
          if (statusId == TransactionStatus.IN_PROGRESS) {
            result = await transactionModel.startProcessing(
              operationId,
              stockId,
            );
          } else {
            result = await transactionModel.changeStatus(operationId, statusId);
          }
          break;
        case TransactionType.WriteOff:
          transactionModel = new WriteOffTransactionModel();
          if (statusId == TransactionStatus.PROCESSED) {
            result = await transactionModel.approve(operationId);
          }
          if (statusId == TransactionStatus.CREATION_CANCELLED) {
            result = await transactionModel.cancel(operationId);
          }
          break;
      }
      if (result != null && result.success)
        await this.loadSelectedOperation(operationId);

      return result;
    },

    async loadStatusesList() {
      const transactionModel = new TransactionModel();
      const selected = await transactionModel.getAllStatuses();
      if (selected.success) this.statusesList = selected.getData();
      return selected;
    },
  },
});
