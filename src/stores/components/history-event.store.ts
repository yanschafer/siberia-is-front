import { defineStore } from "pinia";
import HistoryOutputDto from "@/api/modules/history/dto/history-output.dto";
import RollbackModel from "@/api/modules/history/models/rollback.model";
import {
  beforeAfterTypes,
  EventObjectTypes,
  EventType,
  rulesChangingTypes,
  tableTypes,
} from "@/api/conf/app.conf";
import { useProductsStore } from "@/stores/products.store";
import LoggerUtil from "@/utils/logger/logger.util";
import RoleModel from "@/api/modules/rbac/models/role.model";
import { useRolesStore } from "@/stores/roles.store";

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
    rulesComponent: {
      roles: [],
    },
    hideTable: false,
    hideRules: false,
    hideBeforeAfter: false,
  }),
  getters: {
    tableRows: (state) => {
      return state.table.rows;
    },
    link: (state) => {
      if (state.selectedEvent.eventTypeId == EventType.REMOVE) return null;

      LoggerUtil.debug(state.selectedEvent);

      switch (state.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.USER:
          return {
            name: "User",
            params: { id: state.selectedEvent.eventObjectId },
          };
        case EventObjectTypes.USER_RIGHTS:
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
        case EventObjectTypes.PRODUCT_GROUP:
          return {
            name: "Group details",
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
    canBeReset: (state) => {
      return state.selectedEvent.canBeReset;
    },
    loadBeforeAfter: (state) =>
      state.canBeReset &&
      beforeAfterTypes.includes(state.selectedEvent.eventObjectTypeId),
    showBeforeAfter: (state) => !state.hideBeforeAfter && state.loadBeforeAfter,

    loadTable: (state) =>
      state.canBeReset &&
      tableTypes.includes(state.selectedEvent.eventObjectTypeId),
    showTable: (state) => state.loadTable && !state.hideTable,

    loadRules: (state) =>
      state.canBeReset &&
      rulesChangingTypes.includes(state.selectedEvent.eventObjectTypeId),
    showRules: (state) => state.loadRules && !state.hideRules,
  },
  actions: {
    async init(historyEvent: HistoryOutputDto) {
      LoggerUtil.debug("Load new", historyEvent);
      this.isSelected = true;
      this.selectedEvent = historyEvent;
      this.eventObjectName = this.selectedEvent.eventObjectName;
      if (!historyEvent.canBeReset) return;
      this.selectedEvent.init();
      this.hideTable = true;
      this.hideRules = true;
      this.hideBeforeAfter = true;
      if (this.loadBeforeAfter) await this.initBeforeAfter();

      if (this.loadTable) await this.initTable();

      if (this.loadRules) await this.initRules();
    },

    async initBeforeAfter() {
      if (
        !this.selectedEvent.canBeReset ||
        this.selectedEvent.eventTypeId == EventType.CREATE
      )
        return;

      let beforeAfterResolver;
      if (this.selectedEvent.eventTypeId == EventType.UPDATE)
        beforeAfterResolver = "getBeforeAfterObject";
      else if (
        this.selectedEvent.canBeReset &&
        this.selectedEvent.eventTypeId == EventType.REMOVE
      ) {
        beforeAfterResolver = "getBeforeObject";
      }

      if (
        this.selectedEvent.eventTypeId == EventType.UPDATE &&
        this.selectedEvent.eventObjectTypeId ==
          EventObjectTypes.MASSIVE_PRODUCT_UPDATE
      ) {
        beforeAfterResolver = "getAfterObject";
      }

      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.MASSIVE_PRODUCT_UPDATE:
          this.beforeAfterObject = await this.selectedEvent[
            beforeAfterResolver
          ]((data) => data.massiveUpdateDto);
          break;
        case EventObjectTypes.ROLE:
          if (this.selectedEvent.rollbackRoute == "rbac/roles/rules") {
            this.hideBeforeAfter = true;
          } else {
            this.hideBeforeAfter = false;
            this.beforeAfterObject =
              await this.selectedEvent[beforeAfterResolver]();
          }
          break;
        default:
          this.beforeAfterObject =
            await this.selectedEvent[beforeAfterResolver]();
      }

      LoggerUtil.debug(this.selectedEvent, this.beforeAfterObject);
    },

    async initTable() {
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.PRODUCT_BULK_CREATE:
          this.table.rows = this.selectedEvent.rollbackDto.productsList;
          this.table.columns = useProductsStore().productColumns;
          this.table.searchTerm = "";
          break;
        case EventObjectTypes.MASSIVE_PRODUCT_UPDATE:
          this.table.rows = this.selectedEvent.rollbackDto.productsData.map(
            (el) => el.second,
          );
          this.table.columns = useProductsStore().productColumns;
          this.table.searchTerm = "";
          break;
        case EventObjectTypes.USER_RIGHTS:
          if (this.selectedEvent.rollbackRoute == "user/rules") {
            this.hideTable = true;
            return;
          } else {
            const roleModel = new RoleModel();
            this.table.rows = await Promise.all(
              this.selectedEvent.rollbackDto.roles
                .map(async (roleId) => {
                  const role = await roleModel.getOne(roleId);
                  if (role.success) return role.getData();
                  else return null;
                })
                .filter((el) => el),
            );
            this.table.columns = useRolesStore().rolesColumns;
            this.table.searchTerm = "";
            this.hideTable = false;
          }
          break;
      }
    },

    async initRules() {
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.USER_RIGHTS:
          if (this.selectedEvent.rollbackRoute == "user/roles") {
            this.hideRules = true;
            return;
          } else {
            this.hideRules = false;
            this.rulesComponent.roles = [
              {
                id: 0,
                name: "Updated Rules",
                relatedUsersCount: 1,
                description: "Updated rules",
                rules: this.selectedEvent.rollbackDto.rules.map((el) => {
                  if (el.stockId) {
                    return {
                      needStock: true,
                      ...el,
                    };
                  } else {
                    return el;
                  }
                }),
                canChange: false,
              },
            ];
          }
          break;
        case EventObjectTypes.ROLE:
          if (this.selectedEvent.rollbackRoute != "rbac/roles/rules") {
            this.hideRules = true;
          } else {
            this.hideRules = false;
            this.rulesComponent.roles = [
              {
                id: 1,
                name: "Updated Rules",
                relatedUsersCount: 1,
                description: "Updated rules",
                rules: this.selectedEvent.rollbackDto.rules.map((el) => {
                  if (el.stockId) {
                    return {
                      needStock: true,
                      ...el,
                    };
                  } else {
                    return el;
                  }
                }),
                canChange: false,
              },
            ];
          }
      }
    },
  },
});
