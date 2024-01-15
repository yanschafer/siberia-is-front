<template>
  <ModalComponent
      v-if="modalStore.getIsVisible"
  />
  <div class="card">
    <TreeTable :value="nodes" editMode="row" :paginator="true" rows="6" scrollable scrollHeight="60vh">
      <Column field="label" header="NAME" expander>
        <template #editor="{ data, field }">
          <InputNumber size="small" class="animate__animated animate__fadeIn number w-auto" v-if="isEditable(field)"  v-model="data[field]" />
          <div class="animate__animated animate__fadeIn" v-else>{{ data[field] }}</div>
        </template>
      </Column>
      <div class="container-fluid">
        <Column
            field="isEditable" header="EDIT"
            v-if="showEditColumn"
            class="animate__animated animate__fadeIn utility-col"
            :rowEditor="true"
            style="width: 5rem; min-width: 8rem"
            bodyStyle="text-align:center">
        </Column>
        <Column headerStyle="width: 10rem">
          <template #body>
            <div class="flex flex-wrap gap-2">
              <MDBBtn @click="confirmDeletion" type="button" class="utility-btn btn-danger">DELETE</MDBBtn>
            </div>
          </template>
        </Column>
      </div>
    </TreeTable>
  </div>
</template>

<script lang="ts">
import {MDBBtn} from "mdb-vue-ui-kit";
import TreeTable from "primevue/treetable";
import Column from 'primevue/column';
import Button from 'primevue/button'
import ModalComponent from "@/App.vue";
import {useModalStore} from "@/stores/modal.store";
export default {
  name: "TreeTableComponent",
  components: {
    ModalComponent,
    TreeTable,
    Column,
    Button,
    MDBBtn
  },
  props: {
    nodes: Array,
    showEditColumn: Boolean,
  },
  async setup () {
    const modalStore = useModalStore();
    return {
      modalStore,
    }
  },
  methods: {
    isEditable(columnField) {
      return this.editableColumns && this.editableColumns.includes(columnField);
    },
    handleRowClick(event) {
      if (!event.originalEvent.target.classList.contains('utility-col')) {
        const selectedRow = event.data;
        this.$emit('rowClick', selectedRow);
      }
    },
  },
};
</script>
<style scoped>
</style>
