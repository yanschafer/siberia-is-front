<template>
  <div class="animate__animated animate__fadeIn">
    <MDBContainer class="animate__animated animate__fadeIn" fluid>
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
              <h5 class="field-heading">{{ localize("productNameCapslock") }}</h5>
              <MDBInput
                id="product-name-input"
                class="input-wrapper animate__animated animate__fadeIn username-input"
                type="text"
                v-model="name"
              />
            </MDBCol>
            <MDBCol class="animate__animated animate__flipInX animate__faster">
              <MDBBtn @click="cancel" class="utility-btn" outline="black"
                >{{ localize("cancelCapslock", "default") }}</MDBBtn
              >
              <MDBBtn @click="create" class="utility-btn" outline="black"
                >{{ localize("saveCapslock", "default") }}</MDBBtn
              >
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                  {{ localize("skuCapslock") }}
                <MDBInput
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  type="text"
                  v-model="vendorCode"
                />
              </h5>
              <SelectComponent
                :placeholder="placeholderBrand"
                class="animate__animated animate__flipInX animate__faster"
                :items="brandList"
                v-model="brand"
              />
              <DialogComponentTrigger
                :button-text="createButtonText"
                :init-object="initBrandDialog"
              />
              <h5 class="field-heading d-flex gap-1 align-items-center">
                  {{ localize("linkCapslock") }}
                <MDBInput
                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
                  type="text"
                  v-model="link"
                />
              </h5>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <MDBContainer class="description-section" fluid>
      <TreeDropdownComponent
        :placeholder="placeholderCategory"
        class="animate__animated animate__flipInX animate__faster"
        :nodes="categoryList"
        v-model="category"
      />
      <DialogComponentTrigger
        :button-text="createButtonText"
        :init-object="initCategoryDialog"
      />
      <h1 class="product-heading d-flex gap-1 align-items-center">
        Product description
        <SelectComponent
          :placeholder="placeholderCollection"
          class="animate__animated animate__flipInX animate__faster"
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
          <MDBInput
            class="input-wrapper animate__animated animate__fadeIn username-input"
            type="text"
            v-model="color"
          />
        </h5>
      </h1>
      <textarea
        class="animate__animated animate__flipInX animate__faster username-input"
        id="description"
        type="textarea"
        v-model="description"
      />
      <MDBInput
        class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
        type="text"
        v-model="expirationDate"
      />
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
          <h5 class="field-heading">
              {{ localize("quantityPerPackageCapslock") }}
            <MDBInput
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="amountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
              {{ localize("distributionPriceCapslock") }}
            <MDBInput
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="distributorPrice"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("professionalPriceCapslock") }}
            <MDBInput
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
              v-model="professionalPrice"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("defaultPriceCapslock") }}
            <MDBInput
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              type="text"
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
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import EncoderUtil from "@/utils/encoder.util";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import DialogComponentTrigger from "@/components/Elements/DialogComponentTrigger.vue";
import loggerUtil from "@/utils/logger/logger.util";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CategoryModel from "@/api/modules/category/models/category.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import PrintUtil from "@/utils/localization/print.util";
import {th} from "vuetify/locale";

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
    const router = useRouter();

    await brandStore.loadBrandsList();
    await collectionStore.loadCollectionList();
    await categoriesStore.loadCategoriesList();

    // await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));
    return {
      productStore,
      brandStore,
      categoriesStore,
      collectionStore,
      router,
    };
  },
  data() {
    return {
      createButtonText: this.localize("createCapslock", "default"),
      placeholderCategory: this.localize("selectACategory"),
      placeholderBrand: this.localize("selectABrand"),
      placeholderCollection: this.localize("selectACollection"),
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
        methodOnSave: this.handleCategoryUpdate,
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
      },
      initBrandDialog: {
        header: this.localize("createABrand"),
        inputName: this.localize("brandName"),
        model: new BrandModel(),
        methodOnSave: this.handleBrandUpdate,
        methodOnClose: () => loggerUtil.debug("workds"),
      },
      initCollectionDialog: {
        header: this.localize("createACollection"),
        inputName: this.localize("collectionName"),
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
    localize(key, module = "products") {
          return PrintUtil.localize(key, module);
    },
    async fileChanged(files: File[]) {
      const file = files[0];
      const encoded = await EncoderUtil.encode(file);
      if (encoded == null) return;
      this.photoBase64 = encoded;
      this.photoName = file.name;
    },
    async handleCategoryUpdate() {
      await this.categoriesStore.loadCategoriesList();
    },
    async handleBrandUpdate() {
      await this.brandStore.loadBrandsList();
    },
    async handleCollectionUpdate() {
      await this.collectionStore.loadCollectionList();
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
      const creationResult = await this.productStore.create(newProductData);
      //TODO: Check for errors
      if (creationResult.success) {
        this.router.push({
          name: "Product details",
          params: { id: creationResult.getData().id.toString() },
        });
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
.p-multiselect-label .p-placeholder{ }
</style>