<template>
  <MediaMiniModalComponent @selected="handleMiniGallerySelection" />
  <div class="animate__animated animate__fadeIn">
    <Panel class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol class="col-auto">
          <!--          <div class="product-img placeholder-img" @click="openMiniGallery">-->
          <!--            <IconUpload color="#bbc3c7" :size="48" stroke-width="2" />-->
          <!--            <p class="upload-text">-->
          <!--              {{ localize("chooseFilesFromGallery", "media") }}-->
          <!--            </p>-->
          <!--          </div>-->
          <SliderUpload :images="imageSource" @upload-new="openMiniGallery" />
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
                :placeholder="placeholders.name"
                v-model="productFormStore.data.name"
              />
            </MDBCol>
            <MDBCol
              class="animate__animated animate__flipInX animate__faster d-flex gap-2"
            >
              <MDBBtn @click="cancel" class="utility-btn" outline="black">{{
                productFormStore.cancelBtnTitle
              }}</MDBBtn>
              <MDBBtn @click="save" class="utility-btn" outline="black">{{
                productFormStore.saveBtnTitle
              }}</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow class="flex-nowrap">
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("skuCapslock") }}
                <InputText
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.vendorCode }"
                  type="text"
                  :placeholder="placeholders.vendorCode"
                  v-model="productFormStore.data.vendorCode"
                />
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                EAN
                <InputText
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.eanCode }"
                  type="text"
                  :placeholder="placeholders.eanCode"
                  v-model="productFormStore.data.eanCode"
                />
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">
                {{ localize("barcode") }}
                <InputText
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.barcode }"
                  type="text"
                  :placeholder="placeholders.barCode"
                  v-model="productFormStore.data.barcode"
                />
              </h5>
            </MDBCol>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-2 align-items-center">
                {{ localize("brandCapslock") }}
                <BrandSelector
                  :init-value="productFormStore.data.brand"
                  :placeholder="placeholders.brand"
                />
              </h5>

              <div class="d-flex flex-row">
                <div
                  class="d-flex flex-column col-auto justify-content-center gap-2"
                >
                  <h5 class="field-heading special-heading d-flex">
                    {{ localize("defaultPriceCapslock") }}
                  </h5>
                </div>
                <InputText
                  class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input"
                  :class="{ 'p-invalid': !validate.commonPrice }"
                  type="text"
                  :placeholder="placeholders.commonPrice"
                  v-model="productFormStore.data.commonPrice"
                />
              </div>
              <h5 class="field-heading">
                {{ localize("extraChargeCapslock") }}
                <span class="field-value">{{
                  localize("noInformation", "products")
                }}</span>
              </h5>
              <!--              <h5 class="field-heading d-flex gap-1 align-items-center">-->
              <!--                {{ localize("linkCapslock") }}-->
              <!--                <InputText-->
              <!--                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"-->
              <!--                  :class="{ 'p-invalid': !validate.link }"-->
              <!--                  type="text"-->
              <!--                  :placeholder="placeholders.link"-->
              <!--                  v-model="productFormStore.data.link"-->
              <!--                />-->
              <!--              </h5>-->
              <!--              <h5 class="field-heading d-flex gap-1 align-items-center">-->
              <!--                <span class="field-heading separator">{{-->
              <!--                  localize("expirationDateCapslock")-->
              <!--                }}</span>-->
              <!--                <InputText-->
              <!--                  class="input-wrapper animate__animated animate__flipInX animate__faster username-input"-->
              <!--                  :class="{ 'p-invalid': !validate.expirationDate }"-->
              <!--                  type="text"-->
              <!--                  :placeholder="placeholders.expirationDate"-->
              <!--                  v-model="productFormStore.data.expirationDatePure"-->
              <!--                />-->
              <!--                &lt;!&ndash; We use expirationDatePure here to replace it without user attention in validate stage &ndash;&gt;-->
              <!--              </h5>-->
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </Panel>
    <MDBContainer class="description-section gap-2" fluid>
      <CategorySelector
        :init-value="productFormStore.data.category"
        :placeholder="placeholders.category"
      />
      <h1 class="product-heading d-flex gap-2 align-items-center mr-2">
        {{ localize("productDescription") }}
        <CollectionSelector
          :init-value="productFormStore.data.collection"
          :placeholder="placeholders.collection"
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
            :placeholder="placeholders.color"
            v-model="productFormStore.data.color"
          />
        </h5>
      </h1>
      <textarea
        class="animate__animated animate__flipInX animate__faster username-input"
        :class="{ 'p-invalid': !validate.description }"
        id="description"
        type="textarea"
        :placeholder="placeholders.description"
        v-model="productFormStore.data.description"
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
              :placeholder="placeholders.amountInBox"
              v-model="productFormStore.data.amountInBox"
            />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("distributionPercentCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.distributorPercent }"
              type="text"
              :placeholder="placeholders.distributionPercent"
              v-model="productFormStore.data.distributorPercent"
            />
          </h5>
          <h5 class="field-heading mt-4">
            {{ localize("professionalPriceCapslock") }}
            <span class="field-value">{{ distributionPrice }}</span>
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("professionalPercentCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.professionalPercent }"
              type="text"
              :placeholder="placeholders.professionalPercent"
              v-model="productFormStore.data.professionalPercent"
            />
          </h5>
          <h5 class="field-heading mt-4">
            {{ localize("professionalPriceCapslock") }}
            <span class="field-value">{{ professionalPrice }}</span>
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">
            {{ localize("offertaPriceCapslock") }}
            <InputText
              class="input-wrapper animate__animated animate__flipInX animate__faster username-input"
              :class="{ 'p-invalid': !validate.offertaPrice }"
              type="text"
              :placeholder="placeholders.offertaPrice"
              v-model="productFormStore.data.offertaPrice"
            />
          </h5>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
</template>

<script lang="ts">
import { IconUpload } from "@tabler/icons-vue";
import MediaMiniModalComponent from "@/views/Media/MediaMiniModalComponent.vue";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import FileUpload from "primevue/fileupload";
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import CascadeSelect from "primevue/cascadeselect";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-vue-ui-kit";
import InputText from "primevue/inputtext";
import Panel from "primevue/panel";
import PrintUtil from "@/utils/localization/print.util";
import { useBrandSelectorStore } from "@/stores/components/brand-selector.store";
import { useCollectionSelectorStore } from "@/stores/components/collection-selector.store";
import { useCategorySelectorStore } from "@/stores/components/category-selector.store";
import { useProductFormStore } from "@/stores/components/product-form.store";
import CategorySelector from "@/components/Inputs/entities/CategorySelector.vue";
import CollectionSelector from "@/components/Inputs/entities/CollectionSelector.vue";
import BrandSelector from "@/components/Inputs/entities/BrandSelector.vue";
import { useMediaModalStore } from "@/stores/media-modal.store";
import loggerUtil from "@/utils/logger/logger.util";
import LoggerUtil from "@/utils/logger/logger.util";
import SliderUpload from "@/views/Media/SliderUpload.vue";
import FilesResolverUtil from "@/utils/files-resolver.util";

export default {
  name: "ProductsForm",
  components: {
    SliderUpload,
    BrandSelector,
    CollectionSelector,
    CategorySelector,
    MediaMiniModalComponent,
    DialogComponentTrigger,
    FileUpload,
    TreeDropdownComponent,
    SelectComponent,
    CascadeSelect,
    MDBInput,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    InputText,
    Panel,
    IconUpload,
  },
  async setup() {
    const brandSelectorStore = useBrandSelectorStore();
    const collectionSelectorStore = useCollectionSelectorStore();
    const categorySelectorStore = useCategorySelectorStore();
    const mediaModalStore = useMediaModalStore();
    const productFormStore = useProductFormStore();

    return {
      brandSelectorStore,
      collectionSelectorStore,
      categorySelectorStore,
      productFormStore,
      mediaModalStore,
    };
  },
  data() {
    return {
      placeholders: {
        vendorCode: this.localize("placeholderVendorCode"),
        eanCode: "EAN",
        barCode: "BARCODE",
        brand: this.localize("selectABrand"),
        name: this.localize("placeholderProductName"),
        description: this.localize("placeholderDescription"),
        distributionPercent: this.localize("placeholderNumber"),
        professionalPercent: this.localize("placeholderNumber"),
        commonPrice: this.localize("placeholderNumber"),
        offertaPrice: this.localize("placeholderNumber"),
        category: this.localize("selectACategory"),
        collection: this.localize("selectACollection"),
        color: this.localize("placeholderColor"),
        amountInBox: this.localize("placeholderNumber"),
        expirationDate: this.localize("placeholderExpirationDate"),
        link: this.localize("placeholderLink"),
      },
      validate: {
        vendorCode: true,
        eanCode: true,
        barcode: true,
        brand: true,
        name: true,
        description: true,
        distributorPercent: true,
        professionalPercent: true,
        commonPrice: true,
        offertaPrice: true,
        category: true,
        collection: true,
        color: true,
        amountInBox: true,
        expirationDate: true,
        link: true,
      },
    };
  },
  emits: ["save", "cancel"],
  computed: {
    distributionPrice() {
      const percent =
        parseFloat(
          `${this.productFormStore.data.distributorPercent}`.replace(",", "."),
        ) || 0;
      const base =
        parseFloat(
          `${this.productFormStore.data.commonPrice}`.replace(",", "."),
        ) || 0;

      const price = base - (percent / 100) * base;

      return Math.round(price * 100) / 100;
    },
    professionalPrice() {
      const percent =
        parseFloat(
          `${this.productFormStore.data.professionalPercent}`.replace(",", "."),
        ) || 0;
      const base =
        parseFloat(
          `${this.productFormStore.data.commonPrice}`.replace(",", "."),
        ) || 0;

      const price = base - (percent / 100) * base;

      return Math.round(price * 100) / 100;
    },
    imageSource() {
      if (
        this.productFormStore.data.photoList &&
        this.productFormStore.data.photoList.length != 0
      )
        return this.productFormStore.data.photoList.map((el) => ({
          itemImageSrc: FilesResolverUtil.getStreamUrl(el || ""),
          thumbnailImageSrc: FilesResolverUtil.getStreamUrl(el || ""),
          alt: el,
          title: `Title ${el}`,
        }));
      else
        return [
          {
            itemImageSrc: FilesResolverUtil.getStreamUrl("fileNotFound.jpeg"),
            thumbnailImageSrc:
              FilesResolverUtil.getStreamUrl("fileNotFound.jpeg"),
            alt: "Not found",
            title: `Title not found`,
          },
        ];
    },
  },
  created() {
    LoggerUtil.debug(this.productFormStore.data);
    if (
      this.productFormStore.data.expirationDate != "" &&
      this.productFormStore.data.expirationDate != null
    )
      this.productFormStore.data.expirationDatePure =
        this.productFormStore.data.expirationDate / 24 / 60 / 1000;
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
    openMiniGallery() {
      this.mediaModalStore.miniGallerySelected =
        this.productFormStore.data.photo || [];
      this.mediaModalStore.showGallery(this.productFormStore.data.photo || []);
    },
    handleMiniGallerySelection() {
      this.productFormStore.data.photoList = [];
      this.productFormStore.data.photo = [];
      this.mediaModalStore.miniGallerySelected.forEach((el) => {
        this.productFormStore.data.photoList.push(el.url);
        this.productFormStore.data.photo.push(el.id);
      });
      LoggerUtil.debug(this.productFormStore.data.photoList);
    },
    clearValidationErrors() {
      this.validate = {
        vendorCode: true,
        eanCode: true,
        barcode: true,
        brand: true,
        name: true,
        description: true,
        distributorPercent: true,
        professionalPercent: true,
        commonPrice: true,
        offertaPrice: true,
        category: true,
        collection: true,
        color: true,
        amountInBox: true,
        expirationDate: true,
        link: true,
      };
    },
    save() {
      this.clearValidationErrors();
      this.productFormStore.data.expirationDate = null;
      // parseInt(this.productFormStore.data.expirationDatePure) *
      // 24 *
      // 60 *
      // 1000;

      if (this.brandSelectorStore.value)
        this.productFormStore.data.brand =
          parseInt(this.brandSelectorStore.value.id) || null;

      if (this.collectionSelectorStore.value)
        this.productFormStore.data.collection =
          parseInt(this.collectionSelectorStore.value.id) || null;

      if (this.categorySelectorStore.value)
        this.productFormStore.data.category =
          parseInt(this.categorySelectorStore.value) || null;

      if (
        this.productFormStore.data.professionalPercent != "" &&
        this.productFormStore.data.professionalPercent != null
      )
        this.productFormStore.data.professionalPercent = parseFloat(
          `${this.productFormStore.data.professionalPercent}`.replace(",", "."),
        );

      if (
        this.productFormStore.data.distributorPercent != "" &&
        this.productFormStore.data.distributorPercent != null
      )
        this.productFormStore.data.distributorPercent = parseFloat(
          `${this.productFormStore.data.distributorPercent}`.replace(",", "."),
        );

      if (
        this.productFormStore.data.offertaPrice != "" &&
        this.productFormStore.data.offertaPrice != null
      )
        this.productFormStore.data.offertaPrice = parseFloat(
          `${this.productFormStore.data.offertaPrice}`.replace(",", "."),
        );

      if (
        this.productFormStore.data.commonPrice != "" &&
        this.productFormStore.data.commonPrice != null
      ) {
        this.productFormStore.data.commonPrice = parseFloat(
          `${this.productFormStore.data.commonPrice}`.replace(",", "."),
        );
      }

      const validateRes = this.productFormStore.validate();
      if (validateRes !== true) {
        loggerUtil.debug(validateRes);
        this.validate = validateRes;
        this.productFormStore.validator.showErrorToast(this.$toast);
        return;
      }

      this.productFormStore.data["photo"] = this.productFormStore.data.photo;

      // this.productFormStore.data.professionalPercent = parseFloat(
      //   `${this.productFormStore.data.professionalPercent}`.replace(",", "."),
      // );
      // this.productFormStore.data.distributorPercent = parseFloat(
      //   `${this.productFormStore.data.distributorPercent}`.replace(",", "."),
      // );
      // this.productFormStore.data.offertaPrice = parseFloat(
      //   `${this.productFormStore.data.offertaPrice}`.replace(",", "."),
      // );
      // this.productFormStore.data.commonPrice = parseFloat(
      //   `${this.productFormStore.data.commonPrice}`.replace(",", "."),
      // );

      this.productFormStore.data.amountInBox = parseInt(
        this.productFormStore.data.amountInBox,
      );

      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
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
}
.separator {
  gap: 0 !important;
  width: max-content;
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
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 0;
  border-bottom: 1px solid rgba(55, 65, 81, 0.17);
  transition: all 0.3s ease-in-out;
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
.placeholder-img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
}
.placeholder-img:hover {
  cursor: pointer;
  opacity: 1;
}
.upload-text {
  font-weight: 600;
  text-align: center;
  color: #bbc3c7;
}
.special-heading {
  display: flex;
  margin-right: 1rem;
}
</style>
