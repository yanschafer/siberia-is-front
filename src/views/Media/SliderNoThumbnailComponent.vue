<template>
  <Galleria
    :value="images"
    :responsiveOptions="responsiveOptions"
    :numVisible="5"
    :circular="true"
    containerStyle="max-width: 640px"
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
    <template #thumbnail="slotProps">
      <img
        :src="slotProps.item.thumbnailImageSrc"
        :alt="slotProps.item.alt"
        style="display: block"
      />
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
  }),
};
</script>

<style scoped></style>
