<template>
  <Dialog
    v-model:visible="mediaModalStore.imageOpen"
    modal
    :style="{ width: '50vw' }"
    header="Image Details"
  >
    <div class="d-flex flex-row">
      <div class="flex flex-column col-auto w-50 photo-col">
        <div class="container image-cont">
          <img :src="getUrl(image.url)" alt="Image" class="media-image-full" />
        </div>
      </div>
    </div>

    <div class="d-flex flex-column justify-center mt-3">
      <div class="flex-grow-1 d-flex flex-row justify-content-start pl-3">
        <div class="d-flex flex-row flex-grow-1 gap-4 text-col">
          <div class="d-flex flex-column justify-center">
            <h5 class="m-0 heading-list">{{ image.name }}</h5>
            <p class="text-muted m-0">{{ image.url }}</p>
            <InputText
              v-model="image.name"
              v-if="editMode"
              :placeholder="'Media name...'"
            />
          </div>
          <!--div class="d-flex flex-column justify-center">
            <h5 class="heading-list m-0">USED FOR</h5>
            <p class="text-muted m-0">Product #1</p>
          </div>
          <div class="d-flex flex-column justify-center">
            <h5 class="heading-list m-0">DATE</h5>
            <p class="text-muted m-0">24/24/24</p>
          </div-->
        </div>
      </div>
      <h5 class="heading-list m-0">DESCRIPTION</h5>
      <p v-if="!editMode" class="text-muted m-0">
        {{ image.description }}
      </p>
      <Textarea
        v-if="editMode"
        class="text-area"
        :placeholder="'Description...'"
        v-model="image.description"
      ></Textarea>
      <div
        v-if="!editMode"
        class="d-flex flex-row justify-content-start gap-2 mt-3"
      >
        <Button @click="startEdit" class="btn btn-outline-black utility-btn"
          >EDIT</Button
        >
        <Button @click="removeImage" class="btn btn-danger utility-btn"
          >DELETE</Button
        >
      </div>
      <div
        v-if="editMode"
        class="d-flex flex-row justify-content-start gap-2 mt-3"
      >
        <Button @click="cancelEdit" class="btn btn-outline-black utility-btn"
          >CANCEL</Button
        >
        <Button @click="saveEdit" class="btn btn-success utility-btn"
          >SAVE</Button
        >
      </div>
    </div>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { useMediaModalStore } from "@/stores/media-modal.store.ts";
import FilesResolverUtil from "@/utils/files-resolver.util.ts";
import { useMediaStore } from "@/stores/media.store.ts";
import ValidatorUtil from "@/utils/validator/validator.util.ts";
import ValidateRule from "@/utils/validator/validate-rule";
import GalleryUpdateDto from "@/api/modules/gallery/dto/gallery-update.dto.ts";

export default {
  name: "MediaModalComponent",
  components: {
    Dialog,
    InputText,
    Textarea,
    Button,
  },
  data: () => ({
    editMode: false,
    validator: new ValidatorUtil(),
  }),
  setup() {
    const mediaModalStore = useMediaModalStore();
    const mediaStore = useMediaStore();

    return {
      mediaModalStore,
      mediaStore,
    };
  },
  created() {
    const nameValidateRule = new ValidateRule().required();
    const descriptionValidateRule = new ValidateRule().skipIfNull().required();
    const validator = this.validator
      .addRule("name", nameValidateRule)
      .addRule("description", descriptionValidateRule);
  },
  methods: {
    startEdit() {
      this.editMode = true;
    },
    async removeImage() {
      const removeRes = await this.mediaStore.removeImage(this.image.id);

      if (removeRes.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `File '${this.image.name}' removed`,
          life: 3000,
        });
        this.editMode = false;
        this.mediaModalStore.imageOpen = false;
      } else removeRes.toastIfError(this.$toast, this.$nextTick);
    },
    cancelEdit() {
      this.editMode = false;
    },
    async saveEdit() {
      const updateImageDto = new GalleryUpdateDto(
        this.image.name,
        this.image.description,
      );

      const validateRes = this.validator.validate(updateImageDto);
      if (validateRes !== true) {
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const updateRes = await this.mediaStore.updateImage(
        this.image.id,
        updateImageDto,
      );

      if (updateRes.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `File '${this.image.name}' updated`,
          life: 3000,
        });
        this.editMode = false;
      } else updateRes.toastIfError(this.$toast, this.$nextTick);
    },
    getUrl() {
      return FilesResolverUtil.getStreamUrl(this.image.url);
    },
  },
  computed: {
    image() {
      return this.mediaModalStore.selectedImage;
    },
  },
};
</script>

<style scoped>
.media-image-full {
  width: 100%;
}
.image-cont {
  width: 90%;
  padding: 0;
  margin: 0;
  border: 10px solid black;
}
.photo-col {
  display: flex;
  justify-content: center;
}
.text-col {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  justify-content: start !important;
}
.p-dialog {
  width: 78vw !important;
}
.text-area {
  min-height: 5rem;
}
</style>
