<template>
  <Galleria
    :value="images"
    :responsiveOptions="responsiveOptions"
    :numVisible="5"
    :circular="true"
    containerStyle="max-width: 240px"
    :showItemNavigators="true"
    :showThumbnails="false"
    :showItemNavigatorsOnHover="false"
    :showIndicators="true"
    :currentIndex="currentIndex"
    @onPageChange="updateCurrentIndex"
  >
    <template #item="slotProps">
      <div
        class="image-container"
        @mouseover="showOverlay(slotProps.index)"
        @mouseleave="hideOverlay(slotProps.index)"
      >
        <img
          :src="slotProps.item.itemImageSrc"
          :alt="slotProps.item.alt"
          style="width: 100%; display: block"
        />
        <div
          @click="uploadNewClicked"
          class="animate__animated animate__fadeIn animate__faster overlay"
          v-show="slotProps.index === hoveredIndex"
        >
          <p>{{ localize("update") }}</p>
        </div>
      </div>
    </template>

    <template #indicator="{ index }">
      <span
        :class="[
          'custom-indicator',
          { 'active-indicator': index === currentIndex },
        ]"
      ></span>
    </template>
  </Galleria>
</template>

<script>
import Galleria from "primevue/galleria";
import PrintUtil from "@/utils/localization/print.util.ts";

export default {
  name: "SliderUpload",
  components: {
    Galleria,
  },
  props: {
    images: {
      type: Array,
      default: [],
    },
  },
  emits: ["uploadNew"],
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
      hoveredIndex: null,
      currentIndex: 0,
    };
  },
  methods: {
    localize(key, module = "sliderUpload") {
      return PrintUtil.localize(key, module);
    },
    showOverlay(index) {
      this.hoveredIndex = index;
    },
    hideOverlay() {
      this.hoveredIndex = null;
    },
    updateCurrentIndex(event) {
      if (event.page !== undefined) {
        this.currentIndex = event.page;
      }
    },
    uploadNewClicked() {
      this.$emit("uploadNew");
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
}

.image-container:hover .overlay {
  opacity: 1;
}

.custom-indicator {
  width: 14px;
  height: 14px;
  background-color: #ececec; /* серый цвет */
  border-radius: 50%; /* круглая форма */
  display: inline-block;
  cursor: pointer;

  transition: background-color 0.3s;
}
:deep(.p-highlight) {
  background-color: transparent;
  color: #222222;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #555555;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
}
:deep(.p-galleria-indicator) {
  display: flex;
  align-content: center;
  align-items: center;
}
:deep(.p-galleria-item-prev) {
  z-index: 99999999999;
}
</style>
