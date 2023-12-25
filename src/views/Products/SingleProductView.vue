<template>
  <div class="animate__animated animate__fadeIn">
    <MDBContainer class="animate__animated animate__fadeIn" fluid>
      <MDBRow class="d-flex flex-row gap-5 header-row">
        <MDBCol class="col-auto">
          <img class="product-img" :src="imageSource" :alt="productName">
        </MDBCol>
        <MDBCol class="d-flex flex-column justify-content-center">
          <MDBRow>
            <MDBCol>
              <h1 class="product-heading">{{ productName }}</h1>
            </MDBCol>
            <MDBCol class="d-flex flex-column justify-content-start">
              <MDBBtn class="utility-btn" outline="black">EDIT</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol class="d-flex flex-column gap-3 col-auto">
              <h5 class="field-heading">SKU <span class="field-value copy-on">{{ sku }}</span></h5>
              <img class="sku-img" :src="barcodeImage" alt="Barcode">
              <h5 class="field-heading">BRAND <span class="field-value copy-on">{{ brand }}</span></h5>
              <h5 class="field-heading">LINK <span class="field-value copy-on">{{ link }}</span></h5>
            </MDBCol>
            <MDBCol class="d-flex flex-column gap-2">
              <h5 class="field-heading">QUANTITY <span class="field-value">{{ quantity }}</span></h5>
              <h5 class="field-heading">LAST TIME ORDERED <span class="field-value">{{ lastTimeOrdered }}</span></h5>
              <h5 class="field-heading">LAST PRICE ORDERED <span class="field-value">{{ lastPriceOrdered }}</span></h5>
              <h5 class="field-heading">COST PRICE <span class="field-value">{{ costPrice }}</span></h5>
              <h5 class="field-heading">STATUS <span class="field-value">{{ status }}</span></h5>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <MDBContainer class="description-section" fluid>
      <h5 class="field-heading">{{ category }}</h5>
      <h1 class="product-heading">Product description <span class="field-heading collection-name">{{ collectionName }}</span> <span class="field-heading separator">|</span> <span class="field-heading color-name">{{ color }}</span></h1>
      <p class="description">{{ productDescription }}</p>
    </MDBContainer>
    <MDBContainer class="footer-section" fluid>
      <MDBRow>
        <MDBCol>
          <h5 class="field-heading">VOLUME <span class="field-value">{{ volume }}</span></h5>
          <h5 class="field-heading">SIZE <span class="field-value">{{ size }}</span></h5>
          <h5 class="field-heading">QUANTITY PER PACKAGE <span class="field-value">{{ quantityPerPackage }}</span></h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">DISTRIBUTION PRICE <span class="field-value">{{ distributionPrice }}</span></h5>
          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ distributionPriceWithoutVat }}</span></h5>
          <h5 class="field-heading">MARKUP <span class="field-value">{{ distributionMarkup }}</span></h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">PROFESSIONAL PRICE <span class="field-value">{{ professionalPrice }}</span></h5>
          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ professionalPriceWithoutVat }}</span></h5>
          <h5 class="field-heading">MARKUP <span class="field-value">{{ professionalMarkup }}</span></h5>
        </MDBCol>
        <MDBCol>
          <h5 class="field-heading">DEFAULT PRICE <span class="field-value">{{ defaultPrice }}</span></h5>
          <h5 class="field-heading">WITHOUT VAT <span class="field-value">{{ defaultPriceWithoutVat }}</span></h5>
          <h5 class="field-heading">MARKUP <span class="field-value">{{ defaultMarkup }}</span></h5>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
</template>
<script lang="ts">
import {MDBContainer, MDBRow, MDBCol, MDBBtn} from "mdb-vue-ui-kit";
export default {
  name: 'SingleProductView',
  components: { MDBContainer, MDBRow, MDBCol, MDBBtn },
  props: {
    productData: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    selectedProduct() {
      return this.productData.find(product => product.id === parseInt(this.id)) || {};
    },
    imageSource() {
      return this.selectedProduct.imageSource || '';
    },
    productName() {
      return this.selectedProduct.productName || '';
    },
    sku() {
      return this.selectedProduct.sku || '';
    },
    barcodeImage() {
      return this.selectedProduct.barcodeImage || '';
    },
    brand() {
      return this.selectedProduct.brand || '';
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
      return this.selectedProduct.category || '';
    },
    productDescription() {
      return this.selectedProduct.productDescription || '';
    },
    collectionName() {
      return this.selectedProduct.collectionName || '';
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
      return this.selectedProduct.quantityPerPackage || '';
    },
    distributionPrice() {
      return this.selectedProduct.distributionPrice || '';
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
      return this.selectedProduct.defaultPrice || '';
    },
    defaultPriceWithoutVat() {
      return this.selectedProduct.defaultPriceWithoutVat || '';
    },
    defaultMarkup() {
      return this.selectedProduct.defaultMarkup || '';
    }
  },
  mounted() {
    console.log('Props in SingleProductView:', this.$props);
    console.log('Product ID:', this.id);
  },

}
</script>
<style scoped>
  .product-img {
    border: 20px solid #121212;
    width: 100%;
    max-width: 250px;
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
</style>