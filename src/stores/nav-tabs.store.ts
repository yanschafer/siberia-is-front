import { defineStore } from "pinia";
import NavTabDto from "@/router/dto/nav-tab.dto";

export const useNavTabsStore = defineStore({
  id: "nav-tabs-store",
  state: () => ({
    tabsList: [],
    active: {},
    showUtility: false,
  }),
  getters: {
    getTabs: (state) => state.tabsList,
    getActive: (state) => state.active,
  },
  actions: {
    setTabs(tabs: NavTabDto[], showUtility: boolean = false) {
      this.tabsList = tabs;
      this.showUtility = showUtility;
    },
    setActive(index: number) {
      this.active = this.tabsList[index];
    },
  },
});
