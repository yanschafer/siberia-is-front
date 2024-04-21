<template>
  <div v-if="isSelected" class="main-area animate__animated animate__fadeIn">
    <template v-for="(item, key) in beforeAfter">
      <div class="flex row row-operation">
        <div class="d-flex flex-row">
          <h5 class="operation-name">
            {{ localize(key) }}
          </h5>
        </div>
        <div class="col-4">
          <template v-if="key === 'photo'">
            <SliderNoThumbnailComponent :images="imagesSource(item.before)" />
          </template>
          <h5 v-else-if="key === 'hash'" class="text">*******</h5>
          <h5 v-else class="text">{{ item.before }}</h5>
        </div>
        <div
          class="col-2 d-flex justify-content-center align-items-center align-self-center"
        >
          <img
            class="arrow-icon"
            src="@/assets/icons/arrow-narrow-right.svg"
            alt="Arrow icon"
          />
        </div>
        <div class="col-4">
          <template v-if="key === 'photo'">
            <SliderNoThumbnailComponent :images="imagesSource(item.after)" />
          </template>
          <h5 v-else-if="key === 'hash'" class="text">*******</h5>
          <h5 v-else class="text">{{ item.after }}</h5>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScrollPanel from "primevue/scrollpanel";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { useHistoryEventStore } from "@/stores/components/history-event.store";
import SliderNoThumbnailComponent from "@/views/Media/SliderNoThumbnailComponent.vue";
import FilesResolverUtil from "@/utils/files-resolver.util";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  name: "BeforeAfterComponent",
  components: { SliderNoThumbnailComponent, TableComponent, ScrollPanel },
  setup() {
    const historyEventStore = useHistoryEventStore();

    return {
      historyEventStore,
    };
  },

  methods: {
    localize(key: string, module: string = "beforeAfter") {
      return PrintUtil.localize(key, module);
    },
    firstLetterToUpperCase(str: string) {
      const first = str.substring(0, 1);

      return first.toUpperCase() + str.substring(1, str.length);
    },
    imagesSource(photo) {
      if (photo && photo.length != 0)
        return photo.map((el) => ({
          itemImageSrc: FilesResolverUtil.getStreamUrl(el || ""),
          thumbnailImageSrc: FilesResolverUtil.getStreamUrl(el || ""),
          alt: el,
          title: `Title ${el}`,
        }));
      else
        return [
          {
            itemImageSrc: FilesResolverUtil.getStreamUrl("fileNotFound.jpeg"),
            thumbnailImageSrc:
              FilesResolverUtil.getStreamUrl("fileNotFound.jpeg"),
            alt: "Not found",
            title: `Title not found`,
          },
        ];
    },
  },
  computed: {
    isSelected() {
      return this.historyEventStore.isSelected;
    },
    beforeAfter() {
      return this.historyEventStore.beforeAfterObject;
    },
  },
});
</script>

<style scoped>
.row-operation {
  padding: 1rem;
  border-bottom: 1px solid #e1e1e1;
}
.main-area {
  height: auto;
}
.col-before {
  width: 100%;
}
.col-after {
  width: max-content;
}
.text {
  word-break: break-all;
  margin: 0;
  font-weight: 600;
}
.operation-name {
  font-weight: 400;
  margin-bottom: 1rem;
  color: #4f4f4f;
}
</style>
