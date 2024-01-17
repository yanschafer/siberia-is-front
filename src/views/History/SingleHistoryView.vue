<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{ targetName }} was {{ type }}</h1>
      </MDBRow>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">AUTHOR</span>
      <span class="username">{{ author }}</span>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">DATE | TIME</span>
      <span class="username">{{ dateTime }}</span>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="pt-4"> {{ description }} </MDBContainer>
</template>
<script lang="ts">
import { MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Navigation/TabsComponent.vue";
import { useHistoryStore } from "@/stores/history.store";
import { useRoute } from "vue-router";

export default {
  name: "SingleHistoryView",
  components: { MDBCol, TabsComponent, MDBRow, MDBContainer, MDBBadge, MDBBtn },
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
      return selectedType.toLowerCase() + "d";
    },
    dateTime() {
      return this.selectedHistory.timestamp || "";
    },
    author() {
      return this.selectedHistory.author || "";
    },
    description() {
      return this.selectedHistory.eventDescription;
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
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
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
