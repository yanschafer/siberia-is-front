<template>
  <ProductsForm @save="handleSuccessSave" @cancel="cancel" />
</template>

<script lang="ts">
import { useProductsStore } from "@/stores/products.store";
import { useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import ValidateRule from "@/utils/validator/validate-rule";
import ValidatorUtil from "@/utils/validator/validator.util";
import ProductsForm from "@/views/Products/ProductsForm.vue";
import { useProductFormStore } from "@/stores/components/product-form.store";

export default {
  name: "CreateProduct",
  components: {
    ProductsForm,
  },
  data() {
    return {};
  },
  async setup() {
    const productStore = useProductsStore();
    const productFormStore = useProductFormStore();
    const router = useRouter();

    return {
      productStore,
      productFormStore,
      router,
    };
  },
  created() {
    const stringValidateRule = new ValidateRule().required();
    const positiveNumberValidateRule = new ValidateRule().required().setMin(0);

    const brandValidateRule = new ValidateRule().skipIfNull().required();
    const categoryValidateRule = new ValidateRule().required();
    const collectionValidateRule = new ValidateRule().skipIfNull().required();

    const validator = new ValidatorUtil()
      .addRule("vendorCode", stringValidateRule)
      .addRule("eanCode", stringValidateRule)
      .addRule("barCode", stringValidateRule)
      .addRule("brand", brandValidateRule)
      .addRule("name", stringValidateRule)
      .addRule("description", stringValidateRule)
      .addRule("commonPrice", positiveNumberValidateRule)
      .addRule("offertaPrice", positiveNumberValidateRule)
      .addRule("distributionPercent", positiveNumberValidateRule)
      .addRule("professionalPercent", positiveNumberValidateRule)
      .addRule("category", categoryValidateRule)
      .addRule("collection", collectionValidateRule)
      .addRule("color", stringValidateRule)
      .addRule("amountInBox", positiveNumberValidateRule)
      .addRule("expirationDate", positiveNumberValidateRule)
      .addRule("link", stringValidateRule);

    this.productFormStore.initCreationProcess(validator);
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    showNotFoundToast(type) {
      this.$toast.add({
        severity: "error",
        summary: this.localize("creationFailed"),
        detail: `${type} ${this.localize("notFound")}`,
        life: 3000,
      });
    },
    async handleSuccessSave() {
      const creationResult = await this.productStore.create(
        this.productFormStore.data,
      );
      if (creationResult.success) {
        this.$toast.add({
          severity: "success",
          summary: this.localize("success", "storehouses"),
          detail: this.localize("productSuccessfullyCreated"),
          life: 3000,
        });
        this.router.push({
          name: "Product details",
          params: { id: creationResult.getData().id.toString() },
        });
      } else {
        const error = creationResult.getError();
        if (error.httpStatusCode == 404) {
          if (error.data?.includes("BrandDao")) {
            this.showNotFoundToast("Brand");
          }
          if (error.data?.includes("CollectionDao")) {
            this.showNotFoundToast("Collection");
          }
          if (error.data?.includes("CategoryDao")) {
            this.showNotFoundToast("Category");
          }
          return;
        }
        error.showServerErrorToast(this.$toast, this.$nextTick);
      }
    },
    cancel() {
      this.router.push({
        name: "products",
      });
    },
  },
};
</script>
<style scoped></style>
