import { defineStore } from "pinia";
import HistoryOutputDto from "@/api/modules/history/dto/history-output.dto";
import RollbackModel from "@/api/modules/history/models/rollback.model";
import {
  beforeAfterTypes,
  EventObjectTypes,
  EventType,
  tableTypes,
} from "@/api/conf/app.conf";
import { useProductsStore } from "@/stores/products.store";

export const useHistoryEventStore = defineStore({
  id: "history-event-store",
  state: () => ({
    isSelected: false,
    selectedEvent: new HistoryOutputDto(),
    eventObjectName: "",
    beforeAfterObject: {},
    table: {
      searchTerm: "",
      rows: [],
      columns: [],
    },
  }),
  getters: {
    tableRows: (state) => {
      return state.table.rows;
    },
    link: (state) => {
      if (state.selectedEvent.eventTypeId == EventType.REMOVE) return null;
      switch (state.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.USER:
          return {
            name: "User",
            params: { id: state.selectedEvent.eventObjectId },
          };
        case EventObjectTypes.STOCK:
          return {
            name: "Storehouse",
            params: { id: state.selectedEvent.eventObjectId },
          };
        case EventObjectTypes.ROLE:
          return {
            name: "Role",
            params: { id: state.selectedEvent.eventObjectId },
          };
        case EventObjectTypes.PRODUCT:
          return {
            name: "Product details",
            params: { id: state.selectedEvent.eventObjectId },
          };
        case EventObjectTypes.TRANSACTION:
          return {
            name: "Single operation",
            params: { id: state.selectedEvent.eventObjectId },
          };
        default:
          return null;
      }
    },
    showBeforeAfter: (state) =>
      beforeAfterTypes.includes(state.selectedEvent.eventObjectTypeId),
    showTable: (state) =>
      tableTypes.includes(state.selectedEvent.eventObjectTypeId),
  },
  actions: {
    async init(historyEvent: HistoryOutputDto) {
      this.isSelected = true;
      this.selectedEvent = historyEvent;
      this.selectedEvent.init();
      this.eventObjectName = this.selectedEvent.eventObjectName;
      if (this.showBeforeAfter) await this.initBeforeAfter();

      if (this.showTable) await this.initTable();
    },

    async initBeforeAfter() {
      if (
        this.selectedEvent.canBeReset &&
        this.selectedEvent.eventTypeId == EventType.UPDATE
      )
        this.beforeAfterObject =
          await this.selectedEvent.getBeforeAfterObject();
      else if (
        this.selectedEvent.canBeReset &&
        this.selectedEvent.eventTypeId == EventType.REMOVE
      ) {
        this.beforeAfterObject = await this.selectedEvent.getBeforeObject();
      }
    },

    async initTable() {
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.PRODUCT_BULK_CREATE:
          this.table.rows = this.selectedEvent.rollbackDto.productsList;
          this.table.columns = useProductsStore().productColumns;
          this.table.searchTerm = "";
          break;
      }
    },

    async rollbackCurrent() {
      if (!this.selectedEvent.canBeReset) return null;
      const rollbackModel = new RollbackModel();
      return await rollbackModel.rollback(this.selectedEvent);
    },
  },
});
