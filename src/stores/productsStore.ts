import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
    state: () => ({
        tableData: [],
        singleProductData: null,
    }),
    actions: {
        setTableData(data) {
            this.tableData = data;
        },
        setSingleProductData(data) {
            this.singleProductData = data;
        },
    },
});