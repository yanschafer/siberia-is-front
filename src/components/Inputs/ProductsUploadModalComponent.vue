<template>
  <Dialog
    v-model:visible="mediaModalStore.uploadProductsOpen"
    modal
    header="Upload products from a file"
  >
    <FileUploadModalComponent :products="true" />
    <TableComponent
      v-if="uploadedProducts.length"
      :rows="uploadedProducts"
      :columns="productsStore.uploadPreviewColumns"
      :enable-delete="true"
      @row-delete="removeFromUpload"
    />
    <div class="d-flex flex-row gap-2">
      <MDBBtn class="btn utility-btn btn-outline-black" v-if="uploadedProducts.length" @click="upload">LOAD</MDBBtn>
      <MDBBtn class="btn utility-btn btn-outline-danger" v-if="uploadedProducts.length" @click="clear">CLEAR</MDBBtn>
    </div>
  </Dialog>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";
import { useMediaModalStore } from "@/stores/media-modal.store.ts";
import FileUploadModalComponent from "@/components/Inputs/FileUploadModalComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import Dialog from "primevue/dialog";
import { useProductsStore } from "@/stores/products.store.ts";
import LoggerUtil from "@/utils/logger/logger.util.ts";

export default {
  name: "ProductsUploadModalComponent",
  components: {
    FileUploadModalComponent,
    TableComponent,
    Dialog,
    MDBBtn,
  },
  setup() {
    const mediaModalStore = useMediaModalStore();
    const productsStore = useProductsStore();

    return {
      mediaModalStore,
      productsStore,
    };
  },
  methods: {
    removeFromUpload(row) {
      this.productsStore.removeFromUpload(row.index);
    },
    async upload() {
      const created = await this.productsStore.createUploaded();
      if (created.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `Products Uploaded`,
          life: 3000,
        });
        this.mediaModalStore.uploadProductsOpen = false;
        this.productsStore.onUploadRows = [];
      } else created.toastIfError(this.$toast, this.$nextTick);
    },
    clear() {
      this.productsStore.onUploadRows = [];
    },
  },
  computed: {
    uploadedProducts() {
      return this.productsStore.onUploadRows || [];
    },
  },
};
</script>

<style scoped></style>
