<template>
  <ScrollPanel
    v-if="isSelected"
    style="width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <!-- TODO Вынести в отдельные компоненты -->
    <!-- Тип операция/таблица -->
    <!--    <div class="flex row row-operation">-->
    <!--      <div class="d-flex flex-row">-->
    <!--        <h5 class="operation-name">Operation name 1</h5>-->
    <!--      </div>-->
    <!--      <div class="col-4">-->
    <!--        <h5 class="text">Operation details</h5>-->
    <!--      </div>-->
    <!--      <div class="col-4">-->
    <!--        <h5>Product details</h5>-->
    <!--        <TableComponent />-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- Тип было/стало -->
    <div class="flex row row-operation">
      <template v-for="(item, key) in beforeAfter">
        <div class="d-flex flex-row">
          <h5 class="operation-name">{{ firstLetterToUpperCase(key) }}</h5>
        </div>
        <div class="col-4">
          <h5 class="text">{{ item.before }}</h5>
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
          <h5 class="text">{{ item.after }}</h5>
        </div>
      </template>
    </div>
  </ScrollPanel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScrollPanel from "primevue/scrollpanel";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import { useHistoryEventStore } from "@/stores/components/history-event.store";

export default defineComponent({
  name: "BeforeAfterComponent",
  components: { TableComponent, ScrollPanel },
  setup() {
    const historyEventStore = useHistoryEventStore();

    return {
      historyEventStore,
    };
  },

  methods: {
    firstLetterToUpperCase(str: string) {
      const first = str.substring(0, 1);

      return first.toUpperCase() + str.substring(1, str.length);
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
