import { defineStore } from "pinia";
import RuleModel from "@/api/modules/rbac/models/rule.model";

export const useRulesStore = defineStore({
  id: "rules",
  state: () => ({
    rulesList: [],
  }),
  getters: {
    getRuleList: (state) => state.rulesList,
  },
  actions: {
    async loadRulesList() {
      if (this.getRuleList.length != 0) return;
      const ruleModel = new RuleModel();
      const loaded = await ruleModel.getAll();
      if (loaded.success) this.rulesList = loaded.getData();
    },
  },
});
