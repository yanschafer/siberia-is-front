<template>
  <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 320px">
    <template #item="slotProps">
      <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
      <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 70%; display: block" />
    </template>
<!--    <template #caption="slotProps">-->
<!--      <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>-->
<!--      <p class="text-white">{{ slotProps.item.alt }}</p>-->
<!--    </template>-->
  </Galleria>
</template>

<script>
import { ref } from 'vue';
import Galleria from "primevue/galleria";

export default {
  name: "SLiderComponent",
  components: {
    Galleria
  },
  setup() {
    const images = ref([
      { itemImageSrc: 'https://source.unsplash.com/random/800x600', thumbnailImageSrc: 'https://source.unsplash.com/random/100x100', alt: 'Image 1', title: 'Title 1' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x601', thumbnailImageSrc: 'https://source.unsplash.com/random/100x101', alt: 'Image 2', title: 'Title 2' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x602', thumbnailImageSrc: 'https://source.unsplash.com/random/100x102', alt: 'Image 3', title: 'Title 3' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x603', thumbnailImageSrc: 'https://source.unsplash.com/random/100x103', alt: 'Image 4', title: 'Title 4' },
      { itemImageSrc: 'https://source.unsplash.com/random/800x604', thumbnailImageSrc: 'https://source.unsplash.com/random/100x104', alt: 'Image 5', title: 'Title 5' }
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
