<template>
  <div class="animate__animated animate__fadeIn">
    <MDBContainer class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol v-if="!editing" class="col-auto">
          <img class="product-img" :src="imageSource" :alt="productName" />
        </MDBCol>
        <MDBCol
          v-else
          class="col-auto animate__animated animate__flipInX animate__faster"
        >
          <div class="product-img">
            <FileUploadComponent @changed="fileUploaded" />
          </div>
        </MDBCol>
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow>
            <MDBCol v-if="!editing">
              <h1 class="product-heading">{{ productName }}</h1>
            </MDBCol>
            <MDBCol
              class="d-flex gap-1 align-items-center mb-3 animate__animated animate__flipInX animate__faster"
              v-else
            >
              <h5 class="field-heading">PRODUCT NAME</h5>
              <MDBInput
                id="product-name-input"
                class="input-wrapper animate__animated animate__fadeIn username-input"
                type="text"
                v-model="newProductName"
              />
            </MDBCol>
            <MDBCol
              v-if="!editing"
              class="d-flex flex-column justify-content-start"
            >
              <MDBBtn @click="startEditing" class="utility-btn" outline="black"
                >EDIT</MDBBtn
              >
            </MDBCol>
            <MDBCol
              class="animate__animated animate__flipInX animate__faster"
              v-else
            >
              <MDBBtn @click="cancelEditing" class="utility-btn" outline="black"
                >CANCEL</MDBBtn
              >
              <MDBBtn @click="saveChanges" class="utility-btn" outline="black"
                >SAVE</MDBBtn
              >
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                SKU
                <span v-if="!editing" class="field-value copy-on">{{
                  sku
                }}</span>
                <MDBInput
                  v-else
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  type="text"
                  v-model="newSku"
                />
              </h5>
              <!--              <img class="sku-img" :src="barcodeImage" alt="Barcode">-->
              <h5 v-if="!editing" class="field-heading">
                BRAND <span class="field-value copy-on">{{ brand }}</span>
              </h5>
              <template v-else>
                <SelectComponent
                  :placeholder="placeholderBrand"
                  class="animate__animated animate__flipInX animate__faster"
                  :items="brandList"
                  v-model="newBrand"
                />
                <DialogComponentTrigger
                  button-text="CREATE"
                  :init-object="initBrandDialog"
                />
              </template>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                LINK
                <a
                  v-if="!editing"
                  target="_blank"
                  :href="link"
                  class="field-value copy-on"
                  >OPEN IN NEW WINDOW</a
                >
                <MDBInput
                  v-else
                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
                  type="text"
                  v-model="newLink"
                />
              </h5>
            </MDBCol>
            <MDBCol class="d-flex flex-column gap-3">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                QUANTITY <span class="field-value">{{ quantity }}</span>
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                LAST TIME ORDERED
                <span class="field-value">{{ lastTimeOrdered }}</span>
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                LAST PRICE ORDERED
                <span class="field-value">{{ lastPriceOrdered }}</span>
              </h5>
              <!--              <h5 class="field-heading">COST PRICE <span class="field-value">{{ costPrice }}</span></h5>-->
              <!--              <h5 class="field-heading">STATUS <span class="field-value">{{ status }}</span></h5>-->
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <MDBContainer class="description-section" fluid>
      <h5 v-if="!editing" class="field-heading">{{ category }}</h5>
      <template v-else>
        <TreeDropdownComponent
          :placeholder="placeholderCategory"
          class="animate__animated animate__flipInX animate__faster"
          :nodes="categoryList"
          v-model="newCategory"
        />
        <DialogComponentTrigger
          button-text="CREATE"
          :init-object="initCategoryDialog"
        />
      </template>

      <h1 class="product-heading d-flex gap-1 align-items-center">
        Product description
        <span v-if="!editing" class="field-heading collection-name">{{
          collectionName
        }}</span>
        <template v-else>
          <SelectComponent
            :placeholder="placeholderCollection"
            class="animate__animated animate__flipInX animate__faster"
            :items="collectionList"
            v-model="newCollection"
          />
          <DialogComponentTrigger
            button-text="CREATE"
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
          NEW COLOR NAME
          <MDBInput
            class="input-wrapper animate__animated animate__fadeIn username-input"
            type="text"
            v-model="newColor"
          />
        </h5>
      </h1>
      <p v-if="!editing" class="description">{{ productDescription }}</p>
      <textarea
        v-else
        class="animate__animated animate__flipInX animate__faster username-input"
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
          <h5 class="field-heading">
            QUANTITY PER PACKAGE
            <span v-if="!editing" class="field-value">{{
              quantityPerPackage
            }}</span>
            <MDBInput
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="newAmountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            DISTRIBUTION PRICE
            <span v-if="!editing" class="field-value">{{
              distributionPrice
            }}</span>
            <MDBInput
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="newDistributionPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ distributionPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ distributionMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            PROFESSIONAL PRICE
            <span v-if="!editing" class="field-value">{{
              professionalPrice
            }}</span>
            <MDBInput
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="newProfessionalPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ professionalPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ professionalMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            DEFAULT PRICE
            <span v-if="!editing" class="field-value">{{ defaultPrice }}</span>
            <MDBInput
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="newDefaultPrice"
            />
          </h5>
          <!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ defaultPriceWithoutVat }}</span></h5>-->
          <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ defaultMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            EXPIRATION DATE
            <span v-if="!editing" class="field-value">{{
              expirationDate
            }}</span>
            <MDBInput
              v-else
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
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
import { useRoute } from "vue-router";
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

export default {
  name: "SingleProductView",
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
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup() {
    const productStore = useProductsStore();
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoriesStore = useCategoriesStore();
    const route = useRoute();

    await brandStore.loadBrandsList();
    await categoriesStore.loadCategoriesList();
    await collectionStore.loadCollectionList();

    await productStore.loadSelectedProduct(
      parseInt(route.params.id.toString()),
    );

    return {
      productStore,
      brandStore,
      categoriesStore,
      collectionStore,
    };
  },
  data() {
    return {
      placeholderBrand: "Select a brand",
      placeholderCategory: "Select a category",
      placeholderCollection: "Select a collection",
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
        methodOnSave: this.handleCategoryUpdate,
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
      },
      initBrandDialog: {
        header: "Create a brand",
        inputName: "Brand name",
        model: new BrandModel(),
        methodOnSave: this.handleBrandUpdate,
        methodOnClose: () => loggerUtil.debug("workds"),
      },
      initCollectionDialog: {
        header: "Create a collection",
        inputName: "Collection name",
        methodOnSave: this.handleCollectionUpdate,
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
      },
    };
  },
  created() {
    this.initCategoryDialog.selectItems = this.categoryList;
  },
  methods: {
    async handleCategoryUpdate() {
      await this.categoriesStore.loadCategoriesList();
    },
    async handleBrandUpdate() {
      await this.brandStore.loadBrandsList();
    },
    async handleCollectionUpdate() {
      await this.collectionStore.loadCollectionList();
    },
    async fileUploaded(files: File[]) {
      const file = files[0];
      const encoded = await encoderUtil.encode(file);
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
    async saveChanges() {
      const brandId = this.newBrand ? this.newBrand.id : null;
      const collectionId = this.newCollection ? this.newCollection.id : null;
      const categoryId = parseInt(String(this.newCategory));
      const expirationDate = parseInt(this.newExpirationDate) * 24 * 60 * 1000;

      const result = await this.productStore.updateProduct(
        this.id,
        new ProductUpdateDto(
          this.photoBase64,
          this.photoName,
          this.newSku,
          brandId,
          this.newProductName,
          this.newDescription,
          this.newDistributionPrice,
          this.newProfessionalPrice,
          this.newDefaultPrice,
          categoryId,
          collectionId,
          this.newColor,
          this.newAmountInBox,
          expirationDate,
          this.newLink,
        ),
      );
      this.editing = !result.success;
      //TODO: Check for errors
    },
  },
  computed: {
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
        return this.selectedProduct.brand.name || "No brand";
      else return "No brand";
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
      if (!this.selectedProduct.lastPurchaseDate) return "No information";
      const date =
        new Date(parseInt(`${this.selectedProduct.lastPurchaseDate}000`)) || "";
      if (date === "") return date;
      const month =
        date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      return `${date.getFullYear()}-${month}-${day}`;
    },
    lastPriceOrdered() {
      return this.selectedProduct.lastPurchasePrice || "No information";
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
      else return "No category";
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
        return this.selectedProduct.collection.name || "No collection";
      else return "No collection";
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
  margin-bottom: 2rem;
  font-size: 32px;
  margin-bottom: 0.6rem;
}
.field-heading {
  font-size: 16px;
  color: #4e4e4e;
  font-weight: 500;
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
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
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
</style>
