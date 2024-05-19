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
      <div class="image-container" @mouseover="showOverlay(slotProps.index)" @mouseleave="hideOverlay(slotProps.index)">
        <img
            :src="slotProps.item.itemImageSrc"
            :alt="slotProps.item.alt"
            style="width: 100%; display: block;"
        />
        <div class="animate__animated animate__fadeIn animate__faster overlay" v-show="slotProps.index === hoveredIndex">
          <p>{{ localize("update") }}</p>
        </div>
      </div>
    </template>

    <template #indicator="{ index }">
      <span :class="['custom-indicator', { 'active-indicator': index === currentIndex }]"></span>
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
  data() {
    return {
      images: [
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1518933165971-611dbc9c412d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzE&ixlib=rb-1.2.1&q=80&w=1080',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1518933165971-611dbc9c412d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzE&ixlib=rb-1.2.1&q=80&w=150',
          alt: 'Beautiful Nature 1'
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIxfHxuYXR1cmV8ZW58MHx8fHwxNjU5NzE2OTcy&ixlib=rb-1.2.1&q=80&w=1080',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIxfHxuYXR1cmV8ZW58MHx8fHwxNjU5NzE2OTcy&ixlib=rb-1.2.1&q=80&w=150',
          alt: 'Beautiful Nature 2'
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzI&ixlib=rb-1.2.1&q=80&w=1080',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzI&ixlib=rb-1.2.1&q=80&w=150',
          alt: 'Beautiful Nature 3'
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI3fHxuYXR1cmV8ZW58MHx8fHwxNjU5NzE2OTcy&ixlib=rb-1.2.1&q=80&w=1080',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI3fHxuYXR1cmV8ZW58MHx8fHwxNjU5NzE2OTcy&ixlib=rb-1.2.1&q=80&w=150',
          alt: 'Beautiful Nature 4'
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1451471016733-67075d41af92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzI&ixlib=rb-1.2.1&q=80&w=1080',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1451471016733-67075d41af92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fG5hdHVyZXxlbnwwfHx8fDE2NTk3MTY5NzI&ixlib=rb-1.2.1&q=80&w=150',
          alt: 'Beautiful Nature 5'
        }
      ],
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
    }
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


