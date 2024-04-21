<template>
  <div class="animate__animated animate__fadeIn">
    <Panel class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow>
            <MDBCol
              class="animate__animated animate__flipInX animate__faster d-flex gap-2"
            >
              <MDBBtn @click="cancel" class="utility-btn" outline="black">{{
                localize("cancelCapslock", "default")
              }}</MDBBtn>
              <MDBBtn @click="create" class="utility-btn" outline="black">
                {{ localize("apply", "groups") }}
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 w-100">
              <h5 class="field-heading d-flex gap-2 mt-3 align-items-center">
                {{ localize("brandCapslock") }}
                <SelectComponent
                  :placeholder="placeholderBrand"
                  class="animate__animated animate__flipInX animate__faster"
                  :class="{ 'p-invalid': !validate.brand }"
                  :items="brandList"
                  v-model="brand"
                />
                <DialogComponentTrigger
                  :button-text="createButtonText"
                  :init-object="initBrandDialog"
                />
              </h5>
              <h5
                class="field-heading d-flex flex-column gap-3 align-items-start"
              >
                <span class="field-heading separator">{{
                  localize("expirationDateCapslock")
                }}</span>
                <InputText
                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
                  :class="{ 'p-invalid': !validate.expirationDate }"
                  type="text"
                  :placeholder="placeholderExpirationDate"
                  v-model="expirationDate"
                />
              </h5>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </Panel>
    <MDBContainer class="description-section" fluid>
      <h1 class="product-heading d-flex gap-3 align-items-center">
        <TreeDropdownComponent
          :placeholder="placeholderCategory"
          class="animate__animated animate__flipInX animate__faster"
          :class="{ 'p-invalid': !validate.category }"
          :nodes="categoryList"
          v-model="category"
        />
        <DialogComponentTrigger
          :button-text="createButtonText"
          :init-object="initCategoryDialog"
        />
      </h1>
      <h1 class="product-heading d-flex gap-3 align-items-center">
        <SelectComponent
          :placeholder="placeholderCollection"
          class="animate__animated animate__flipInX animate__faster"
          :class="{ 'p-invalid': !validate.collection }"
          :items="collectionList"
          v-model="collection"
        />
        <DialogComponentTrigger
          :button-text="createButtonText"
          :init-object="initCollectionDialog"
        />
        <span class="field-heading separator">|</span>
        <h5
          class="animate__animated animate__flipInX animate__faster field-heading d-flex gap-1 align-items-center mb-0"
        >
          {{ localize("colorCapslock") }}
          <InputText
            class="input-wrapper animate__animated animate__fadeIn username-input mt-2"
            :class="{ 'p-invalid': !validate.color }"
            type="text"
            :placeholder="placeholderColor"
            v-model="color"
          />
        </h5>
      </h1>
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("quantityPerPackageCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input mt-2"
              :class="{ 'p-invalid': !validate.amountInBox }"
              type="text"
              :placeholder="placeholderQuantityPerPackage"
              v-model="amountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("distributionPercentCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input mt-2"
              :class="{ 'p-invalid': !validate.distributorPercent }"
              type="text"
              :placeholder="placeholderDistributionPercent"
              v-model="distributorPercent"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("professionalPercentCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input mt-2"
              :class="{ 'p-invalid': !validate.professionalPercent }"
              type="text"
              :placeholder="placeholderProfessionalPercent"
              v-model="professionalPercent"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("defaultPriceCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input mt-2"
              :class="{ 'p-invalid': !validate.commonPrice }"
              type="text"
              :placeholder="placeholderDefaultPrice"
              v-model="commonPrice"
            />
          </h5>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import { useCollectionStore } from "@/stores/collection.store";
import { useRoute, useRouter } from "vue-router";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import loggerUtil from "@/utils/logger/logger.util";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CategoryModel from "@/api/modules/category/models/category.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import PrintUtil from "@/utils/localization/print.util";
import ValidateRule from "@/utils/validator/validate-rule";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import ValidatorUtil from "@/utils/validator/validator.util";
import MassiveUpdateDto from "@/api/modules/product/dto/groups/massive-update.dto";
import { useProductGroupStore } from "@/stores/product-group.store";

export default {
  name: "ApplyChangesView",
  components: {
    DialogComponentTrigger,
    TreeDropdownComponent,
    SelectComponent,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    InputText,
    Panel,
  },
  data() {
    return {
      createButtonText: this.localize("createCapslock", "default"),
      placeholderCategory: this.localize("selectACategory"),
      placeholderBrand: this.localize("selectABrand"),
      placeholderCollection: this.localize("selectACollection"),
      placeholderColor: this.localize("placeholderColor"),
      placeholderQuantityPerPackage: this.localize("placeholderNumber"),
      placeholderDistributionPercent: this.localize("placeholderNumber"),
      placeholderProfessionalPercent: this.localize("placeholderNumber"),
      placeholderDefaultPrice: this.localize("placeholderNumber"),
      placeholderExpirationDate: this.localize("placeholderExpirationDate"),
      brand: null,
      distributorPercent: null,
      professionalPercent: null,
      commonPrice: null,
      category: null,
      collection: null,
      color: null,
      amountInBox: null,
      expirationDate: null,
      initCategoryDialog: {
        header: this.localize("createACategory"),
        showSelect: true,
        selectItems: this.categoryList,
        selectName: this.localize("selectParentCategory"),
        inputName: this.localize("categoryName"),
        methodOnSave: async (category) => {
          const loadRes = await this.categoriesStore.loadCategoriesList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.initCategoryDialog.selectItems = this.categoryList;
          this.$nextTick(() => {
            this.category = category.id;
          });
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
        toastSuccessText: this.localize("categoryIsCreated"),
        toastErrorText: this.localize("categoryCreationFailed"),
      },
      initBrandDialog: {
        header: this.localize("createABrand"),
        inputName: this.localize("brandName"),
        model: new BrandModel(),
        methodOnSave: async (brand) => {
          const loadRes = await this.brandStore.loadBrandsList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.brand = brand;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        toastSuccessText: this.localize("brandIsCreated"),
        toastErrorText: this.localize("brandCreationFailed"),
      },
      initCollectionDialog: {
        header: this.localize("createACollection"),
        inputName: this.localize("collectionName"),
        methodOnSave: async (collection) => {
          const loadRes = await this.collectionStore.loadCollectionList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.collection = collection;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
        toastSuccessText: this.localize("collectionIsCreated"),
        toastErrorText: this.localize("collectionCreationFailed"),
      },
      validate: {
        brand: true,
        distributorPercent: true,
        professionalPercent: true,
        commonPrice: true,
        category: true,
        collection: true,
        color: true,
        amountInBox: true,
        expirationDate: true,
      },
      validator: new ValidatorUtil(),
    };
  },
  async setup() {
    const productGroupStore = useProductGroupStore();
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoriesStore = useCategoriesStore();
    const router = useRouter();
    const route = useRoute();

    const loaders = await Promise.all([
      brandStore.loadBrandsList(),
      collectionStore.loadCollectionList(),
      categoriesStore.loadCategoriesList(),
    ]);

    return {
      productGroupStore,
      brandStore,
      categoriesStore,
      collectionStore,
      groupId: parseInt(route.params.id.toString()),
      router,
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    const brandValidateRule = new ValidateRule().skipIfNull().required();
    const distributorPercentValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);
    const professionalPercentValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);
    const commonPriceValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);
    const categoryValidateRule = new ValidateRule().skipIfNull().required();
    const collectionValidateRule = new ValidateRule().skipIfNull().required();
    const colorValidateRule = new ValidateRule().skipIfNull().required();
    const amountInBoxValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);
    const expirationDateValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);

    this.validator = this.validator
      .addRule("brand", brandValidateRule)
      .addRule("commonPrice", commonPriceValidateRule)
      .addRule("distributorPercent", distributorPercentValidateRule)
      .addRule("professionalPercent", professionalPercentValidateRule)
      .addRule("category", categoryValidateRule)
      .addRule("collection", collectionValidateRule)
      .addRule("color", colorValidateRule)
      .addRule("amountInBox", amountInBoxValidateRule)
      .addRule("expirationDate", expirationDateValidateRule);

    this.initCategoryDialog.selectItems = this.categoryList;
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    clearValidationErrors() {
      this.validate = {
        brand: true,
        distributorPercent: true,
        professionalPercent: true,
        commonPrice: true,
        category: true,
        collection: true,
        color: true,
        amountInBox: true,
        expirationDate: true,
      };
    },
    showNotFoundToast(type) {
      this.$toast.add({
        severity: "error",
        summary: this.localize("creationFailed"),
        detail: `${type} ${this.localize("notFound")}`,
        life: 3000,
      });
    },
    async create() {
      this.clearValidationErrors();
      const brandId = this.brand ? this.brand.id : null;
      const collectionId = this.collection ? this.collection.id : null;
      const categoryId = this.category ? parseInt(String(this.category)) : null;
      const expirationDate =
        this.expirationDate != null
          ? parseInt(this.expirationDate) * 24 * 60 * 1000
          : null;

      const newProductData = new MassiveUpdateDto(
        brandId,
        this.distributorPercent,
        this.professionalPercent,
        this.commonPrice,
        categoryId,
        collectionId,
        this.color,
        this.amountInBox,
        expirationDate,
      );

      const validateRes = this.validator.validate(newProductData);
      if (validateRes !== true) {
        loggerUtil.debug(validateRes);
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const creationResult = await this.productGroupStore.applyChanges(
        this.groupId,
        newProductData,
      );
      if (creationResult.success) {
        this.$toast.add({
          severity: "success",
          summary: PrintUtil.localize("massiveUpdate", "groups"),
          detail: PrintUtil.localize("applyChangesSuccessMessage", "groups"),
          life: 3000,
        });

        this.router.push({
          name: "Group details",
          params: { id: this.groupId },
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
      this.clearValidationErrors();
      this.router.push({
        name: "Group details",
        params: { id: this.groupId },
      });
    },
  },
  computed: {
    categoryList() {
      return this.categoriesStore.getCategoryList;
    },
    brandList() {
      return this.brandStore.getBrandList;
    },
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
  },
};
</script>
<style scoped>
.product-img {
  border: 20px solid #121212;
  width: 100%;
  min-width: 250px;
  max-width: 250px;
  max-height: 250px;
  height: 100%;
  min-height: 250px;
}
.field-value {
  font-weight: 800;
  color: #121212;
  font-size: 16px;
}
.product-heading {
  font-weight: 600;
  color: #121212;
  margin-bottom: 2rem;
  font-size: 32px;
  margin-bottom: 0.6rem;
}
.field-heading {
  font-size: 16px;
  gap: 1rem;
  color: #4e4e4e;
  margin-bottom: 0;
  font-weight: 500;
  width: 100%;
  max-width: max-content;
}

.copy-on {
  text-decoration: underline;
}
.copy-on:hover {
  cursor: pointer;
}
.sku-img {
  width: 100%;
  max-width: 75%;
}
.header-row {
  display: flex;
}
.description {
  width: 100%;
  max-width: 85vw;
}
.description-section {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.2rem;
  padding-top: 1rem;
}
.footer-section {
  padding-top: 1.3rem;
}
.p-cascadeselect-panel .p-cascadeselect-items {
  padding-left: 0 !important;
}
.username-input {
  width: 100%;
}
:deep(.form-outline) {
  width: 100%;
  max-width: 10rem;
  background: #f8f8f8;
  border: 0;
  border-bottom: 2px solid #565656;
  height: 2rem;
  padding-top: 0 !important;
}
:deep(.form-control) {
  padding-top: 0.1rem;
}
#description {
  width: 100%;
  max-width: auto !important;
  background: #f8f8f8;
  border: 0;
  border-bottom: 2px solid #565656;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw !important;
}
:deep(.p-dropdown-label) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown-filter) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.p-multiselect-label .p-placeholder {
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw !important;
}
:deep(.p-dropdown-label) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown-filter) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
:deep(.p-panel-header) {
  display: none;
}
:deep(.p-panel) {
  border-top: 1px solid #e5e7eb;
}
</style>
