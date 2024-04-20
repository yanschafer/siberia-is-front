<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <ScrollPanel
    style="height: 80vh; width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <template v-if="!editing">
      <Panel class="animate__animated animate__fadeIn">
        <MDBRow class="d-flex flex-row gap-5 header-row">
          <MDBCol class="col-auto">
            <img
              id="product-image"
              class="product-img"
              :src="imageSource"
              :alt="productName"
            />
          </MDBCol>
          <MDBCol class="product-name-col">
            <h1 class="product-heading">{{ productName }}</h1>
            <MDBRow class="d-flex flex-row flex-nowrap">
              <MDBCol class="d-flex flex-column gap-3 col-auto">
                <h5 class="field-heading d-flex gap-1 align-items-center">
                  {{ localize("skuCapslock") }}
                  <span class="field-value copy-on">{{ sku }}</span>
                </h5>
                <h5 class="field-heading d-flex gap-1 align-items-center">
                  EAN
                  <span class="field-value copy-on">{{ ean }}</span>
                </h5>
                <h5 class="field-heading d-flex gap-1 align-items-center">
                  BARCODE
                  <span class="field-value copy-on">{{ barcode }}</span>
                </h5>
                <h5 class="field-heading">
                  {{ localize("brandCapslock") }}
                  <span class="field-value copy-on">{{ brand }}</span>
                </h5>
                <h5 class="field-heading d-flex gap-1 align-items-center">
                  {{ localize("linkCapslock") }}
                  <a target="_blank" :href="link" class="field-value copy-on">{{
                    localize("openInNewWindowCapslock")
                  }}</a>
                </h5>
              </MDBCol>
              <MDBCol class="d-flex flex-column gap-3">
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

          <MDBCol
            v-if="!editing && editBtnAvailable"
            class="d-flex flex-column justify-content-start gap-2"
          >
            <MDBRow
              style="padding-left: 12px; margin-bottom: 1rem"
              class="d-flex d-flex justify-content-start gap-2"
            >
              <MDBBtn
                @click="startEditing"
                class="utility-btn"
                outline="black"
                >{{ localize("editCapslock", "default") }}</MDBBtn
              >
              <MDBBtn @click="confirmDeletion" class="utility-btn btn-danger">{{
                localize("deleteCapslock", "default")
              }}</MDBBtn>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </Panel>
      <MDBContainer class="description-section" fluid>
        <h5 class="field-heading">{{ category }}</h5>
        <h1
          class="product-heading d-flex gap-1 align-items-center mb-3 mt-3 gap-2"
        >
          {{ localize("productDescription") }}
          <span class="field-heading collection-name">{{
            collectionName
          }}</span>

          <span class="field-heading separator">|</span>
          <span class="field-heading color-name">{{ color }}</span>
        </h1>
        <p class="description">{{ productDescription }}</p>
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
              <span class="field-value">{{ quantityPerPackage }}</span>
            </h5>
          </MDBCol>
          <MDBCol>
            <h5
              class="bottom-numbers d-flex flex-column justify-content-start gap-2"
            >
              {{ localize("distributionPriceCapslock") }}
              <span class="field-value">{{ distributionPercent }}</span>
            </h5>
            <h5 class="field-heading">
              DISTRIBUTION PRICE
              <span class="field-value">{{ distributionPrice }}</span>
            </h5>
            <!--          <h5 class="field-heading">-->
            <!--            MARKUP <span class="field-value">{{ 0.0 }}</span>-->
            <!--          </h5>-->
          </MDBCol>
          <MDBCol>
            <h5
              class="bottom-numbers d-flex flex-column justify-content-start gap-2"
            >
              {{ localize("professionalPriceCapslock") }}
              <span class="field-value">{{ professionalPercent }}</span>
            </h5>
            <h5 class="field-heading">
              PROFESSIONAL PRICE
              <span class="field-value">{{ professionalPrice }}</span>
            </h5>
            <!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ professionalMarkup }}</span></h5>-->
          </MDBCol>
          <MDBCol>
            <h5
              class="bottom-numbers d-flex flex-column justify-content-start gap-2"
            >
              {{ localize("defaultPriceCapslock") }}
              <span class="field-value">{{ defaultPrice }}</span>
            </h5>
          </MDBCol>
          <MDBCol>
            <h5
              class="bottom-numbers d-flex flex-column justify-content-start gap-2"
            >
              OFFERTA PRICE
              <span class="field-value">{{ offertaPrice }}</span>
            </h5>
          </MDBCol>
          <MDBCol>
            <h5
              class="bottom-numbers d-flex flex-column justify-content-start gap-2"
            >
              {{ localize("expirationDateCapslock") }}
              <span class="field-value">{{ expirationDate }}</span>
            </h5>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </template>
    <template v-else>
      <Panel class="animate__animated animate__fadeIn">
        <MDBRow class="d-flex flex-row gap-5 header-row">
          <MDBCol class="d-flex flex-column justify-content-center">
            <ProductsForm @save="handleSuccessUpdate" @cancel="handleCancel" />
          </MDBCol>
        </MDBRow>
      </Panel>
    </template>
  </ScrollPanel>
</template>
<script lang="ts">
import FileUpload from "primevue/fileupload";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import FileUploadComponent from "@/components/Inputs/FileUploadComponent.vue";
import CascadeSelect from "primevue/cascadeselect";
import FilesResolverUtil from "@/utils/files-resolver.util";
import { useProductsStore } from "@/stores/products.store";
import { useRoute, useRouter } from "vue-router";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";
import { useModalStore } from "@/stores/modal.store";
import PrintUtil from "@/utils/localization/print.util";
import InputText from "primevue/inputtext";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";
import Panel from "primevue/panel";
import ScrollPanel from "primevue/scrollpanel";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import ProductDto from "@/api/modules/product/dto/product.dto";
import MediaMiniModalComponent from "@/views/Media/MediaMiniModalComponent.vue";
import ProductsForm from "@/views/Products/ProductsForm.vue";
import { useProductFormStore } from "@/stores/components/product-form.store";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import { useCollectionStore } from "@/stores/collection.store";

export default {
  name: "SingleProductView",
  components: {
    ProductsForm,
    MediaMiniModalComponent,
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
    ScrollPanel,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      createButtonText: this.localize("createCapslock", "default"),
      editing: false,
    };
  },
  async setup() {
    const productFormStore = useProductFormStore();
    const authCheckStore = useAuthCheckStore();
    const productStore = useProductsStore();
    const brandStore = useBrandStore();
    const categoryStore = useCategoriesStore();
    const collectionStore = useCollectionStore();
    const modalStore = useModalStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([
      productStore.loadSelectedProduct(parseInt(route.params.id.toString())),
      brandStore.loadBrandsList(),
      collectionStore.loadCollectionList(),
      categoryStore.loadCategoriesList(),
    ]);

    return {
      authCheckStore,
      productFormStore,
      productStore,
      modalStore,
      router,
      loaders,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    const stringValidateRule = new ValidateRule().skipIfNull().required();
    const positiveNumberValidateRule = new ValidateRule()
      .skipIfNull()
      .required()
      .setMin(0);

    const brandValidateRule = new ValidateRule().skipIfNull().required();
    const categoryValidateRule = new ValidateRule().skipIfNull().required();
    const collectionValidateRule = new ValidateRule().skipIfNull().required();

    const validator = new ValidatorUtil()
      .addRule("vendorCode", stringValidateRule)
      .addRule("eanCode", stringValidateRule)
      .addRule("barcode", stringValidateRule)
      .addRule("brand", brandValidateRule)
      .addRule("name", stringValidateRule)
      .addRule("description", stringValidateRule)
      .addRule("commonPrice", positiveNumberValidateRule)
      .addRule("distributorPercent", positiveNumberValidateRule)
      .addRule("professionalPercent", positiveNumberValidateRule)
      .addRule("category", categoryValidateRule)
      .addRule("collection", collectionValidateRule)
      .addRule("color", stringValidateRule)
      .addRule("amountInBox", positiveNumberValidateRule)
      .addRule("expirationDate", positiveNumberValidateRule)
      .addRule("link", stringValidateRule);

    this.productFormStore.initUpdateProcess(this.selectedProduct, validator);
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    confirmDeletion() {
      this.modalStore.show({
        title: this.localize("confirmDeletion", "default"),
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
          summary: this.localize("success", "storehouses"),
          detail: this.localize("productIsRemoved"),
          life: 3000,
        });
        this.modalStore.hide();
        await this.productStore.loadProductList();
        this.router.push({ name: "products" });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
    async startEditing() {
      this.editing = true;
      this.productFormStore.data.brand = this.selectedProduct.brand;
      this.productFormStore.data.collection = this.selectedProduct.collection;
      this.productFormStore.data.category = this.categoryId;
    },
    handleCancel() {
      this.editing = false;
    },
    showNotFoundToast(type) {
      this.$toast.add({
        severity: "error",
        summary: this.localize("creationFailed"),
        detail: `${type} ${this.localize("notFound")}`,
        life: 3000,
      });
    },
    async handleSuccessUpdate() {
      const data = this.productFormStore.data;
      const productUpdateDto = new ProductUpdateDto(
        data.photo,
        data.vendorCode,
        data.eanCode,
        data.barcode,
        data.brand,
        data.name,
        data.description,
        data.distributorPercent,
        data.professionalPercent,
        data.commonPrice,
        data.offertaPrice,
        data.category,
        data.collection,
        data.color,
        data.amountInBox,
        data.expirationDate,
        data.link,
      );
      const result = await this.productStore.updateProduct(
        this.id,
        productUpdateDto,
      );

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
          summary: this.localize("success", "storehouses"),
          detail: this.localize("productSuccessfullyUpdated"),
          life: 3000,
        });
      }
    },
  },
  computed: {
    modalText() {
      return `${this.localize("areYouSureYouWantToDeleteProduct")} "${this.productName}?"`;
    },
    selectedProduct(): ProductDto {
      return this.productStore.getSelectedProduct || {};
    },
    imageSource() {
      if (this.selectedProduct.photo && this.selectedProduct.photo.length != 0)
        return FilesResolverUtil.getStreamUrl(
          this.selectedProduct.photo[0] || "",
        );
      else return FilesResolverUtil.getStreamUrl("fileNotFound.jpeg");
    },
    productName() {
      return this.selectedProduct.name || "";
    },
    sku() {
      return this.selectedProduct.vendorCode || "";
    },
    ean() {
      return this.selectedProduct.eanCode || "";
    },
    barcode() {
      return this.selectedProduct.barcode || "";
    },
    brand() {
      if (this.selectedProduct.brand)
        return this.selectedProduct.brand.name || this.localize("noBrand");
      else return this.localize("noBrand");
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
      let percent, common;
      if (!this.editing) {
        percent = this.selectedProduct.distributorPercent || 0.0;
        common = this.selectedProduct.commonPrice || 0.0;
      } else {
        percent = this.newDistributionPercent;
        common = this.newDefaultPrice;
      }

      return (percent / 100) * common;
    },
    distributionPercent() {
      return this.selectedProduct.distributorPercent || "";
    },
    professionalPrice() {
      let percent, common;
      if (!this.editing) {
        percent = this.selectedProduct.professionalPercent || 0.0;
        common = this.selectedProduct.commonPrice || 0.0;
      } else {
        percent = this.newProfessionalPercent;
        common = this.newDefaultPrice;
      }

      return (percent / 100) * common;
    },
    professionalPercent() {
      return this.selectedProduct.professionalPercent || "";
    },
    defaultPrice() {
      return this.selectedProduct.commonPrice || "";
    },
    offertaPrice() {
      return this.selectedProduct.offertaPrice || "";
    },
    editBtnAvailable() {
      return this.authCheckStore.getHasAccessToProductsManaging;
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
