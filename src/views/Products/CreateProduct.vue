<template>
  <div class="animate__animated animate__fadeIn">
    <Panel class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol
          class="col-auto animate__animated animate__flipInX animate__faster"
        >
          <div class="product-img">
            <FileUploadComponent @changed="fileChanged" />
          </div>
        </MDBCol>
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow>
            <MDBCol
              class="d-flex gap-1 align-items-center mb-3 animate__animated animate__flipInX animate__faster"
            >
              <h5 class="field-heading">
                {{ localize("productNameCapslock") }}
              </h5>
              <InputText
                id="product-name-input"
                class="input-wrapper animate__animated animate__fadeIn username-input"
                :class="{ 'p-invalid': !validate.name }"
                type="text"
                :placeholder="placeholderProductName"
                v-model="name"
              />
            </MDBCol>
            <MDBCol class="animate__animated animate__flipInX animate__faster">
              <MDBBtn @click="cancel" class="utility-btn" outline="black">{{
                localize("cancelCapslock", "default")
              }}</MDBBtn>
              <MDBBtn @click="create" class="utility-btn" outline="black">{{
                localize("saveCapslock", "default")
              }}</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 w-100">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("skuCapslock") }}
                <InputText
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.vendorCode }"
                  type="text"
                  :placeholder="placeholderVendorCode"
                  v-model="vendorCode"
                />
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
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
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("linkCapslock") }}
                <InputText
                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
                  :class="{ 'p-invalid': !validate.link }"
                  type="text"
                  :placeholder="placeholderLink"
                  v-model="link"
                />
              </h5>
              <h5
                class="field-heading d-flex flex-column gap-1 align-items-start"
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
      <h1 class="product-heading d-flex gap-1 align-items-center">
        {{ localize("productDescription") }}
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
            class="input-wrapper animate__animated animate__fadeIn username-input"
            :class="{ 'p-invalid': !validate.color }"
            type="text"
            :placeholder="placeholderColor"
            v-model="color"
          />
        </h5>
      </h1>
      <textarea
        class="animate__animated animate__flipInX animate__faster username-input"
        :class="{ 'p-invalid': !validate.description }"
        id="description"
        type="textarea"
        :placeholder="placeholderDescription"
        v-model="description"
      />
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("quantityPerPackageCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.amountInBox }"
              type="text"
              :placeholder="placeholderQuantityPerPackage"
              v-model="amountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("distributionPriceCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.distributorPrice }"
              type="text"
              :placeholder="placeholderDistributionPrice"
              v-model="distributorPrice"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("professionalPriceCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.professionalPrice }"
              type="text"
              :placeholder="placeholderProfessionalPrice"
              v-model="professionalPrice"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("defaultPriceCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
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
import FileUpload from "primevue/fileupload";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import FileUploadComponent from "@/components/Inputs/FileUploadComponent.vue";
import CascadeSelect from "primevue/cascadeselect";
import { useProductsStore } from "@/stores/products.store";
import { useCollectionStore } from "@/stores/collection.store";
import { useRoute, useRouter } from "vue-router";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import EncoderUtil from "@/utils/encoder.util";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import loggerUtil from "@/utils/logger/logger.util";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CategoryModel from "@/api/modules/category/models/category.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import PrintUtil from "@/utils/localization/print.util";
import { th } from "vuetify/locale";
import ValidateRule from "@/utils/validator/validate-rule";
import ValidatorUtil from "@/utils/validator/validator.util";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";

export default {
  name: "CreateProduct",
  components: {
    DialogComponentTrigger,
    FileUpload,
    TreeDropdownComponent,
    SelectComponent,
    CascadeSelect,
    MDBInput,
    FileUploadComponent,
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
      placeholderDescription: this.localize("placeholderDescription"),
      placeholderProductName: this.localize("placeholderProductName"),
      placeholderVendorCode: this.localize("placeholderVendorCode"),
      placeholderLink: this.localize("placeholderLink"),
      placeholderColor: this.localize("placeholderColor"),
      placeholderQuantityPerPackage: this.localize("placeholderNumber"),
      placeholderDistributionPrice: this.localize("placeholderNumber"),
      placeholderProfessionalPrice: this.localize("placeholderNumber"),
      placeholderDefaultPrice: this.localize("placeholderNumber"),
      placeholderExpirationDate: this.localize("placeholderExpirationDate"),
      vendorCode: "",
      brand: null,
      name: "",
      description: "",
      distributorPrice: "",
      professionalPrice: "",
      commonPrice: "",
      category: null,
      collection: null,
      color: "",
      amountInBox: "",
      expirationDate: "",
      link: "",
      photoBase64: "",
      photoName: "",
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
        vendorCode: true,
        brand: true,
        name: true,
        description: true,
        distributorPrice: true,
        professionalPrice: true,
        commonPrice: true,
        category: true,
        collection: true,
        color: true,
        amountInBox: true,
        expirationDate: true,
        link: true,
      },
      validator: new ValidatorUtil(),
    };
  },
  async setup() {
    const productStore = useProductsStore();
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoriesStore = useCategoriesStore();
    const router = useRouter();

    return {
      productStore,
      brandStore,
      categoriesStore,
      collectionStore,
      router,
      loadBrandListRes: await brandStore.loadBrandsList(),
      loadCollectionListRes: await collectionStore.loadCollectionList(),
      loadCategoryListRes: await categoriesStore.loadCategoriesList(),
    };
  },
  created() {
    this.loadBrandListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCollectionListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCategoryListRes.toastIfError(this.$toast, this.$nextTick);

    const vendorCodeValidateRule = new ValidateRule().required();
    const brandValidateRule = new ValidateRule().skipIfNull().required();
    const nameValidateRule = new ValidateRule().required();
    const descriptionValidateRule = new ValidateRule().required();
    const distributorPriceValidateRule = new ValidateRule()
      .required()
      .setMin(0);
    const professionalPriceValidateRule = new ValidateRule()
      .required()
      .setMin(0);
    const commonPriceValidateRule = new ValidateRule().required().setMin(0);
    const categoryValidateRule = new ValidateRule().required();
    const collectionValidateRule = new ValidateRule().skipIfNull().required();
    const colorValidateRule = new ValidateRule().required();
    const amountInBoxValidateRule = new ValidateRule().required().setMin(0);
    const expirationDateValidateRule = new ValidateRule().required().setMin(0);
    const linkValidateRule = new ValidateRule().required();

    this.validator = this.validator
      .addRule("vendorCode", vendorCodeValidateRule)
      .addRule("brand", brandValidateRule)
      .addRule("name", nameValidateRule)
      .addRule("description", descriptionValidateRule)
      .addRule("commonPrice", commonPriceValidateRule)
      .addRule("distributorPrice", distributorPriceValidateRule)
      .addRule("professionalPrice", professionalPriceValidateRule)
      .addRule("category", categoryValidateRule)
      .addRule("collection", collectionValidateRule)
      .addRule("color", colorValidateRule)
      .addRule("amountInBox", amountInBoxValidateRule)
      .addRule("expirationDate", expirationDateValidateRule)
      .addRule("link", linkValidateRule);

    this.initCategoryDialog.selectItems = this.categoryList;
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    async fileChanged(files: File[]) {
      const file = files[0];
      const encoded = await EncoderUtil.encode(file);
      if (encoded == null) {
        this.$toast.add({
          severity: "error",
          summary: this.localize("failedUpload"),
          detail: this.localize("photoUploadingFailed"),
          life: 3000,
        });
        return;
      }
      this.photoBase64 = encoded;
      this.photoName = file.name;
    },
    async handleCategoryUpdate() {
      const loadRes = await this.categoriesStore.loadCategoriesList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
    },
    async handleBrandUpdate() {
      const loadRes = await this.brandStore.loadBrandsList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
    },
    async handleCollectionUpdate() {
      const loadRes = await this.collectionStore.loadCollectionList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
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
      const brandId = this.brand ? this.brand.id : null;
      const collectionId = this.collection ? this.collection.id : null;
      const categoryId = parseInt(String(this.category));
      const expirationDate = parseInt(this.expirationDate) * 24 * 60 * 1000;

      const newProductData = new ProductInputDto(
        this.photoBase64,
        this.photoName,
        this.vendorCode,
        "",
        brandId,
        this.name,
        this.description,
        parseFloat(this.distributorPrice),
        parseFloat(this.professionalPrice),
        parseFloat(this.commonPrice),
        categoryId,
        collectionId,
        this.color,
        parseInt(this.amountInBox),
        expirationDate,
        this.link,
      );

      const validateRes = this.validator.validate(newProductData);
      if (validateRes !== true) {
        loggerUtil.debug(validateRes);
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const creationResult = await this.productStore.create(newProductData);
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
