import { defineStore } from 'pinia';

export const useStorehousesStore = defineStore('storehouses', {
    state: () => ({
        tableData: [],
        singleStorehouseData: null,
    }),
    actions: {
        setTableData(data) {
            this.tableData = data;
        },
        setSingleStorehouseData(data) {
            this.singleStorehouseData = data;
        },
    },
});