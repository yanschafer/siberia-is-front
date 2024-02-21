<script lang="ts">
import { defineComponent } from "vue";
import FileUpload from "primevue/fileupload";

export default defineComponent({
  name: "FileUploadModalComponent",
  components: { FileUpload },
  methods: {
    onAdvancedUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },
  },
});
</script>

<template>
  <FileUpload
    name="demo[]"
    url="/api/upload"
    @upload="onAdvancedUpload($event)"
    :multiple="false"
    accept="image/*"
    :maxFileSize="1000000"
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
