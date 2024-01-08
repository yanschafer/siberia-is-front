import {defineStore} from "pinia";
import HistoryModel from "@/api/modules/history/models/history.model";

export const useHistoryStore = defineStore({
  id: 'history',
  state: () => ({
    searchTerm: '',
    historyRows: [],
    selectedItem: {},
    historyColumns: [
      { field: 'eventObjectType', header: 'TARGET' },
      { field: 'eventObjectName', header: 'TARGET NAME' },
      { field: 'eventType', header: 'TYPE' },
      { field: 'author', header: 'AUTHOR' },
      { field: 'timestamp', header: 'DATE | TIME' }
    ],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getHistoryList: (state) => state.historyRows,
    getSelectedHistory: (state) => state.selectedItem
  },

  actions: {
    async loadHistoryList() {
      const historyModel = new HistoryModel()
      const getHistory = await historyModel.getAll()
      if (getHistory.success) {
        this.historyRows = getHistory.getData()
      }
    },

    async loadItem(itemId: number) {
      this.selectedItem = this.historyRows.filter(el => el.id == itemId)
      if (this.selectedItem.length > 0)
        this.selectedItem = this.selectedItem[0]
      else
        this.selectedItem = {}
    }
  },
});
