<template>
  <!--TODO Закрытие модалки не работает -->
  <MediaModalComponent :visible.sync="showModal" :image="currentImage" />
  <Dialog v-model:visible="uploadVisible" modal header="Upload media content">
    <FileUploadModalComponent />
  </Dialog>
  <ScrollPanel
    style="height: 80vh; width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <div class="card">
      <DataView :paginator="true" :rows="6" :value="images" :layout="layout">
        <template #header>
          <div
            class="d-flex justify-content-between align-items-center position-sticky header"
          >
            <Checkbox v-model="checked" :binary="true" />
            <!--TODO Здесь открывается модалка, повесь ее на кнопку у заголовка роута, а на эту кнопку вывести удаление-->
            <Button
              @click="uploadVisible = true"
              class="btn-danger btn utility-btn"
              >DELETE SELECTED</Button
            >
            <div class="d-flex flex-row gap-3">
              <!--TODO DATE SELECTOR-->
              <SelectComponent
                model-value=""
                items=""
                :placeholder="'File type...'"
              />
              <!--TODO FILE TYPE SELECTOR-->
              <SelectComponent model-value="" items="" :placeholder="'Date'" />
              <Button class="btn-outline-black btn utility-btn">FILTER</Button>
            </div>
            <div class="d-flex flex-column justify-center">
              <SearchComponent class="search" />
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
                <Checkbox v-model="checked" :binary="true" />
                <div @click="openModal(image)" class="image-container">
                  <img
                    class="media-image-list mx-auto d-block"
                    :src="image.url"
                    :alt="image.title"
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
                    <h5 class="m-0 heading-list">FILE NAME</h5>
                    <p class="text-muted m-0">{{ image.name }}</p>
                  </div>
                  <div class="d-flex flex-column col-2 justify-center">
                    <h5 class="heading-list m-0">USED FOR</h5>
                    <p class="text-muted m-0">Product #1</p>
                  </div>
                  <div class="d-flex flex-column col-2 justify-center">
                    <h5 class="heading-list m-0">DATE</h5>
                    <p class="text-muted m-0">24/24/24</p>
                  </div>
                  <!--                  <div class="d-flex flex-column col-2 justify-center">-->
                  <!--                    <h5 class="heading-list m-0">SIZE</h5>-->
                  <!--                    <p class="text-muted m-0">20KB</p>-->
                  <!--                  </div>-->
                  <div class="d-flex flex-column col-2 justify-center">
                    <Button class="btn btn-danger utility-btn">DELETE</Button>
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
              class="col-12 col-sm-6 col-md-4 col-xl-3 p-2"
            >
              <div class="p-4 border border-light rounded d-flex flex-column">
                <div @click="openModal(image)" class="image-container">
                  <img
                    class="img-fluid media-image"
                    :src="image.url"
                    :alt="image.title"
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
                  <div class="d-flex flex-row mt-1">
                    <div
                      class="d-flex flex-column justify-center align-items-center col-2"
                    >
                      <Checkbox v-model="checked" :binary="true" />
                    </div>
                    <div
                      class="d-flex flex-column justify-center align-items-start col-6"
                    >
                      <h5 class="m-0 heading-list">FILE NAME</h5>
                      <p class="text-muted m-0">{{ image.name }}</p>
                    </div>
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

<script>
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
  data() {
    return {
      checked: false,
      uploadVisible: false,
      images: [
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
        {
          name: "Изображение 2",
          description: "Описание изображения 2",
          url: "./fedor.png",
        },
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
        {
          name: "Изображение 1",
          description: "Описание изображения 1",
          url: "./fedor.png",
        },
      ],
      sortOrder: null,
      filters: null,
      layout: "grid",
      showModal: false,
      currentImage: null,
    };
  },
  methods: {
    openModal(image) {
      this.currentImage = image;
      this.showModal = true;
    },
  },
};
</script>

<style>
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
  width: 300px;
  border-radius: 8px;
}
.media-image-list {
  width: 70px;
  border-radius: 8px;
}
.main-area {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
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
  font-size: 1rem;
  font-weight: 800;
}
.search {
  width: 40vw !important;
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
</style>
