<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1
          class="username-heading"
          :style="showLink ? 'text-decoration: underline; cursor: pointer' : ''"
          @click="navigate"
        >
          {{ targetName }} -> {{ type }}
        </h1>
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
    <Button
      v-if="selectedHistory.canBeReset"
      class="btn btn-danger utility-btn"
      @click="discard"
      >Discard changes</Button
    >
  </MDBContainer>
  <MDBContainer class="pt-4">
    {{ description }}
    <ScrollPanel
        style="width: 88vw; height: 45vh;"
        class=" animate__animated animate__fadeIn"
    >
      <BeforeAfterComponent v-if="showBeforeAfter" />
      <TableComponent
          v-if="showTable"
          :infoMessage="noDataMessage"
          :rows="filteredRows"
          :columns="table.columns"
          :searchTerm="table.searchTerm"
      />
      <TabsComponent v-if="showRules" :roles="roles" />
    </ScrollPanel>

  </MDBContainer>
</template>

<script lang="ts">
import { MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import TabsComponent from "@/components/Inputs/TabsComponent.vue";
import { useHistoryStore } from "@/stores/history.store";
import { useRoute, useRouter } from "vue-router";
import PrintUtil from "@/utils/localization/print.util";
import BeforeAfterComponent from "@/views/History/BeforeAfterComponent.vue";
import { useHistoryEventStore } from "@/stores/components/history-event.store";
import Button from "primevue/button";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import LoggerUtil from "@/utils/logger/logger.util";
import ScrollPanel from "primevue/scrollpanel";

export default {
  name: "SingleHistoryView",
  components: {
    TableComponent,
    BeforeAfterComponent,
    TabsComponent,
    Button,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBBadge,
    MDBBtn,
    ScrollPanel
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    noDataMessage: {
      icon: "IconSearchOff",
      title: PrintUtil.localize("nothingWasFound", "product"),
      text: PrintUtil.localize("pleaseClarifyYourSearchQuery", "role"),
    },
  }),
  async setup() {
    const historyStore = useHistoryStore();
    const historyEventStore = useHistoryEventStore();
    const route = useRoute();
    const router = useRouter();
    const loaders = await Promise.all([
      historyStore.loadItem(parseInt(route.params.id.toString())),
    ]);
    return {
      historyStore,
      historyEventStore,
      router,
      loaders,
    };
  },
  async created() {
    const succeedLoad =
      this.loaders.filter((el) => {
        el.toastIfError(this.$toast, this.$nextTick);
        return el.success;
      }).length > 0;
    if (succeedLoad)
      await this.historyEventStore.init(this.historyStore.selectedItem);
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
    filteredRows() {
      if (!this.historyEventStore.showTable) return [];

      const searchTerm = this.historyEventStore.table.searchTerm;
      if (searchTerm.trim() === "") {
        return this.historyEventStore.tableRows;
      } else {
        return this.historyEventStore.tableRows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      }
    },
    showLink() {
      return !!this.historyEventStore.link;
    },
    link() {
      return this.historyEventStore.link;
    },
    showTable() {
      return this.historyEventStore.showTable;
    },
    showBeforeAfter() {
      return this.historyEventStore.showBeforeAfter;
    },
    showRules() {
      return this.historyEventStore.showRules;
    },
    table() {
      return this.historyEventStore.table;
    },
    roles() {
      return this.historyEventStore.rulesComponent.roles;
    },
  },
  methods: {
    localize(key, module = "history") {
      return PrintUtil.localize(key, module);
    },
    async discard() {
      const discarded = await this.historyStore.discard();
      if (discarded.success) {
        this.$toast.add({
          severity: "info",
          summary: "Success",
          detail: `Event successfully discarded`,
          life: 3000,
        });
        this.router.push({ name: "History" });
      } else discarded.toastIfError(this.$toast, this.$nextTick);
    },
    navigate() {
      if (this.showLink) this.router.push(this.link);
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
