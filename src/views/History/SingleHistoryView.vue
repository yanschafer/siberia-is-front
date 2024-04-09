<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{ targetName }} -> {{ type }}</h1>
      </MDBRow>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">{{ localize("authorCapslock") }}</span>
      <span class="username">{{ author }}</span>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">{{ localize("dateCapslock") }}</span>
      <span class="username">{{ date }}</span>
    </MDBRow>
    <Button class="btn btn-danger utility-btn">Discard changes</Button>
  </MDBContainer>
  <MDBContainer class="pt-4">
    {{ description }}
    <BeforeAfterComponent />
  </MDBContainer>
</template>

<script lang="ts">
import { MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Inputs/TabsComponent.vue";
import { useHistoryStore } from "@/stores/history.store";
import { useRoute } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import BeforeAfterComponent from "@/views/History/BeforeAfterComponent.vue";

export default {
  name: "SingleHistoryView",
  components: {
    BeforeAfterComponent,
    MDBCol,
    TabsComponent,
    MDBRow,
    MDBContainer,
    MDBBadge,
    MDBBtn,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async setup() {
    const historyStore = useHistoryStore();
    const route = useRoute();
    return {
      historyStore,
      loadItemRes: await historyStore.loadItem(
        parseInt(route.params.id.toString()),
      ),
    };
  },
  computed: {
    selectedHistory() {
      return this.historyStore.selectedItem;
    },
    targetName() {
      return this.selectedHistory.eventObjectName || "";
    },
    type() {
      const selectedType = this.selectedHistory.eventType || "";
      return this.localize(selectedType);
    },
    date() {
      const dateTime = this.selectedHistory.timestamp || null;
      if (dateTime) return dateTime.split("T")[0];
      else return "";
    },
    author() {
      return this.selectedHistory.author || "";
    },
    description() {
      return this.selectedHistory.eventDescription;
    },
  },
  methods: {
    localize(key, module = "history") {
      return PrintUtil.localize(key, module);
    },
  },
};
</script>
<style scoped>
.username-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
  text-align: left;
}
.user-roles-heading {
  width: fit-content;
}
.username {
  color: #121212;
  font-weight: 600;
}
.single-user-info {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800 !important;
}
:deep(.nav-link) {
  font-weight: 600 !important;
}
</style>
