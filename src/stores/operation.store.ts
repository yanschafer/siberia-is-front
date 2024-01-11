import {defineStore} from "pinia";
import TransactionModel from "@/api/modules/transaction/models/transaction.model";

export const useOperationStore = defineStore({
  id: 'operations',
  state: () => ({
    searchTerm: '',
    operationRows: [],
    operationColumns: [
      { field: 'operation', header: 'OPERATION' },
      { field: 'from', header: 'FROM' },
      { field: 'to', header: 'TO' },
      { field: 'status', header: 'STATUS' },
    ],
    selectedOperation: {}
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getOperationList: (state) => state.operationRows,
    getSelectedOperation: (state) => state.selectedOperation
  },
  actions: {
    async loadOperationList() {
      const transactionModel = new TransactionModel()
      const list = await transactionModel.getAvailableFiltered()
      if (list.success) {
        this.operationRows = list.getData()
      }
    }
  },
});