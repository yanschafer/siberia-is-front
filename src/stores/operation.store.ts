import { defineStore } from "pinia";
import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import { TransactionStatus, TransactionType } from "@/api/conf/app.conf";
import IncomeTransactionModel from "@/api/modules/transaction/models/income-transaction.model";
import OutcomeTransactionModel from "@/api/modules/transaction/models/outcome-transaction.model";
import TransferTransactionModel from "@/api/modules/transaction/models/transfer-transaction.model";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import TransactionSearchFilterDto from "@/api/modules/transaction/dto/transaction-search-filter.dto";

export const useOperationStore = defineStore({
  id: "operations",
  state: () => ({
    searchTerm: "",
    operationRows: [],
    operationColumns: [
      { field: "operation", header: "OPERATION" },
      { field: "from", header: "FROM" },
      { field: "to", header: "TO" },
      { field: "status", header: "STATUS" },
    ],
    selectedOperation: {},
    statusesList: [],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getOperationList: (state) => state.operationRows,
    getSelectedOperation: (state) => state.selectedOperation,
    getStatusList: (state) => state.statusesList,
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
      }
      return selected;
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
      }
      if (result != null && result.success)
        await this.loadSelectedOperation(operationId);

      return result;
    },

    async loadStatusesList() {
      const transactionModel = new TransactionModel();
      const selected = await transactionModel.getAllStatuses();
      if (selected.success) this.statusesList = selected.getData();
    },
  },
});
