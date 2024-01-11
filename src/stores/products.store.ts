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
    productRows: [
      // { id: 1, name: 'Product 1', sku: '11111', quantity: '23', price: 100 },
      // { id: 2, name: 'Product 2', sku: '2222', quantity: '3', price: 100 },
    ],
    productColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'vendorCode', header: 'SKU' },
      // { field: 'quantity', header: 'QUANTITY' },
      { field: 'price', header: 'PRICE' },
    ],
    selectedProduct: {
      // id: 1,
      // productName: "Product 1",
      // imageSource: "/product-img.jpg",
      // sku: "SKU123",
      // barcodeImage: "/sku.png",
      // brand: "BrandName",
      // link: "http://example.com/product1",
      // quantity: 10,
      // lastTimeOrdered: "2023-01-01",
      // lastPriceOrdered: 90,
      // costPrice: 80,
      // status: "Active",
      // nailNippersCategory: "Category1",
      // productDescription: "Product description 1",
      // collectionName: "Collection1",
      // color: "Red",
      // volume: 250,
      // size: 5,
      // quantityPerPackage: 1,
      // distributionPrice: 100,
      // distributionPriceWithoutVat: 90,
      // distributionMarkup: 10,
      // professionalPrice: 120,
      // professionalPriceWithoutVat: 110,
      // professionalMarkup: 10,
      // defaultPrice: 150,
      // defaultPriceWithoutVat: 140,
      // defaultMarkup: 10,
    }
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
      if (productUpdateDto.name != null)
        this.productRows = this.productRows.map(el => {
          if (el.id == productId)
            el.photo = productUpdateDto.photoBase64
            el.photoName = productUpdateDto.photoName
            el.vendorCode = productUpdateDto.vendorCode
            el.barcode = productUpdateDto.barcode
            el.brand = productUpdateDto.brand
            el.name = productUpdateDto.name
            el.description = productUpdateDto.description
            el.purchasePrice = productUpdateDto.purchasePrice
            el.cost = productUpdateDto.cost
            el.lastPurchaseDate = productUpdateDto.lastPurchaseDate
            el.distributorPrice = productUpdateDto.distributorPrice
            el.professionalPrice = productUpdateDto.professionalPrice
            el.commonPrice = productUpdateDto.commonPrice
            el.category = productUpdateDto.category
            el.collection = productUpdateDto.collection
            el.color = productUpdateDto.color
            el.amountInBox = productUpdateDto.amountInBox
            el.expirationDate = productUpdateDto.expirationDate
            el.link = productUpdateDto.link

          return el
        })
      const saveResult = await productModel.update(productId, productUpdateDto)
      if (saveResult.success) {
        this.selectedProduct = Object.assign(this.selectedProduct, saveResult.getData())
      }
      return saveResult
    }
  },
});

