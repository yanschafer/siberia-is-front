<template>
  <div class="animate__animated animate__fadeIn">
    <MDBContainer class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol v-if="!editing" class="col-auto">
          <img class="product-img" :src="imageSource" :alt="productName">
        </MDBCol>
        <MDBCol v-else class="col-auto animate__animated animate__flipInX animate__faster">
          <div class="product-img">
<!--            <FileUploadComponent />-->
            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" />
          </div>
        </MDBCol>
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow>
            <MDBCol v-if="!editing">
              <h1 class="product-heading">{{ productName }}</h1>
            </MDBCol>
            <MDBCol class="d-flex gap-1 align-items-center mb-3 animate__animated animate__flipInX animate__faster" v-else>
              <h5 class="field-heading">PRODUCT NAME</h5>
              <MDBInput id="product-name-input" class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newProductName" />
            </MDBCol>
            <MDBCol v-if="!editing" class="d-flex flex-column justify-content-start">
              <MDBBtn @click="startEditing" class="utility-btn" outline="black">EDIT</MDBBtn>
            </MDBCol>
            <MDBCol class="animate__animated animate__flipInX animate__faster" v-else>
              <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">CANCEL</MDBBtn>
              <MDBBtn @click="saveChanges" class="utility-btn" outline="black">SAVE</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading d-flex gap-1 align-items-center">SKU <span v-if="!editing" class="field-value copy-on">{{ sku }}</span><MDBInput v-else class="animate__animated animate__flipInX animate__faster input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newSku" /></h5>
<!--              <img class="sku-img" :src="barcodeImage" alt="Barcode">-->
              <h5 v-if="!editing" class="field-heading">BRAND <span class="field-value copy-on">{{ brand }}</span></h5>
              <SelectComponent class="animate__animated animate__flipInX animate__faster" v-else :items="brandList" />
              <h5 class="field-heading d-flex gap-1 align-items-center">LINK <a v-if="!editing" target="_blank" :href="link" class="field-value copy-on">OPEN IN NEW WINDOW</a>
                <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newLink" />
              </h5>
            </MDBCol>
            <MDBCol class="d-flex flex-column gap-3">
              <h5 class="field-heading d-flex gap-1 align-items-center">QUANTITY <span v-if="!editing" class="field-value">{{ quantity }}</span>
                <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newQuantity" />
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">LAST TIME ORDERED <span class="field-value">{{ lastTimeOrdered }}</span>
              </h5>
              <h5 class="field-heading d-flex gap-1 align-items-center">LAST PRICE ORDERED <span class="field-value">{{ lastPriceOrdered }}</span>
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
      <TreeDropdownComponent v-else class="animate__animated animate__flipInX animate__faster" :nodes="categoriesList" />
      <h1 class="product-heading d-flex gap-1 align-items-center">Product description <span v-if="!editing" class="field-heading collection-name">{{ collectionName }}</span>
        <SelectComponent class="animate__animated animate__flipInX animate__faster" v-else :items="brandList" />
        <span class="field-heading separator">|</span> <span v-if="!editing" class="field-heading color-name">{{ color }}</span> <h5 v-else class="animate__animated animate__flipInX animate__faster field-heading d-flex gap-1 align-items-center mb-0">NEW COLOR NAME <MDBInput class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newColor" /></h5></h1>
      <p v-if="!editing" class="description">{{ productDescription }}</p>
      <textarea v-else class="animate__animated animate__flipInX animate__faster username-input" id="description" type="textarea" v-model="newDescription" />
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
<!--          <h5 class="field-heading">VOLUME <span class="field-value">{{ volume }}</span></h5>-->
<!--          <h5 class="field-heading">SIZE <span class="field-value">{{ size }}</span></h5>-->
          <h5 class="field-heading">QUANTITY PER PACKAGE <span v-if="!editing" class="field-value">{{ quantityPerPackage }}</span>
            <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newQuantityPerPackage" />
          </h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">DISTRIBUTION PRICE <span v-if="!editing" class="field-value">{{ distributionPrice }}</span>
            <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newDistributionPrice" />
          </h5>
<!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ distributionPriceWithoutVat }}</span></h5>-->
<!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ distributionMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">PROFESSIONAL PRICE <span v-if="!editing" class="field-value">{{ professionalPrice }}</span>
            <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newProfessionalPrice" />
          </h5>
<!--          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ professionalPriceWithoutVat }}</span></h5>-->
<!--          <h5 class="field-heading">MARKUP <span class="field-value">{{ professionalMarkup }}</span></h5>-->
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">DEFAULT PRICE <span v-if="!editing" class="field-value">{{ defaultPrice }}</span>
            <MDBInput v-else class="input-wrapper animate__animated animate__flipInX animate__faster username-input" type="text" v-model="newDefaultPrice" />
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
import CascadeSelect from 'primevue/cascadeselect';
import FilesResolverUtil from "@/utils/files-resolver.util";
import { useProductsStore } from "@/stores/products.store";
import { useRoute } from "vue-router";
import { useBrandStore } from "@/stores/brand.store";
import { useCategoriesStore } from "@/stores/categories.store";
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import TreeDropdownComponent from "@/components/Elements/TreeDropdownComponent.vue";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";


export default {
  name: 'SingleProductView',
  components: {FileUpload, TreeDropdownComponent, SelectComponent, CascadeSelect, MDBInput, FileUploadComponent, MDBContainer, MDBRow, MDBCol, MDBBtn },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup() {
    const productStore = useProductsStore();
    const brandStore = useBrandStore();
    const categoriesStore = useCategoriesStore();
    const route = useRoute();

    await brandStore.loadBrandsList()
    await categoriesStore.loadCategoriesList();



    await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));

    return {
      productStore,
      brandStore,
      categoriesStore
    };
  },
  data: () => ({
    editing: false,
    originalImageSource: '',
    newImageSource: '',
    originalProductName: '',
    newProductName: '',
    originalSku: '',
    newSku: '',
    originalLink: '',
    newLink: '',
    originalQuantity: '',
    newQuantity: '',
    originalColor: '',
    newColor: '',
    originalProductDescription: '',
    newDescription: '',
    originalQuantityPerPackage: '',
    newQuantityPerPackage: '',
    originalDistributionPrice: '',
    newDistributionPrice: '',
    originalProfessionalPrice: '',
    newProfessionalPrice: '',
    originalDefaultPrice: '',
    newDefaultPrice: '',
    originalStatus: '',
    newStatus: '',
    originalBrand: '',
    newBrand: '',
    originalCategories: [],
    newCategories: [],
    originalLastTimeOrdered: '',
    newLastTimeOrdered: '',
    originalLastPriceOrdered: '',
    newLastPriceOrdered: '',
    originalCostPrice: '',
    newCostPrice: '',

  }),
  methods: {
    async uploadImage() {
      return new Promise<string>((resolve) => {
        const fileUploadRef = this.$refs.fileUpload;

        if (fileUploadRef) {
          const input = fileUploadRef.$el.querySelector('input[type="file"]');
          const file = input?.files?.[0];

          if (file) {
            const reader = new FileReader();

            reader.onloadend = function () {
              const base64data = reader.result as string;
              resolve(base64data.split(',')[1]); // Извлечение строки base64 из data URL
            };

            reader.readAsDataURL(file);
          } else {
            resolve('');
          }
        } else {
          resolve('');
        }
      });
    },
    customBase64Uploader(event) {
      const processFile = async () => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
          const base64data = reader.result;
        };
      };
      processFile();
    },
    startEditing() {
      this.editing = true;
      this.originalImageSource = this.imageSource;
      this.newImageSource = this.imageSource;
      this.originalProductName = this.productName;
      this.newProductName = this.productName;
      this.originalSku = this.sku;
      this.newSku = this.sku;
      this.originalColor = this.color;
      this.newColor = this.color;
      this.originalLink = this.link;
      this.newLink = this.link;
      this.originalQuantity = this.quantity;
      this.newQuantity = this.quantity;
      this.originalProductDescription = this.productDescription;
      this.newDescription = this.productDescription;
      this.originalQuantityPerPackage = this.quantityPerPackage;
      this.newQuantityPerPackage = this.quantityPerPackage;
      this.originalDistributionPrice = this.distributionPrice;
      this.newDistributionPrice = this.distributionPrice;
      this.originalProfessionalPrice = this.professionalPrice;
      this.newProfessionalPrice = this.professionalPrice;
      this.originalDefaultPrice = this.defaultPrice;
      this.newDefaultPrice = this.defaultPrice;
    },
    async saveChanges() {
      const base64Image = await this.uploadImage();
      const result = await this.productStore.updateProduct(this.id, new ProductUpdateDto (
          base64Image,
          this.newImageSource,
          this.newColor,
          this.newProductName,
          this.newSku,
          this.newLink,
          this.newQuantity,
          this.newDescription,
          this.newQuantityPerPackage,
          this.newDistributionPrice,
          this.newProfessionalPrice,
          this.newDefaultPrice
      ));
      this.editing = !result.success
      //TODO: Check for errors
    },
  },
  computed: {
    async base64Image() {
      return await this.uploadImage();
    },
    categoriesList() {
      return this.categoriesStore.getCategoriesList()
    },
    brandList() {
      return this.brandStore.getBrandList()
    },
    selectedProduct() {
      return this.productStore.getSelectedProduct || {}
    },
    imageSource() {
      return FilesResolverUtil.getStreamUrl(this.selectedProduct.photo || '');
    },
    productName() {
      return this.selectedProduct.name || '';
    },
    sku() {
      return this.selectedProduct.vendorCode || '';
    },
    brand() {
      return this.selectedProduct.brand.name || '';
    },
    link() {
      return this.selectedProduct.link || '';
    },
    quantity() {
      return this.selectedProduct.quantity || '';
    },
    lastTimeOrdered() {
      return this.selectedProduct.lastTimeOrdered || '';
    },
    lastPriceOrdered() {
      return this.selectedProduct.lastPriceOrdered || '';
    },
    costPrice() {
      return this.selectedProduct.costPrice || '';
    },
    status() {
      return this.selectedProduct.status || '';
    },
    category() {
      return this.selectedProduct.category.name || '';
    },
    productDescription() {
      return this.selectedProduct.description || '';
    },
    collectionName() {
      return this.selectedProduct.collection.name || '';
    },
    color() {
      return this.selectedProduct.color || '';
    },
    volume() {
      return this.selectedProduct.volume || '';
    },
    size() {
      return this.selectedProduct.size || '';
    },
    quantityPerPackage() {
      return this.selectedProduct.amountInBox || '';
    },
    distributionPrice() {
      return this.selectedProduct.distributorPrice || '';
    },
    distributionPriceWithoutVat() {
      return this.selectedProduct.distributionPriceWithoutVat || '';
    },
    distributionMarkup() {
      return this.selectedProduct.distributionMarkup || '';
    },
    professionalPrice() {
      return this.selectedProduct.professionalPrice || '';
    },
    professionalPriceWithoutVat() {
      return this.selectedProduct.professionalPriceWithoutVat || '';
    },
    professionalMarkup() {
      return this.selectedProduct.professionalMarkup || '';
    },
    defaultPrice() {
      return this.selectedProduct.commonPrice || '';
    },
    defaultPriceWithoutVat() {
      return this.selectedProduct.defaultPriceWithoutVat || '';
    },
    defaultMarkup() {
      return this.selectedProduct.defaultMarkup || '';
    }
  },
}
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
  color: #4E4E4E;
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
  border-bottom: 1px solid #EEE;
  padding-bottom: 2rem;
}
.description {
  width: 100%;
  max-width: 85vw;
}
.description-section {
  border-bottom: 1px solid #EEE;
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
  padding-left: 0!important;
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
  padding-top: 0!important;
}
:deep(.form-control) {
  padding-top: 0.1rem;
}
#description {
  width: 100%;
  max-width: auto!important;
  background: #f8f8f8;
  border: 0;
  border-bottom: 2px solid #565656;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw!important;
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