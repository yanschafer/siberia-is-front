import { defineStore } from "pinia";

export const useBrandSelectorStore = defineStore({
  id: "brand-selector-store",
  state: () => ({
    validateRes: true,
    value: null,
  }),
});
