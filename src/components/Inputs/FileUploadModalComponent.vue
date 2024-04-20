<template>
  <FileUpload
    name="demo[]"
    customUpload
    @uploader="uploader"
    :multiple="true"
    :accept="accept"
    :maxFileSize="100000000"
  >
    <template #empty>
      <p>{{ localize("dragAndDrop") }}</p>
    </template>
  </FileUpload>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileUpload from "primevue/fileupload";
import LoggerUtil from "@/utils/logger/logger.util";
import { useMediaStore } from "@/stores/media.store";
import { useMediaModalStore } from "@/stores/media-modal.store";
import { useProductsStore } from "@/stores/products.store";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  name: "FileUploadModalComponent",
  components: { FileUpload },
  props: {
    products: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    accept: "image/*",
  }),
  created() {
    if (this.products) this.accept = "text/csv";
  },
  methods: {
    localize(key: string, module: string = "media") {
      return PrintUtil.localize(key, module);
    },
    uploader(event) {
      if (this.products) this.productUploader(event);
      else this.photoUploader(event);
    },
    async productUploader(event) {
      await Promise.all(
        event.files.map(async (file: File) => {
          const productsStore = useProductsStore();
          const uploaded = await productsStore.uploadCsv(file);
          if (uploaded.success) {
            this.$toast.add({
              severity: "info",
              summary: "Success",
              detail: `File '${file.name}' Uploaded`,
              life: 3000,
            });
          } else uploaded.toastIfError(this.$toast, this.$nextTick);
        }),
      );
    },
    async photoUploader(event) {
      await Promise.all(
        event.files.map(async (file) => {
          const reader = new FileReader();
          let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

          const base64Encoded = await new Promise<string>((resolve) => {
            reader.readAsDataURL(blob);

            reader.onloadend = function () {
              resolve(reader.result);
            };
          });

          const mediaStore = useMediaStore();
          const upload = await mediaStore.uploadFile(
            file,
            base64Encoded.split(",")[1],
          );

          if (upload.success) {
            LoggerUtil.debug(event);
            this.$toast.add({
              severity: "info",
              summary: "Success",
              detail: `File '${upload.getData()[0].name}' Uploaded`,
              life: 3000,
            });
          } else upload.toastIfError(this.$toast, this.$nextTick);
        }),
      );

      const modalStore = useMediaModalStore();
      modalStore.uploadOpen = false;
    },
  },
});
</script>

<style scoped>
:deep(.p-button) {
  background: transparent !important;
  border: 2px solid black !important;
  border-radius: 8px !important;
  color: black !important;
  height: 2rem !important;
}
</style>
