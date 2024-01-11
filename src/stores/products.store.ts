import {defineStore} from "pinia";
import ProductModel from "@/api/modules/product/models/product.model";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";


export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    searchTerm: '',
    productRows: [],
    productColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'vendorCode', header: 'SKU' },
      { field: 'price', header: 'PRICE' },
    ],
    selectedProduct: {}
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getProductList: (state) => state.productRows,
    getSelectedProduct: (state) => state.selectedProduct
  },
  actions: {
    async loadProductList() {
      const productModel = new ProductModel()
      const getProducts = await productModel.getList(new ProductSearchFilterDto())
      if (getProducts.success) {
        this.productRows = getProducts.getData()
      }
    },
    async loadSelectedProduct(productId: number) {
      const productModel = new ProductModel()
      const product = await productModel.getOne(productId)
      if (product.success) {
        this.selectedProduct = product.getData()
      }
    },
    async updateProduct(productId: number, productUpdateDto: ProductUpdateDto): ApiResponseDto<ProductDto> {
      const productModel = new ProductModel()
      const saveResult = await productModel.update(productId, productUpdateDto)
      if (saveResult.success) {
        if (productUpdateDto.name != null)
          this.productRows = this.productRows.map(el => {
            if (el.id == productId)
              el.vendorCode = productUpdateDto.vendorCode
            el.name = productUpdateDto.name
            el.distributorPrice = productUpdateDto.distributorPrice
            el.professionalPrice = productUpdateDto.professionalPrice
            el.commonPrice = productUpdateDto.commonPrice
            return el
          })
        this.selectedProduct = Object.assign(this.selectedProduct, saveResult.getData())
      }
      return saveResult
    }
  },
});

