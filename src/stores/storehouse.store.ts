import {defineStore} from "pinia";
import StockModel from "@/api/modules/stock/models/stock.model";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";

export const useStorehousesStore = defineStore({
  id: 'storehouses',
  state: () => ({
    searchTerm: '',
    storehousesRows: [],
    storehousesColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'address', header: 'ADDRESS' },
    ],
    selectedStore: {}
  }),
  getters: {
    getStorehouseList: (state) => state.storehousesRows,
    getSearchTerm: (state) => state.searchTerm,
    getSelectedStorehouse: (state) => state.selectedStore
  },

  actions: {
    async loadStorehouseList() {
      const stockModel = new StockModel()
      const stockList = await stockModel.getList()
      if (stockList.success)
        this.storehousesRows = stockList.getData()
    },
    async loadSelectedStoreHouse(stockId: number) {
      const stockModel = new StockModel()
      const getStock = await stockModel.getOne(stockId)
      if (getStock.success) {
        this.selectedStore = getStock.getData()
      }
    },
    async updateStorehouse(storehouseId: number, updateStorehouseDto: StockUpdateDto) {
      const stockModel = new StockModel()
      const saveResult = await stockModel.update(storehouseId, updateStorehouseDto)
      if (saveResult.success) {
        this.selectedStore = {
          ...this.selectedStore,
          name: saveResult.getData().name,
          address: saveResult.getData().address
        }
        this.storehousesRows = this.storehousesRows.map(el => {
          if (el.id == storehouseId) {
            el.name = updateStorehouseDto.name
            el.address = updateStorehouseDto.address
          }
          return el
        })
        return saveResult
      }
    }
  },
});
