import { defineStore } from "pinia";
import ProductDto from "@/api/modules/product/dto/product.dto";
import PrintUtil from "@/utils/localization/print.util";
import ValidatorUtil from "@/utils/validator/validator.util";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";

const emptyProduct = new ProductInputDto(
  null,
  "",
  "",
  "",
  null,
  "",
  "",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "",
);

export const useProductFormStore = defineStore({
  id: "product-form-store",
  state: () => ({
    data: { ...emptyProduct, expirationDatePure: "" },
    validator: new ValidatorUtil(),
    saveBtnTitle: "",
    cancelBtnTitle: "",
  }),
  actions: {
    initCreationProcess(validator: ValidatorUtil) {
      this.data = {
        ...emptyProduct,
      };
      this.saveBtnTitle = PrintUtil.localize("saveCapslock", "default");
      this.cancelBtnTitle = PrintUtil.localize("cancelCapslock", "default");
      this.validator = validator;
    },

    initUpdateProcess(productDto: ProductDto) {
      this.data = {
        ...productDto,
        brand: productDto.brand,
        collection: productDto.collection,
        category: productDto.category,
        photoList: null,
        photo: productDto.photoIds,
      };
      this.saveBtnTitle = "SAVE";
      this.cancelBtnTitle = "CANCEL";
    },

    validate() {
      return this.validator.validate(this.data);
    },
  },
});
