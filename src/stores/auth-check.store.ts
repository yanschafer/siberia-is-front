import { defineStore } from "pinia";
import PrintUtil from "@/utils/localization/print.util";
import { appConf, EventObjectTypes } from "@/api/conf/app.conf";
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
    match: ["dashboard"],
    rule: true,
    eventTransitionFrom: [],
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
    match: ["products", "groups", "Group details", "Group apply"],
    rule: [appConf.rules.productsManaging, appConf.rules.viewProductsList],
    eventTransitionFrom: [
      EventObjectTypes.PRODUCT,
      EventObjectTypes.PRODUCT_GROUP,
    ],
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
    match: ["assortment"],
    rule: [
      appConf.rules.brandManaging,
      appConf.rules.collectionManaging,
      appConf.rules.categoryManaging,
    ],
    eventTransitionFrom: [
      EventObjectTypes.BRAND,
      EventObjectTypes.COLLECTION,
      EventObjectTypes.CATEGORY,
    ],
  },
  {
    name: PrintUtil.localize("Media", "sidebar"),
    icon: "IconPhoto",
    iconColor: "#B8B8B8",
    iconSize: 24,
    strokeWidth: 1,
    disabled: false,
    active: true,
    route: "media",
    match: ["media"],
    rule: [
      appConf.rules.brandManaging,
      appConf.rules.collectionManaging,
      appConf.rules.categoryManaging,
    ],
    eventTransitionFrom: [],
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
    match: ["storehouses"],
    rule: [appConf.rules.stockManaging, appConf.rules.viewStockData],
    eventTransitionFrom: [EventObjectTypes.STOCK],
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
    match: ["users"],
    rule: [appConf.rules.userManaging],
    eventTransitionFrom: [EventObjectTypes.USER, EventObjectTypes.USER_RIGHTS],
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
    match: ["roles"],
    rule: [appConf.rules.rbacManaging],
    eventTransitionFrom: [EventObjectTypes.ROLE],
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
    availableEventTransitions: [],
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
      this.availableEventTransitions = [];
      this.sidebarItems.forEach((el) => {
        this.availableEventTransitions.push(...el.eventTransitionFrom);
      });
      this.availableEventTransitions.push(EventObjectTypes.TRANSACTION);
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
