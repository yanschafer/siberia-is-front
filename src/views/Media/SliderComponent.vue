<template>
  <Galleria
    :value="images"
    :responsiveOptions="responsiveOptions"
    :numVisible="5"
    containerStyle="max-width: 320px"
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
        style="width: 70%; display: block"
      />
    </template>
    <!--    <template #caption="slotProps">-->
    <!--      <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>-->
    <!--      <p class="text-white">{{ slotProps.item.alt }}</p>-->
    <!--    </template>-->
  </Galleria>
</template>

<script lang="ts">
import Galleria from "primevue/galleria";

export default {
  name: "SliderComponent",
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
  setup() {},
};
</script>

<style scoped>
.text-xl {
  font-size: 1.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.font-bold {
  font-weight: bold;
}
.text-white {
  color: white;
}
</style>
