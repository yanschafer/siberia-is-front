import { defineStore } from "pinia";

export const useCategorySelectorStore = defineStore({
  id: "category-selector-store",
  state: () => ({
    validateRes: true,
    value: null,
  }),
});
