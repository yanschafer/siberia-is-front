<template>
  <Dialog
    v-model:visible="mediaModalStore.uploadProductsOpen"
    modal
    :header="localize('uploadFromFile')"
  >
    <p>
      <IconInfoCircle color="grey" :size="18" stroke-width="2" />
      {{ localize("templateDownloadText") }}
      <a href="#">{{ localize("templateDownloadLink") }}</a>
    </p>
    <FileUploadModalComponent :products="true" />
    <TableComponent
      v-if="uploadedProducts.length"
      :rows="uploadedProducts"
      :columns="productsStore.uploadPreviewColumns"
      :enable-delete="true"
      @row-delete="removeFromUpload"
    />
    <div class="d-flex flex-row gap-2">
      <MDBBtn
        class="btn utility-btn btn-outline-black"
        v-if="uploadedProducts.length"
        @click="upload"
        >{{ localize("LOAD") }}</MDBBtn
      >
      <MDBBtn
        class="btn utility-btn btn-outline-danger"
        v-if="uploadedProducts.length"
        @click="clear"
        >{{ localize("CLEAR") }}</MDBBtn
      >
    </div>
  </Dialog>
</template>

<script lang="ts">
import { MDBBtn } from "mdb-vue-ui-kit";
import { useMediaModalStore } from "@/stores/media-modal.store.ts";
import FileUploadModalComponent from "@/components/Inputs/FileUploadModalComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import Dialog from "primevue/dialog";
import { useProductsStore } from "@/stores/products.store.ts";
import PrintUtil from "@/utils/localization/print.util";
import { IconInfoCircle } from "@tabler/icons-vue";

export default {
  name: "ProductsUploadModalComponent",
  components: {
    FileUploadModalComponent,
    TableComponent,
    Dialog,
    MDBBtn,
    IconInfoCircle,
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
    localize(key: string, module: string = "products") {
      return PrintUtil.localize(key, module);
    },
    removeFromUpload(row) {
      this.productsStore.removeFromUpload(row.index);
    },
    async upload() {
      const created = await this.productsStore.createUploaded();
      if (created.success) {
        this.$toast.add({
          severity: "info",
          summary: PrintUtil.localize("success", "operations"),
          detail: PrintUtil.localize("productsUploaded", "products"),
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
