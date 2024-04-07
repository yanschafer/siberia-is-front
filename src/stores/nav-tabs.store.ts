import { defineStore } from "pinia";
import NavTabDto from "@/router/dto/nav-tab.dto";

export const useNavTabsStore = defineStore({
  id: "nav-tabs-store",
  state: () => ({
    tabsList: [],
    active: {},
  }),
  getters: {
    getTabs: (state) => state.tabsList,
    getActive: (state) => state.active,
  },
  actions: {
    setTabs(tabs: NavTabDto[]) {
      this.tabsList = tabs;
    },
    setActive(index: number) {
      this.active = this.tabsList[index];
    },
  },
});
