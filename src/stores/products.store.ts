import { defineStore } from "pinia";
import ProductModel from "@/api/modules/product/models/product.model";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import PrintUtil from "@/utils/localization/print.util";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import ExportConfigDto from "@/api/modules/product/dto/export-config.dto";

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
      {
        field: "eanCode",
        header: "EAN",
      },
      //Price field = Default price (commonPrice on backend)
      {
        field: "price",
        header: PrintUtil.localize("priceCapslock", "products"),
      },
    ],
    uploadPreviewColumns: PrintUtil.localize("uploadTableColumns", "products"),
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
      const created = await productModel.bulkInsert(
        this.onUploadRows.map((el) => ({
          ...el,
          expirationDate: el.expirationDate * 1000 * 60 * 24,
        })),
      );
      if (created.success) {
        await this.loadProductList();
      }

      return created;
    },

    async exportToFile(exportConfigDto: ExportConfigDto) {
      const productModel = new ProductModel();

      const res = await productModel.exportToFile(exportConfigDto);
      const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = `export_${new Date().toLocaleString()}.xlsx`;
      downloadLink.click();
    },
  },
});
