import { defineStore } from "pinia";
import PrintUtil from "@/utils/localization/print.util";
import { appConf } from "@/api/conf/app.conf";
import TokenUtil from "@/utils/token.util";
import LoggerUtil from "@/utils/logger/logger.util";

const availableSidebarItems = [
  {
    name: PrintUtil.localize("Dashboard", "sidebar"),
    icon: "IconDashboard",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: true,
    route: "dashboard",
    rule: true,
  },
  {
    name: PrintUtil.localize("Products", "sidebar"),
    icon: "IconPackages",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: true,
    route: "products",
    rule: [appConf.rules.productsManaging, appConf.rules.viewProductsList],
  },
  {
    name: PrintUtil.localize("Assortments", "sidebar"),
    icon: "IconDashboard",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: true,
    route: "assortment",
    rule: [
      appConf.rules.brandManaging,
      appConf.rules.collectionManaging,
      appConf.rules.categoryManaging,
    ],
  },
  {
    name: PrintUtil.localize("Storehouses", "sidebar"),
    icon: "IconBuildingWarehouse",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: false,
    route: "storehouses",
    rule: [appConf.rules.stockManaging, appConf.rules.viewStockData],
  },
  {
    name: PrintUtil.localize("Users", "sidebar"),
    icon: "IconUser",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: false,
    route: "users",
    rule: [appConf.rules.userManaging],
  },
  {
    name: PrintUtil.localize("Roles", "sidebar"),
    icon: "IconUsersGroup",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: false,
    route: "roles",
    rule: [appConf.rules.rbacManaging],
  },
];

const availableAssortmentTabs = [
  {
    id: 1,
    title: PrintUtil.localize("Brands", "assortment"),
    content: "Tab 1 Content",
    ruleId: appConf.rules.brandManaging,
  },
  {
    id: 2,
    title: PrintUtil.localize("Collections", "assortment"),
    content: "Tab 2 Content",
    ruleId: appConf.rules.collectionManaging,
  },
  {
    id: 3,
    title: PrintUtil.localize("Categories", "assortment"),
    content: "Tab 3 Content",
    ruleId: appConf.rules.categoryManaging,
  },
];

export const useAuthCheckStore = defineStore({
  id: "auth-store-check",
  state: () => ({
    sidebarItems: [...availableSidebarItems],
    hasAccessToHistory: true,
    hasAccessToProductsManaging: false,
    hasAccessToStockManaging: false,
    assortmentTabs: [...availableAssortmentTabs],
    canEditUsersInRole: true,
    showKickedOutToast: false,
  }),
  getters: {
    getSidebarItems() {
      return this.sidebarItems;
    },
    getHasAccessToHistory() {
      return this.hasAccessToHistory;
    },
    getAssortmentTabs() {
      return this.assortmentTabs;
    },
    getCanEditUsersInRole() {
      return this.canEditUsersInRole;
    },
    getShowKickedOutToast() {
      return this.showKickedOutToast;
    },
    getHasAccessToProductsManaging() {
      return this.hasAccessToProductsManaging;
    },
    getHasAccessToStockManaging() {
      return this.hasAccessToStockManaging;
    },
  },
  actions: {
    refresh() {
      LoggerUtil.debug(TokenUtil.getAuthorized());
      this.sidebarItems = availableSidebarItems.filter((el) => {
        if (el.rule === true) return true;
        const a = [];
        return el.rule.some((el) => TokenUtil.hasAccessTo(el));
      });
      this.hasAccessToHistory = TokenUtil.hasAccessTo(appConf.rules.checkLogs);
      this.assortmentTabs = availableAssortmentTabs.filter((el) =>
        TokenUtil.hasAccessTo(el.ruleId),
      );
      this.canEditUsersInRole = TokenUtil.hasAccessTo(
        appConf.rules.userManaging,
      );
      this.hasAccessToProductsManaging = TokenUtil.hasAccessTo(
        appConf.rules.productsManaging,
      );
      this.hasAccessToStockManaging = TokenUtil.hasAccessTo(
        appConf.rules.stockManaging,
      );
    },
    logout() {},
  },
});
