import { defineStore } from "pinia";
import HistoryModel from "@/api/modules/history/models/history.model";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";
import loggerUtil from "@/utils/logger/logger.util";

export const useHistoryStore = defineStore({
  id: "history",
  state: () => ({
    searchTerm: "",
    historyRows: [],
    selectedItem: {},
    historyColumns: [
      { field: "eventObjectType", header: "TARGET" },
      { field: "eventObjectName", header: "TARGET NAME" },
      { field: "eventType", header: "TYPE" },
      { field: "author", header: "AUTHOR" },
      { field: "timestamp", header: "DATE | TIME" },
    ],
    eventTypes: [],
    eventObjectTypes: [],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getHistoryList: (state) => state.historyRows,
    getSelectedHistory: (state) => state.selectedItem,
    getEventTypes: (state) => state.eventTypes,
    getEventObjectTypes: (state) => state.eventObjectTypes,
  },

  actions: {
    async loadHistoryList(
      searchFilterDto: HistorySearchFilterDto = new HistorySearchFilterDto(),
    ) {
      const historyModel = new HistoryModel();
      const getHistory = await historyModel.getAll(searchFilterDto);
      if (getHistory.success) {
        this.historyRows = getHistory.getData();
      }
    },
    async loadItem(itemId: number) {
      this.selectedItem = this.historyRows.filter((el) => el.id == itemId);
      if (this.selectedItem.length > 0)
        this.selectedItem = this.selectedItem[0];
      else this.selectedItem = {};
    },
    async loadEventTypes() {
      const historyModel = new HistoryModel();
      const selected = await historyModel.getAllTypes();
      if (selected.success) this.eventTypes = selected.getData();
    },
    async loadEventObjectTypes() {
      const historyModel = new HistoryModel();
      const selected = await historyModel.getAllObjectTypes();
      if (selected.success) this.eventObjectTypes = selected.getData();
    },
  },
});
