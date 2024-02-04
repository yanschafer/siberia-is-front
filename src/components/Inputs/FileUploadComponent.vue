<template>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">
          <IconCloudUpload color="#4E4E4E" :size="48" stroke-width="1" />
          <p class="upload-text mb-0">
            {{ localize("releaseToDropFileHere") }}
          </p>
        </div>
        <div v-else-if="!files.length">
          <IconCloudUpload color="#4E4E4E" :size="48" stroke-width="1" />
          <p class="upload-text mb-0">
            {{ localize("dropFileHereOr") }} <u>{{ localize("clickHere") }}</u>
            {{ localize("toUpload") }}
          </p>
        </div>
      </label>

      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <img class="preview-img" :src="generateThumbnail(file)" />
            <p :title="file.name">
              {{ makeName(file.name) }}
            </p>
          </div>
          <div>
            <button
              class="btn btn-delete"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <b>&times;</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IconCloudUpload, IconMapPinFilled } from "@tabler/icons-vue";
import PrintUtil from "@/utils/localization/print.util";
import LoggerUtil from "@/utils/logger/logger.util";
export default {
  name: "FileUploadComponent",
  components: { IconMapPinFilled, IconCloudUpload },
  emits: ["changed"],
  props: {
    initValue: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isDragging: false,
      initializerRemoved: false,
      files: [],
    };
  },
  mounted() {
    this.files = this.initValue.map((el) => el.file);
    LoggerUtil.debug("Loaded into component", this.files);
  },
  methods: {
    localize(key, module = "components") {
      return PrintUtil.localize(key, module);
    },
    onChange() {
      this.files = [...this.$refs.file.files];
      this.$emit("changed", this.files);
    },
    generateThumbnail(file) {
      if (this.initValue.length && !this.initializerRemoved) {
        return this.initValue[0].src;
      }
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },

    makeName(name) {
      return (
        name.split(".")[0].substring(0, 3) +
        "..." +
        name.split(".")[name.split(".").length - 1]
      );
    },
    remove(i) {
      if (this.initValue?.length) this.initializerRemoved = true;
      this.files.splice(i, 1);
      this.$emit("changed", this.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
  },
};
</script>

<style>
.main {
  display: flex;
  flex-grow: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.dropzone-container {
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.preview-container {
  display: flex;
  margin-top: 2rem;
}
.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
  border-radius: 10px;
}
.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
.upload-text {
  font-size: 0.8rem;
  font-weight: 600;
}
.btn-delete {
  padding: 0;
  font-size: 1.5rem;
  box-shadow: none;
  color: #c22626;
}
.btn-delete:hover {
  padding: 0;
  font-size: 1.5rem;
  box-shadow: none !important;
}
</style>
