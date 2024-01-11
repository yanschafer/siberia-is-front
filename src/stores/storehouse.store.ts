import {defineStore} from "pinia";
import StockModel from "@/api/modules/stock/models/stock.model";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import IncomeTransactionModel from "@/api/modules/transaction/models/income-transaction.model";
import TransactionInputDto from "@/api/modules/transaction/dto/transaction-input.dto";
import {TransactionStatus, TransactionType} from "@/api/conf/app.conf";
import loggerUtil from "@/utils/logger/logger.util";
import OutcomeTransactionModel from "@/api/modules/transaction/models/outcome-transaction.model";
import TransferTransactionModel from "@/api/modules/transaction/models/transfer-transaction.model";

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
    },
    operationSucceed() {},
    async newArrival(storehouseId: number, products: ProductListItemDto[]) {
      const transactionModel = new IncomeTransactionModel();
      loggerUtil.debug(storehouseId, products)
      const res = await transactionModel.create(new TransactionInputDto(
        storehouseId,
        null,
        TransactionType.INCOME,
        products.map(el => ({productId: el.id, amount: parseInt(String(el.quantity)), price: parseInt(String(el.price))}))
      ))
      if (res.success) {
        this.operationSucceed()
        const transactionData = res.getData()
        if (transactionData.status == TransactionStatus.PROCESSED) {
          await this.loadSelectedStoreHouse(storehouseId)
        }
      }
      return res
    },
    async newSale(storehouseId: number, products: ProductListItemDto[]) {
      const transactionModel = new OutcomeTransactionModel();
      loggerUtil.debug(storehouseId, products)
      const res = await transactionModel.create(new TransactionInputDto(
        null,
        storehouseId,
        TransactionType.OUTCOME,
        products.map(el => ({productId: el.id, amount: parseInt(String(el.quantity)), price: parseInt(String(el.price))}))
      ))
      if (res.success) {
        this.operationSucceed()
        await this.loadSelectedStoreHouse(storehouseId)
      }
      return res
    },
    async newRequest(storehouseId: number, products: ProductListItemDto[]) {
      const transactionModel = new TransferTransactionModel();
      loggerUtil.debug(storehouseId, products)
      const res = await transactionModel.create(new TransactionInputDto(
        storehouseId,
        null,
        TransactionType.TRANSFER,
        products.map(el => ({productId: el.id, amount: parseInt(String(el.quantity)), price: parseInt(String(el.price))}))
      ))
      if (res.success) {
        this.operationSucceed()
        await this.loadSelectedStoreHouse(storehouseId)
      }
      return res
    }
  },
});
