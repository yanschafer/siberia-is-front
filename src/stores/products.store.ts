import { defineStore } from "pinia";
import ProductModel from "@/api/modules/product/models/product.model";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import PrintUtil from "@/utils/localization/print.util";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    searchTerm: "",
    miniGalleryVisible: false,
    miniGallerySelected: [],
    productRows: [],
    productColumns: [
      { field: "name", header: PrintUtil.localize("nameCapslock", "default") },
      {
        field: "vendorCode",
        header: PrintUtil.localize("skuCapslock", "products"),
      },
      //Price field = Default price (commonPrice on backend)
      {
        field: "price",
        header: PrintUtil.localize("priceCapslock", "products"),
      },
    ],
    uploadPreviewColumns: [
      {
        field: "vendorCode",
        header: "SKU",
      },
      {
        field: "eanCode",
        header: "EAN",
      },
      {
        field: "barcode",
        header: "BARCODE",
      },
      {
        field: "brand",
        header: "BRAND",
      },
      {
        field: "name",
        header: "NAME",
      },
      {
        field: "distributorPercent",
        header: "DISTRIBUTOR PERCENT",
      },
      {
        field: "professionalPercent",
        header: "PROFESSIONAL PERCENT",
      },
      {
        field: "commonPrice",
        header: "PRICE",
      },
      {
        field: "category",
        header: "CATEGORY",
      },
      {
        field: "color",
        header: "COLOR",
      },
      {
        field: "amountInBox",
        header: "AMOUNT IN BOX",
      },
      {
        field: "expirationDate",
        header: "EXPIRATION DATE",
      },
      {
        field: "link",
        header: "LINK",
      },
    ],
    onUploadRows: [],
    selectedProduct: {},
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getProductList: (state) => state.productRows,
    getSelectedProduct: (state) => state.selectedProduct,
  },
  actions: {
    async loadProductList(
      searchFilterDto: ProductSearchFilterDto = new ProductSearchFilterDto(),
    ) {
      const productModel = new ProductModel();
      const getProducts = await productModel.getList(searchFilterDto);
      if (getProducts.success) {
        this.productRows = getProducts.getData();
      }
      return getProducts;
    },

    async loadSelectedProduct(productId: number) {
      const productModel = new ProductModel();
      const product = await productModel.getOne(productId);
      if (product.success) {
        this.selectedProduct = product.getData();
      }
      return product;
    },

    async updateProduct(
      productId: number,
      productUpdateDto: any,
    ): ApiResponseDto<ProductDto> {
      const productModel = new ProductModel();
      const saveResult = await productModel.update(productId, productUpdateDto);
      if (saveResult.success) {
        const updatedProduct = saveResult.getData();
        this.productRows = this.productRows.map((el) => {
          if (el.id == productId) {
            el.vendorCode = updatedProduct.vendorCode;
            el.name = updatedProduct.name;
            el.price = updatedProduct.distributorPrice;
          }
          return el;
        });
        this.selectedProduct = Object.assign(
          this.selectedProduct,
          saveResult.getData(),
        );
      }
      return saveResult;
    },

    async create(productCreateDto: ProductInputDto) {
      const productModel = new ProductModel();
      return await productModel.create(productCreateDto);
    },

    async remove(productId: number) {
      const productModel = new ProductModel();
      return await productModel.remove(productId);
    },

    async uploadCsv(file: File): ApiResponseDto<ProductInputDto[]> {
      const productModel = new ProductModel();
      const onUpload = await productModel.loadFile(file);
      if (onUpload.success) {
        const currTime = Date.now();
        let i = 0;
        this.onUploadRows = [
          ...this.onUploadRows,
          ...onUpload.getData().map((el) => {
            i++;
            return {
              ...el,
              index: currTime + i,
            };
          }),
        ];
      }
      return onUpload;
    },

    removeFromUpload(index: number) {
      this.onUploadRows = this.onUploadRows.filter((el) => el.index != index);
    },

    async createUploaded(): ApiResponseDto<ProductListItemDto[]> {
      const productModel = new ProductModel();
      const created = await productModel.bulkInsert(this.onUploadRows);
      if (created.success) {
        await this.loadProductList();
      }

      return created;
    },
  },
});
