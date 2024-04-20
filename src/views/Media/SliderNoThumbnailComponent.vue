<template>
  <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
            :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
    <template #item="slotProps">
      <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
      <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
  </Galleria>
</template>

<script>
import { ref } from 'vue';
import Galleria from "primevue/galleria";

export default {
  name: "SliderNoThumbnailComponent",
  components: {
    Galleria
  },
  setup() {
    const images = ref([
      { itemImageSrc: 'https://source.unsplash.com/random/800x600', thumbnailImageSrc: 'https://source.unsplash.com/random/100x100', alt: 'Image 1' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x601', thumbnailImageSrc: 'https://source.unsplash.com/random/100x101', alt: 'Image 2' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x602', thumbnailImageSrc: 'https://source.unsplash.com/random/100x102', alt: 'Image 3' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x603', thumbnailImageSrc: 'https://source.unsplash.com/random/100x103', alt: 'Image 4' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x604', thumbnailImageSrc: 'https://source.unsplash.com/random/100x104', alt: 'Image 5' }
    ]);

    const responsiveOptions = ref([
      {
        breakpoint: '1024px',
        numVisible: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ]);

    return {
      images,
      responsiveOptions
    };
  }
};
</script>

<style scoped>
</style>
