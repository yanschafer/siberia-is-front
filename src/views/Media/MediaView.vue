<template>
  <MediaModalComponent />

  <Dialog
    v-model:visible="mediaModalStore.uploadOpen"
    modal
    :header="localize('uploadMedia')"
  >
    <FileUploadModalComponent />
  </Dialog>
  <ScrollPanel
    style="height: 80vh; width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <div class="card">
      <DataView :paginator="true" :rows="6" :value="items" :layout="layout">
        <template #header>
          <div
            class="d-flex justify-content-between align-items-center position-sticky header"
          >
            <div
              class="d-flex flex-row justify-center align-content-center align-self-center align-items-center gap-2"
            >
              <Checkbox v-model="checked" @change="toggleAll" :binary="true" />
              <Button
                @click="deleteSelected"
                class="btn-danger btn utility-btn"
                >{{ localize("deleteSelected") }}</Button
              >
            </div>
            <!--div class="d-flex flex-row gap-3">
              TODO DATE SELECTOR
              <SelectComponent
                model-value=""
                items=""
                :placeholder="'File type...'"
              />
              TODO FILE TYPE SELECTOR
              <SelectComponent model-value="" items="" :placeholder="'Date'" />
              <Button class="btn-outline-black btn utility-btn">FILTER</Button>
            </div-->
            <div class="d-flex flex-column justify-center">
              <SearchComponent class="search" v-model="mediaStore.searchTerm" />
            </div>
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

        <template #list="slotProps">
          <div class="row animate__animated animate__fadeIn">
            <div
              v-for="(image, index) in slotProps.items"
              :key="index"
              class="col-12"
            >
              <div
                class="d-flex flex-column list-row flex-sm-row align-items-center p-4 gap-3"
              >
                <Checkbox v-model="image.selected" :binary="true" />
                <div @click="openModal(image)" class="image-container">
                  <img
                    class="media-image-list mx-auto d-block"
                    :src="getUrl(image.url)"
                    :alt="image.name"
                  />
                  <div class="overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-eye"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <div class="d-flex flex-row flex-grow-1 gap-4">
                  <div class="d-flex flex-column justify-center col-4">
                    <h5 class="m-0 heading-list">{{ localize("fileName") }}</h5>
                    <p class="text-muted m-0">{{ image.name }}</p>
                  </div>
                  <div class="d-flex flex-column col-2 justify-center">
                    <!--                    <h5 class="heading-list m-0">{{ localize("usedFor") }}</h5>-->
                    <!--                    <p class="text-muted m-0">Product #1</p>-->
                  </div>
                  <div class="d-flex flex-column col-2 justify-center">
                    <Button
                      @click="removeImage(image)"
                      class="btn btn-danger utility-btn"
                      >{{ localize("delete") }}</Button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="row animate__animated animate__fadeIn">
            <div
              v-for="(image, index) in slotProps.items"
              :key="index"
              class="col-auto"
            >
              <div class="p-2 border rounded col-auto image-col mt-2">
                <div @click="openModal(image)" class="image-container">
                  <img
                    class="img-fluid media-image"
                    :src="getUrl(image.url)"
                    :alt="image.name"
                  />
                  <div class="overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-eye"
                    >
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                </div>

                <div class="pt-4">
                  <div class="d-flex flex-row mt-1 align-items-center gap-2">
                    <Checkbox
                      class="checkbox-inline"
                      v-model="image.selected"
                      :binary="true"
                    />
                    <h5 class="m-0 heading-list">{{ image.name }}</h5>
                    <!--                      <p class="text-muted m-0">{{ image.url }}</p>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </ScrollPanel>
</template>

<script lang="ts">
import DataView from "primevue/dataview";
import Image from "primevue/image";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Button from "primevue/button";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import ScrollPanel from "primevue/scrollpanel";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import Checkbox from "primevue/checkbox";
import FileUploadModalComponent from "@/components/Inputs/FileUploadModalComponent.vue";
import MediaModalComponent from "@/views/Media/MediaModalComponent.vue";
import { useMediaStore } from "@/stores/media.store";
import LoggerUtil from "@/utils/logger/logger.util";
import { useMediaModalStore } from "@/stores/media-modal.store";
import FilesResolverUtil from "@/utils/files-resolver.util";
import PrintUtil from "@/utils/localization/print.util";

export default {
  components: {
    FileUploadModalComponent,
    SelectComponent,
    SearchComponent,
    DataView,
    DataViewLayoutOptions,
    Button,
    Image,
    Tag,
    ScrollPanel,
    Checkbox,
    Dialog,
    MediaModalComponent,
  },
  async setup() {
    const mediaStore = useMediaStore();
    const mediaModalStore = useMediaModalStore();

    return {
      mediaStore,
      mediaModalStore,
      loadRes: await mediaStore.loadGallery(),
    };
  },
  async created() {
    this.loadRes.toastIfError(this.$toast, this.$nextTick);
  },
  data() {
    return {
      checked: false,
      uploadVisible: false,
      sortOrder: null,
      filters: null,
      layout: "grid",
      showUpload: false,
    };
  },
  methods: {
    localize(key: string, module: string = "media") {
      return PrintUtil.localize(key, module);
    },
    getUrl(image) {
      return FilesResolverUtil.getStreamUrl(image);
    },
    openModal(image) {
      this.mediaModalStore.openImage(image);
    },
    async removeImage(image) {
      const removeRes = await this.mediaStore.removeImage(image.id);

      if (removeRes.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `File '${image.name}' removed`,
          life: 3000,
        });
      } else removeRes.toastIfError(this.$toast, this.$nextTick);
    },
    async deleteSelected() {
      const onDelete = this.items
        .filter((el) => el.selected)
        .map((el) => el.id);

      const removeResult = await Promise.all(
        onDelete.map(
          async (el) => await this.mediaStore.removeImage(el, false),
        ),
      );

      if (removeResult.every((el) => el.success)) {
        if (this.checked) {
          this.mediaStore.clearList();
        } else {
          this.mediaStore.removeFromList(onDelete);
        }

        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `Files removed`,
          life: 3000,
        });
      }
    },
    toggleAll() {
      this.mediaStore.toggleAll(this.checked);
    },
  },
  computed: {
    items() {
      if (this.mediaStore.searchTerm != "")
        return this.mediaStore.galleryItems.filter((el) => {
          LoggerUtil.debug(el);
          return Object.values(el).some((value) => {
            LoggerUtil.debug(
              String(value)
                .toLowerCase()
                .includes(this.mediaStore.searchTerm.toLowerCase()),
            );
            return String(value)
              .toLowerCase()
              .includes(this.mediaStore.searchTerm.toLowerCase());
          });
        });
      else return this.mediaStore.galleryItems;
    },
  },
};
</script>

<style scoped>
.product-list-item,
.product-grid-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-list-item img,
.product-grid-item img {
  width: 100px;
  margin-right: 20px;
}
.media-image {
  //width: 300px;
  //border-radius: 8px;
  max-width: 100%; /* Максимальная ширина изображения */
  max-height: 100%; /* Максимальная высота изображения */
  object-fit: cover; /* Обеспечивает покрытие всей области контейнера, сохраняя пропорции */
  object-position: center; /* Центрирует изображение в контейнере */
}
.media-image-list {
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;
}
.main-area {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  width: min(10vw, 16rem);
  height: min(10vw, 16rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.5s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  visibility: hidden;
  opacity: 0;
  transition:
    all 0.3s ease-in-out,
    visibility 0s ease-in-out,
    opacity 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container:hover .overlay {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}

.image-container:hover .media-image {
  transform: scale(1.1);
}

/* SVG стили */
.feather-eye {
  stroke: white;
  transition:
    all 0.3s ease-in-out,
    visibility 0s ease-in-out,
    opacity 0.5s ease-in-out;
}
.list-row {
  border-bottom: 1px solid #efefef;
}
.p-dataview-header {
  position: sticky !important;
  top: 0 !important;
  z-index: 999999999 !important;
}
.heading-list {
  font-size: 0.8rem;
  font-weight: 800;
  width: 100%;
}
.search {
  width: 50vw;
  margin-bottom: 0 !important;
}
.p-inputtext {
  width: 100% !important;
}
.utility-btn {
  box-shadow: none !important;
}
.main-area {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
.p-dataview .p-dataview-content {
  width: 83vw !important;
}
.p-selectbutton .p-button.p-highlight {
  background: #000000 !important;
  border-color: #000000 !important;
  color: #ffffff;
}
.p-button:focus {
  box-shadow:
    0 0 0 2px #ffffff,
    0 0 0 4px #000000,
    0 1px 2px 0 black !important;
}
.image-col {
  width: 15rem; /* фиксированная ширина колонки */
  height: 16rem; /* фиксированная высота колонки */
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border: 1px solid #bbbbbb;
}
.checkbox-inline {
}
</style>
