<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <div class="animate__animated animate__fadeIn">
    <Panel class="animate__animated animate__fadeIn">
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol v-if="!editing" class="col-auto">
          <img class="product-img" :src="imageSource" :alt="productName" />
        </MDBCol>
        <MDBCol
          v-else
          style="padding-left: 12px"
          class="col-auto animate__animated animate__flipInX animate__faster"
        >
          <div class="product-img">
            <FileUploadComponent @changed="fileUploaded" />
          </div>
        </MDBCol>
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow
            style="padding-left: 12px; margin-bottom: 1rem"
            v-if="!editing"
            class="d-flex d-flex justify-content-end"
          >
            <MDBBtn @click="startEditing" class="utility-btn" outline="black">{{
              localize("editCapslock", "default")
            }}</MDBBtn>
          </MDBRow>
          <MDBCol
            style="margin-bottom: 1rem"
            class="animate__animated animate__flipInX animate__faster gap-3 d-flex justify-content-end"
            v-else
          >
            <MDBBtn @click="confirmDeletion" class="utility-btn btn-danger">{{
              localize("deleteCapslock", "default")
            }}</MDBBtn>
            <MDBBtn
              @click="cancelEditing"
              class="utility-btn"
              outline="black"
              >{{ localize("cancelCapslock", "default") }}</MDBBtn
            >
            <MDBBtn @click="saveChanges" class="utility-btn" outline="black">{{
              localize("saveCapslock", "default")
            }}</MDBBtn>
          </MDBCol>
          <MDBRow>
            <MDBCol class="product-name-col" v-if="!editing">
              <h1 class="product-heading">{{ productName }}</h1>
            </MDBCol>
            <MDBCol
              class="d-flex gap-1 align-items-center mb-3 animate__animated animate__flipInX animate__faster"
              v-else
            >
              <h5 class="field-heading mb-0">
                {{ localize("productNameCapslock") }}
              </h5>
              <InputText
                id="product-name-input"
                class="input-wrapper animate__animated animate__fadeIn username-input"
                :class="{ 'p-invalid': !validate.name }"
                type="text"
                v-model="newProductName"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("skuCapslock") }}
                <span v-if="!editing" class="field-value copy-on">{{
                  sku
                }}</span>
                <InputText
                  v-else
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.vendorCode }"
                  type="text"
                  v-model="newSku"
                />
              </h5>
              <!--              <img class="sku-img" :src="barcodeImage" alt="Barcode">-->
              <h5 v-if="!editing" class="field-heading">
                {{ localize("brandCapslock") }}
                <span class="field-value copy-on">{{ brand }}</span>
              </h5>
              <template v-else>
                <h5 class="field-heading">
                  {{ localize("brandCapslock") }}
                  <SelectComponent
                    :placeholder="placeholderBrand"
                    class="animate__animated animate__flipInX animate__faster"
                    :class="{ 'p-invalid': !validate.brand }"
                    :items="brandList"
                    v-model="newBrand"
                  />
                  <DialogComponentTrigger
                    :button-text="createButtonText"
                    :init-object="initBrandDialog"
                  />
                </h5>
              </template>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("linkCapslock") }}
                <a
                  v-if="!editing"
                  target="_blank"
                  :href="link"
                  class="field-value copy-on"
                  >{{ localize("openInNewWindowCapslock") }}</a
                >
                <InputText
                  v-else
                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
                  :class="{ 'p-invalid': !validate.link }"
                  type="text"
                  v-model="newLink"
                />
              </h5>
            </MDBCol>
            <MDBCol v-if="!editing" class="d-flex flex-column gap-3">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("quantityCapslock") }}
                <span class="field-value">{{ quantity }}</span>
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("lastTimeOrderedCapslock") }}
                <span class="field-value">{{ lastTimeOrdered }}</span>
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("lastPriceOrderedCapslock") }}
                <span class="field-value">{{ lastPriceOrdered }}</span>
              </h5>
              <!--              <h5 class="field-heading">COST PRICE <span class="field-value">{{ costPrice }}</span></h5>-->
              <!--              <h5 class="field-heading">STATUS <span class="field-value">{{ status }}</span></h5>-->
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </Panel>
    <MDBContainer class="description-section" fluid>
      <h5 v-if="!editing" class="field-heading">{{ category }}</h5>
      <template v-else>
        <MDBRow>
          <MDBCol class="col-auto">
            <TreeDropdownComponent
              v-if="updateDropdown"
              :placeholder="placeholderCategory"
              class="animate__animated animate__flipInX animate__faster"
              :class="{ 'p-invalid': !validate.category }"
              :nodes="categoryList"
              v-model="newCategory"
            />
          </MDBCol>
          <DialogComponentTrigger
            :button-text="createButtonText"
            :init-object="initCategoryDialog"
          />
        </MDBRow>
      </template>

      <h1 class="product-heading d-flex gap-1 align-items-center mb-3 mt-3 gap-2">
          {{ localize("productDescription") }}
        <span v-if="!editing" class="field-heading collection-name">{{
          collectionName
        }}</span>
        <template v-else>
          <SelectComponent
            :placeholder="placeholderCollection"
            class="animate__animated animate__flipInX animate__faster"
            :class="{ 'p-invalid': !validate.collection }"
            :items="collectionList"
            v-model="newCollection"
          />
          <DialogComponentTrigger
            :button-text="createButtonText"
            :init-object="initCollectionDialog"
          />
        </template>

        <span class="field-heading separator">|</span>
        <span v-if="!editing" class="field-heading color-name">{{
          color
        }}</span>
        <h5
          v-else
          class="animate__animated animate__flipInX animate__faster field-heading d-flex gap-1 align-items-center mb-0"
        >
          <span class="bottom-numbers">{{
            localize("newColorNameCapslock")
          }}</span>
          <InputText
            class="input-wrapper animate__animated animate__fadeIn username-input"
            :class="{ 'p-invalid': !validate.color }"
            type="text"
            v-model="newColor"
          />
        </h5>
      </h1>
      <p v-if="!editing" class="description">{{ productDescription }}</p>
      <textarea
        v-else
        class="animate__animated animate__flipInX animate__faster text-area"
        :class="{ 'p-invalid': !validate.description }"
        id="description"
        type="textarea"
        v-model="newDescription"
      />
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
          <!--          <h5 class="field-heading">VOLUME <span class="field-value">{{ volume }}</span></h5>-->
          <!--          <h5 class="field-heading">SIZE <span class="field-value">{{ size }}</span></h5>-->
          <h5
            class="bottom-numbers d-flex flex-column justify-content-start gap-2"
          >
            {{ localize("quantityPerPackageCapslock") }}
            <span v-if="!editing" class="field-value">{{
              quantityPerPackage
            }}</span>
            <InputText
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.amountInBox }"
              type="text"
              v-model="newAmountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5
            class="bottom-numbers d-flex flex-column justify-content-start gap-2"
          >
            {{ localize("distributionPriceCapslock") }}
            <span v-if="!editing" class="field-value">{{
              distributionPrice
            }}</span>
            <InputText
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.distributorPrice }"
              type="text"
              v-model="newDistributionPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ distributionPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ distributionMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5
            class="bottom-numbers d-flex flex-column justify-content-start gap-2"
          >
            {{ localize("professionalPriceCapslock") }}
            <span v-if="!editing" class="field-value">{{
              professionalPrice
            }}</span>
            <InputText
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.professionalPrice }"
              type="text"
              v-model="newProfessionalPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ professionalPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ professionalMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5
            class="bottom-numbers d-flex flex-column justify-content-start gap-2"
          >
            {{ localize("defaultPriceCapslock") }}
            <span v-if="!editing" class="field-value">{{ defaultPrice }}</span>
            <InputText
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.commonPrice }"
              type="text"
              v-model="newDefaultPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ defaultPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ defaultMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5
            class="bottom-numbers d-flex flex-column justify-content-start gap-2"
          >
            {{ localize("expirationDateCapslock") }}
            <span v-if="!editing" class="field-value">{{
              expirationDate
            }}</span>
            <InputText
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.expirationDate }"
              type="text"
              v-model="newExpirationDate"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ defaultPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ defaultMarkup }}</span></h5>-->
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
import FilesResolverUtil from "@/utils/files-resolver.util";
import { useProductsStore } from "@/stores/products.store";
import { useRoute, useRouter } from "vue-router";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import { useCollectionStore } from "@/stores/collection.store";
import encoderUtil from "@/utils/encoder.util";
import loggerUtil from "@/utils/logger/logger.util";
import CategoryModel from "@/api/modules/category/models/category.model";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import DialogComponentTrigger from "@/components/Elements/DialogComponentTrigger.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import { useModalStore } from "@/stores/modal.store";
import PrintUtil from "@/utils/localization/print.util";
import InputText from "primevue/inputtext";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import Panel from "primevue/panel";
export default {
  name: "SingleProductView",
  components: {
    DialogComponentTrigger,
    FileUpload,
    ModalComponent,
    TreeDropdownComponent,
    SelectComponent,
    InputText,
    Panel,
    CascadeSelect,
    MDBInput,
    FileUploadComponent,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      updateDropdown: true,
      createButtonText: this.localize("createCapslock", "default"),
      placeholderBrand: this.localize("selectABrand"),
      placeholderCategory: this.localize("selectACategory"),
      placeholderCollection: this.localize("selectACollection"),
      editing: false,
      photoBase64: null,
      photoName: null,

      newImageSource: null,
      newProductName: null,
      newSku: null,
      newLink: null,
      newQuantity: null,
      newColor: null,
      newDescription: null,
      newAmountInBox: null,
      newDistributionPrice: null,
      newProfessionalPrice: null,
      newDefaultPrice: null,
      newStatus: null,
      newBrand: null,
      newCategory: null,
      newCollection: null,
      newLastTimeOrdered: null,
      newLastPriceOrdered: null,
      newCostPrice: null,
      newExpirationDate: null,
      initCategoryDialog: {
        header: "Create a category",
        showSelect: true,
        selectItems: this.categoryList,
        selectName: "Select parent category",
        inputName: "Category name",
        methodOnSave: async (category) => {
          const loadRes = await this.categoriesStore.loadCategoriesList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.initCategoryDialog.selectItems = this.categoryList;
          this.$nextTick(() => {
            this.newCategory = category.id;
          });
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
        toastSuccessText: "Category is created",
        toastErrorText: "Category creation failed",
      },
      initBrandDialog: {
        header: "Create a brand",
        inputName: "Brand name",
        model: new BrandModel(),
        methodOnSave: async (brand) => {
          const loadRes = await this.brandStore.loadBrandsList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.newBrand = brand;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        toastSuccessText: "Brand is created",
        toastErrorText: "Brand creation failed",
      },
      initCollectionDialog: {
        header: "Create a collection",
        inputName: "Collection name",
        methodOnSave: async (collection) => {
          const loadRes = await this.collectionStore.loadCollectionList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.newCollection = collection;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
        toastSuccessText: "Collection is created",
        toastErrorText: "Collection creation failed",
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
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    return {
      productStore,
      brandStore,
      categoriesStore,
      collectionStore,
      modalStore,
      router,
      loadBrandListRes: await brandStore.loadBrandsList(),
      loadCollectionListRes: await collectionStore.loadCollectionList(),
      loadCategoryListRes: await categoriesStore.loadCategoriesList(),
      loadSelectedRes: await productStore.loadSelectedProduct(
        parseInt(route.params.id.toString()),
      ),
    };
  },
  created() {
    this.loadSelectedRes.toastIfError(this.$toast, this.$nextTick);
    this.loadBrandListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCollectionListRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCategoryListRes.toastIfError(this.$toast, this.$nextTick);

    const vendorCodeValidateRule = new ValidateRule().skipIfNull().required();
    const brandValidateRule = new ValidateRule().skipIfNull().required();
    const nameValidateRule = new ValidateRule().skipIfNull().required();
    const descriptionValidateRule = new ValidateRule().skipIfNull().required();
    const distributorPriceValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);
    const professionalPriceValidateRule = new ValidateRule()
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
    const linkValidateRule = new ValidateRule().skipIfNull().required();

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
    confirmDeletion() {
      this.modalStore.show({
        title: "Confirm deletion",
        text: this.modalText,
        disclaimer: this.localize(
          "thisActionCannotBeUndoneThisProductDataWillBeLost",
        ),
      });
    },
    closeModal() {
      this.modalStore.hide();
    },
    async removeAndCloseModal() {
      const removed = await this.productStore.remove(this.id);
      if (removed.success) {
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Product is removed",
          life: 3000,
        });
        this.modalStore.hide();
        await this.productStore.loadProductList();
        this.router.push({ name: "products" });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
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
    async fileUploaded(files: File[]) {
      const file = files[0];
      const encoded = await encoderUtil.encode(file);
      if (encoded == null) {
        this.$toast.add({
          severity: "error",
          summary: "Failed upload",
          detail: "Photo uploading failed",
          life: 3000,
        });
        return;
      }
      this.photoBase64 = encoded || "";
      this.photoName = file.name;
    },
    startEditing() {
      this.editing = true;
      this.newCategory = String(this.categoryId);
      this.newBrand = this.selectedProduct.brand;
      this.newCollection = this.selectedProduct.collection;
      this.newProductName = this.productName;
      this.newSku = this.sku;
      this.newColor = this.color;
      this.newLink = this.link;
      this.newQuantity = this.quantity;
      this.newDescription = this.productDescription;
      this.newAmountInBox = this.quantityPerPackage;
      this.newDistributionPrice = this.distributionPrice;
      this.newProfessionalPrice = this.professionalPrice;
      this.newDefaultPrice = this.defaultPrice;
      this.newExpirationDate = this.expirationDate;
    },
    cancelEditing() {
      this.editing = false;
    },
    getNullIfNoChange(newValue, originalValue) {
      return newValue == originalValue ? null : newValue;
    },
    showNotFoundToast(type) {
      this.$toast.add({
        severity: "error",
        summary: "Creation failed",
        detail: `${type} not found`,
        life: 3000,
      });
    },
    async saveChanges() {
      const brandId = this.newBrand ? this.newBrand.id : null;
      const collectionId = this.newCollection ? this.newCollection.id : null;
      const categoryId = parseInt(String(this.newCategory));
      const expirationDate = parseInt(this.newExpirationDate) * 24 * 60 * 1000;
      const data = new ProductUpdateDto(
        this.photoBase64,
        this.photoName,
        this.getNullIfNoChange(this.newSku, this.sku),
        this.getNullIfNoChange(brandId, this.brandId),
        this.getNullIfNoChange(this.newProductName, this.productName),
        this.getNullIfNoChange(this.newDescription, this.productDescription),
        this.getNullIfNoChange(
          this.newDistributionPrice,
          this.distributionPrice,
        ),
        this.getNullIfNoChange(
          this.newProfessionalPrice,
          this.professionalPrice,
        ),
        this.getNullIfNoChange(this.newDefaultPrice, this.defaultPrice),
        this.getNullIfNoChange(categoryId, this.categoryId),
        this.getNullIfNoChange(collectionId, this.collectionId),
        this.getNullIfNoChange(this.newColor, this.color),
        this.getNullIfNoChange(this.newAmountInBox, this.quantityPerPackage),
        this.getNullIfNoChange(expirationDate, this.expirationDate),
        this.getNullIfNoChange(this.newLink, this.link),
      );
      loggerUtil.debug(data);
      const validateRes = this.validator.validate(data);
      if (validateRes !== true) {
        loggerUtil.debug(validateRes);
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const result = await this.productStore.updateProduct(this.id, data);

      this.editing = !result.success;
      if (!result.success) {
        const error = result.getError();
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
      } else {
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: `Product successfully updated`,
          life: 3000,
        });
      }
    },
  },
  computed: {
    modalText() {
      return `${this.localize("areYouSureYouWantToDeleteProduct")} "${this.productName}?"`;
    },
    categoryList() {
      return this.categoriesStore.getCategoryList;
    },
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
    brandList() {
      return this.brandStore.getBrandList;
    },
    selectedProduct() {
      return this.productStore.getSelectedProduct || {};
    },
    imageSource() {
      return FilesResolverUtil.getStreamUrl(this.selectedProduct.photo || "");
    },
    productName() {
      return this.selectedProduct.name || "";
    },
    sku() {
      return this.selectedProduct.vendorCode || "";
    },
    brand() {
      if (this.selectedProduct.brand)
        return this.selectedProduct.brand.name || this.localize("noBrand");
      else return this.localize("noBrand");
    },
    brandId() {
      if (this.selectedProduct.brand)
        return this.selectedProduct.brand.id || null;
      else return null;
    },
    link() {
      return this.selectedProduct.link || "";
    },
    quantity() {
      return this.selectedProduct.quantity || "0";
    },
    expirationDate() {
      return (this.selectedProduct.expirationDate || 0) / 1000 / 24 / 60;
    },
    plainExpirationDate() {
      return this.selectedProduct.expirationDate || 0;
    },
    lastTimeOrdered() {
      if (!this.selectedProduct.lastPurchaseDate)
        return this.localize("noInformation");
      const date =
        new Date(parseInt(`${this.selectedProduct.lastPurchaseDate}000`)) || "";
      if (date === "") return date;
      const month =
        date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      return `${date.getFullYear()}-${month}-${day}`;
    },
    lastPriceOrdered() {
      return (
        this.selectedProduct.lastPurchasePrice || this.localize("noInformation")
      );
    },
    costPrice() {
      return this.selectedProduct.costPrice || "";
    },
    status() {
      return this.selectedProduct.status || "";
    },
    category() {
      if (this.selectedProduct.category)
        return this.selectedProduct.category.name || "";
      else return this.localize("noCategory");
    },
    categoryId() {
      if (this.selectedProduct.category)
        return this.selectedProduct.category.id;
      else return null;
    },
    productDescription() {
      return this.selectedProduct.description || "";
    },
    collectionName() {
      if (this.selectedProduct.collection)
        return (
          this.selectedProduct.collection.name || this.localize("noCollection")
        );
      else return this.localize("noCollection");
    },
    collectionId() {
      if (this.selectedProduct.collection)
        return this.selectedProduct.collection.id || null;
      else return null;
    },
    color() {
      return this.selectedProduct.color || "";
    },
    volume() {
      return this.selectedProduct.volume || "";
    },
    size() {
      return this.selectedProduct.size || "";
    },
    quantityPerPackage() {
      return this.selectedProduct.amountInBox || "";
    },
    distributionPrice() {
      return this.selectedProduct.distributorPrice || "";
    },
    distributionPriceWithoutVat() {
      return this.selectedProduct.distributionPriceWithoutVat || "";
    },
    distributionMarkup() {
      return this.selectedProduct.distributionMarkup || "";
    },
    professionalPrice() {
      return this.selectedProduct.professionalPrice || "";
    },
    professionalPriceWithoutVat() {
      return this.selectedProduct.professionalPriceWithoutVat || "";
    },
    professionalMarkup() {
      return this.selectedProduct.professionalMarkup || "";
    },
    defaultPrice() {
      return this.selectedProduct.commonPrice || "";
    },
    defaultPriceWithoutVat() {
      return this.selectedProduct.defaultPriceWithoutVat || "";
    },
    defaultMarkup() {
      return this.selectedProduct.defaultMarkup || "";
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
  width: 100%;
  margin-bottom: 2rem;
  font-size: 32px;
}
.field-heading {
  font-size: 16px;
  color: #4e4e4e;
  font-weight: 500;
  display: flex;
  gap: 1rem;
  min-width: max-content;
  align-items: center;
}
.bottom-numbers {
  font-size: 16px;
  width: 100%;
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
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: 4.5rem;
  font-weight: 800;
  max-height: 2rem;
  margin-top: 0 !important;
  padding-left: 2px;
  padding-right: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
  margin-top: 0.5rem;
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
:deep(.p-panel-header) {
  display: none;
}
:deep(.p-panel) {
  border-top: 1px solid #e5e7eb;
}
</style>
