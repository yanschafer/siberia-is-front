<template>
  <Galleria
    :value="images"
    :responsiveOptions="responsiveOptions"
    :numVisible="5"
    :circular="true"
    containerStyle="max-width: 240px"
    :showItemNavigators="true"
    :showThumbnails="false"
    :showItemNavigatorsOnHover="true"
    :showIndicators="true"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.itemImageSrc"
        :alt="slotProps.item.alt"
        style="width: 100%; display: block"
      />
    </template>
    <template #indicator="{ index }">
      <span :class="['custom-indicator', { 'active-indicator': index === currentIndex }]"></span>
    </template>
  </Galleria>
</template>

<script>
import Galleria from "primevue/galleria";

export default {
  name: "SliderNoThumbnailComponent",
  components: {
    Galleria,
  },
  props: {
    images: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
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
    currentIndex: 0,
  }),
};
</script>

<style scoped>
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
