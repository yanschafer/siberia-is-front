<script lang="ts">
import { defineComponent } from "vue";
import FileUpload from "primevue/fileupload";
import LoggerUtil from "@/utils/logger/logger.util";
import { useMediaStore } from "@/stores/media.store";
import GalleryInputDto from "@/api/modules/gallery/dto/gallery-input.dto";
import GalleryModel from "@/api/modules/gallery/models/gallery.model";
import { useMediaModalStore } from "@/stores/media-modal.store";

export default defineComponent({
  name: "FileUploadModalComponent",
  components: { FileUpload },
  methods: {
    async uploader(event) {
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

<template>
  <FileUpload
    name="demo[]"
    customUpload
    @uploader="uploader"
    :multiple="true"
    accept="image/*"
    :maxFileSize="100000000"
  >
    <template #empty>
      <p>Drag and drop files to here to upload.</p>
    </template>
  </FileUpload>
</template>

<style scoped>
:deep(.p-button) {
  background: transparent !important;
  border: 2px solid black !important;
  border-radius: 8px !important;
  color: black !important;
  height: 2rem !important;
}
</style>
