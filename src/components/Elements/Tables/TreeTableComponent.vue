<template>
  <TreeTable
    class="animate__animated animate__fadeIn"
    :value="nodes"
    :paginator="true"
    :rows="6"
    scrollable
    scrollHeight="60vh"
    selectionMode="single"
    v-model:selectionKeys="selectedKey"
    v-if="nodes.length"
  >
    <Column class="name-col" field="label" header="NAME" expander></Column>
    <Column
      style="justify-content: center"
      class="table-header"
      v-if="showEditColumn"
    >
      <template #body>
        <div class="flex flex-wrap gap-2">
          <MDBBtn
            @click="emitEdit"
            type="button"
            class="utility-btn"
            outline="black"
            >{{ localize("editCapslock") }}</MDBBtn
          >
        </div>
      </template>
    </Column>
    <Column v-if="enableDelete" class="table-header">
      <template #body>
        <div class="flex flex-wrap gap-2">
          <MDBBtn
            @click="emitDelete"
            type="button"
            class="utility-btn btn-danger"
            >{{ localize("deleteCapslock") }}</MDBBtn
          >
        </div>
      </template>
    </Column>
  </TreeTable>
  <div v-else>
    <InfoMessageComponent
      :infoIcon="infoMessage.icon"
      :infoTitle="infoMessage.title"
      :infoText="infoMessage.text"
    />
  </div>
</template>

<script lang="ts">
import { MDBBtn } from "mdb-vue-ui-kit";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";
import InfoMessageComponent from "@/components/Elements/Dialogs/InfoMessageComponent.vue";

export default {
  name: "TreeTableComponent",
  components: {
    InputText,
    TreeTable,
    Column,
    Button,
    MDBBtn,
    InfoMessageComponent,
  },
  props: {
    nodes: Array,
    showEditColumn: Boolean,
    enableDelete: Boolean,
    editableColumns: Array,
    infoMessage: {
      type: Object,
      required: false,
      default: {
        icon: "IconSearchOff",
        title: PrintUtil.localize("nothingFound"),
        text: PrintUtil.localize("nothingFoundClarifyQuery"),
      },
    },
  },
  data: () => ({
    deleteClick: false,
    editClick: false,
    editingRows: [],
    currentPage: 1,
    itemsPerPage: 7,
    selectedKey: null,
    selectedKeyOrigin: null,
  }),
  emits: ["rowDelete", "rowEdit"],
  created() {
    this.$watch("selectedKey", async () => {
      loggerUtil.debug("this.selectedKey");
      if (Object.values(this.selectedKey).length)
        this.selectedKeyOrigin = this.selectedKey;

      loggerUtil.debug(this.selectedKeyOrigin);
      let item = this.findRecursive(
        Object.keys(this.selectedKeyOrigin)[0],
        this.nodes,
      );

      if (!item) return;

      const data = { ...item, ...item.data };

      loggerUtil.debug("DATA", item);
      if (this.deleteClick) {
        this.$emit("rowDelete", data);
        this.deleteClick = false;
        return;
      }
      if (this.editClick) {
        this.$emit("rowEdit", data);
        this.editClick = false;
        return;
      }
    });
  },
  methods: {
    localize(key, module = "default") {
      return PrintUtil.localize(key, module);
    },
    findRecursive(id, arr) {
      if (!arr || arr.length == 0) return null;
      for (let el of arr) {
        if (el.key == id) {
          return el;
        } else {
          const res = this.findRecursive(id, el.children);
          if (res) return res;
        }
      }
      return null;
    },
    isEditable(columnField) {
      return this.editableColumns && this.editableColumns.includes(columnField);
    },
    handleRowClick(event) {
      if (!event.originalEvent.target.classList.contains("utility-col")) {
        const selectedRow = event.data;
        this.$emit("rowClick", selectedRow);
      }
    },
    emitDelete(event) {
      this.deleteClick = true;
      event.target.parentElement.parentElement.parentElement.click();
    },
    emitEdit(event) {
      this.editClick = true;
      event.target.parentElement.parentElement.parentElement.click();
    },
  },
};
</script>
<style scoped>
.table-header {
}
.message-heading {
  color: #b8b8b8;
}
.message-container {
  height: 50vh;
}
</style>
