import { defineStore } from "pinia";
import HistoryOutputDto from "@/api/modules/history/dto/history-output.dto";
import {
  appConf,
  beforeAfterTypes,
  EventObjectTypes,
  EventType,
  rulesChangingTypes,
  tableTypes,
  treeTableTypes,
} from "@/api/conf/app.conf";
import { useProductsStore } from "@/stores/products.store";
import LoggerUtil from "@/utils/logger/logger.util";
import RoleModel from "@/api/modules/rbac/models/role.model";
import { useRolesStore } from "@/stores/roles.store";
import PrintUtil from "@/utils/localization/print.util";
import { useCategoriesStore } from "@/stores/categories.store";
import ProductModel from "@/api/modules/product/models/product.model";
import { useStorehousesStore } from "@/stores/storehouse.store";

export const useHistoryEventStore = defineStore({
  id: "history-event-store",
  state: () => ({
    isSelected: false,
    selectedEvent: new HistoryOutputDto(),
    eventObjectName: "",
    beforeAfterObject: {},
    table: {
      title: "",
      searchTerm: "",
      rows: [],
      columns: [],
    },
    rulesComponent: {
      roles: [],
    },
    treeTable: {
      title: "",
      value: [],
    },
    hideTable: false,
    hideRules: false,
    hideBeforeAfter: false,
    hideTreeTable: false,
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

    loadTreeTable: (state) =>
      state.canBeReset &&
      treeTableTypes.includes(state.selectedEvent.eventObjectTypeId),
    showTreeTable: (state) => state.loadTreeTable && !state.hideTreeTable,
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

      if (this.loadTreeTable) await this.initTreeTable();
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
          this.hideBeforeAfter = false;
          this.beforeAfterObject = await this.selectedEvent[
            beforeAfterResolver
          ]((data) => data.massiveUpdateDto);
          break;
        case EventObjectTypes.ROLE:
          if (this.selectedEvent.rollbackRoute == "rbac/roles/rules") {
            this.hideBeforeAfter = true;
          } else {
            this.hideBeforeAfter = false;
            if (this.selectedEvent.eventTypeId == EventType.REMOVE) {
              this.beforeAfterObject = await this.selectedEvent[
                beforeAfterResolver
              ]((data) => ({
                name: data.name,
                description: data.description,
                relatedUsersCount: data.relatedUsers.length,
              }));
            } else {
              this.beforeAfterObject =
                await this.selectedEvent[beforeAfterResolver]();
            }
          }
          break;
        case EventObjectTypes.USER:
          this.hideBeforeAfter = false;
          if (this.selectedEvent.eventTypeId == EventType.REMOVE) {
            this.beforeAfterObject = await this.selectedEvent[
              beforeAfterResolver
            ]((data) => ({
              name: data.name,
              login: data.login,
            }));
          } else {
            this.beforeAfterObject =
              await this.selectedEvent[beforeAfterResolver]();
          }
          break;
        case EventObjectTypes.PRODUCT:
          this.hideBeforeAfter = false;
          if (this.selectedEvent.eventTypeId == EventType.REMOVE) {
            this.beforeAfterObject = await this.selectedEvent[
              beforeAfterResolver
            ]((data) => {
              const obj = {};
              Object.keys(data)
                .filter((el) =>
                  Object.keys(PrintUtil.getModule("beforeAfter")).includes(el),
                )
                .map((el) => {
                  LoggerUtil.debug(`${el} = ${data[el]}`);
                  obj[el] = data[el];
                });

              return obj;
            });
          } else {
            this.beforeAfterObject =
              await this.selectedEvent[beforeAfterResolver]();
          }
          break;
        case EventObjectTypes.CATEGORY:
          this.hideBeforeAfter = false;
          this.beforeAfterObject = await this.selectedEvent[
            beforeAfterResolver
          ]((data) => ({
            name: data.name,
            parent: data.parent,
          }));
          break;
        case EventObjectTypes.PRODUCT_GROUP:
          this.hideBeforeAfter = false;
          this.beforeAfterObject = await this.selectedEvent[
            beforeAfterResolver
          ]((data) => ({
            name: data.name,
          }));
          break;
        case EventObjectTypes.STOCK:
          this.hideBeforeAfter = false;
          this.beforeAfterObject = await this.selectedEvent[
            beforeAfterResolver
          ]((data) => ({
            name: data.name,
            address: data.address,
          }));
          break;
        default:
          this.hideBeforeAfter = false;
          this.beforeAfterObject =
            await this.selectedEvent[beforeAfterResolver]();
      }

      LoggerUtil.debug(this.selectedEvent, this.beforeAfterObject);
    },

    async initTable() {
      this.table.title = "";
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.PRODUCT_BULK_CREATE:
          this.table.rows = this.selectedEvent.rollbackDto.productsList;
          this.table.columns = useProductsStore().productColumns;
          this.table.searchTerm = "";
          this.hideTable = false;
          break;
        case EventObjectTypes.MASSIVE_PRODUCT_UPDATE:
          this.table.rows = this.selectedEvent.rollbackDto.productsData.map(
            (el) => el.second,
          );
          this.table.columns = useProductsStore().productColumns.filter(
            (el) => el.field != "price",
          );
          this.table.searchTerm = "";
          this.hideTable = false;
          break;
        case EventObjectTypes.PRODUCT_GROUP:
          const productModel = new ProductModel();
          const loaded = await productModel.getList({
            filters: {
              ids: this.selectedEvent.afterInstance.products,
            },
          });
          this.table.rows = loaded.success ? loaded.getData() : [];
          this.table.columns = useProductsStore().productColumns.filter(
            (el) => el.field != "price",
          );
          this.table.searchTerm = "";
          this.hideTable = false;
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
        case EventObjectTypes.STOCK:
          if (this.selectedEvent.eventTypeId == EventType.REMOVE) {
            this.table.rows = this.selectedEvent.rollbackDto.products;
            const productStore = useProductsStore();
            const columns = productStore.productColumns.filter(
              (el) => el.field != "price",
            );
            columns.push({
              header: PrintUtil.localize("quantity", "storehouses"),
              field: "quantity",
            });
            this.table.title = PrintUtil.localize(
              "productsInStock",
              "storehouses",
            );
            this.table.columns = columns;
            this.table.searchTerm = "";
            this.hideTable = false;
          }
      }
      LoggerUtil.debug("Init table", this.table);
    },

    async initRules() {
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.USER:
          if (this.selectedEvent.eventTypeId == EventType.REMOVE) {
            this.hideRules = false;
            this.rulesComponent.roles = [
              {
                id: 1,
                name: PrintUtil.localize("personalRules", "user"),
                relatedUsersCount: 1,
                description: PrintUtil.localize("personalRules", "user"),
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
          } else {
            this.hideRules = true;
          }
          break;
        case EventObjectTypes.USER_RIGHTS:
          if (this.selectedEvent.rollbackRoute == "user/roles") {
            this.hideRules = true;
            return;
          } else {
            this.hideRules = false;
            this.rulesComponent.roles = [
              {
                id: 0,
                name: PrintUtil.localize("updatedRules", "history"),
                relatedUsersCount: 1,
                description: PrintUtil.localize("updatedRules", "history"),
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
          if (
            this.selectedEvent.rollbackRoute != "rbac/roles/rules" &&
            this.selectedEvent.eventTypeId != EventType.REMOVE
          ) {
            this.hideRules = true;
          } else {
            this.hideRules = false;
            let title = PrintUtil.localize("updatedRules", "history");
            if (this.selectedEvent.eventTypeId == EventType.REMOVE)
              title = PrintUtil.localize("relatedRules", "history");
            this.rulesComponent.roles = [
              {
                id: 1,
                name: title,
                relatedUsersCount: 1,
                description: title,
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

    transformChildren(parent, children) {
      if (!children || children.length === 0) {
        return [];
      }

      return children.map((child, index) => {
        return {
          id: child.key,
          key: child.key,
          name: child.label || "",
          parent,
          label: child.label || "",
          data: {
            parent,
            label: child.label || "",
            data: child.label || "",
            icon: child.icon,
            isEditable: "",
          },
          children: this.transformChildren(child.key, child.children),
        };
      });
    },

    async initTreeTable() {
      switch (this.selectedEvent.eventObjectTypeId) {
        case EventObjectTypes.CATEGORY:
          if (!this.selectedEvent.rollbackDto.childrenRemoved)
            this.hideTreeTable = true;
          const categoriesStore = useCategoriesStore();
          this.treeTable.title = PrintUtil.localize(
            "categoryTableRemovedChildrenTitle",
            "history",
          );
          this.treeTable.value = categoriesStore
            .transformCategoriesData([this.selectedEvent.rollbackDto], 0)
            .map((category, index) => {
              return {
                id: category.key,
                key: category.key,
                label: category.label || "",
                data: {
                  id: category.key,
                  label: category.label || "",
                  isEditable: "",
                },
                children: this.transformChildren(
                  category.key,
                  category.children,
                ),
              };
            });
          break;
        default:
          this.hideTreeTable = true;
      }
    },
  },
});
