import { defineStore } from "pinia";
import HistoryModel from "@/api/modules/history/models/history.model";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";
import PrintUtil from "@/utils/localization/print.util";

export const useHistoryStore = defineStore({
  id: "history",
  state: () => ({
    searchTerm: "",
    historyRows: [],
    selectedItem: {},
    historyColumns: [
      {
        field: "eventObjectType",
        header: PrintUtil.localize("targetCapslock", "history"),
      },
      {
        field: "eventObjectName",
        header: PrintUtil.localize("targetNameCapslock", "history"),
      },
      {
        field: "eventType",
        header: PrintUtil.localize("typeCapslock", "history"),
      },
      {
        field: "author",
        header: PrintUtil.localize("authorCapslock", "history"),
      },
      {
        field: "timestamp",
        header: PrintUtil.localize("dateCapslock", "history"),
      },
    ],
    eventTypes: [],
    eventObjectTypes: [],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getHistoryList: (state) => state.historyRows,
    getSelectedHistory: (state) => state.selectedItem,
    getEventTypes: (state) =>
      state.eventTypes.map((el) => ({
        ...el,
        name: PrintUtil.localize(el.name, "history"),
      })),
    getEventObjectTypes: (state) =>
      state.eventObjectTypes.map((el) => ({
        ...el,
        name: PrintUtil.localize(el.name, "history"),
      })),
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
      return getHistory;
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
      return selected;
    },
    async loadEventObjectTypes() {
      const historyModel = new HistoryModel();
      const selected = await historyModel.getAllObjectTypes();
      if (selected.success) this.eventObjectTypes = selected.getData();
      return selected;
    },
  },
});
