<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{operation}} from "{{from}}" to "{{to}}"</h1>
      </MDBRow>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">STATUS</span>
      <span class="username">{{ status }}</span>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">Products in {{operation}}</h1>
    </MDBRow>
    <SearchComponent />
    <TableComponent />
  </MDBContainer>
</template>
<script lang="ts">
import {MDBContainer, MDBRow} from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";

export default {
  name: 'SingleOperationView',
  components: {SearchComponent, TableComponent, MDBRow, MDBContainer},
  props: {
    operationsData: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    selectedOperation() {
      return this.operationsData.find((operation) => operation.id == this.id) || {};
    },
    operation() {
      return this.selectedOperation.operation || '';
    },
    from() {
      return this.selectedOperation.from || '';
    },
    to() {
      return this.selectedOperation.to || '';
    },
    status() {
      return this.selectedOperation.status || '';
    },
  }
}
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
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800!important;
}
:deep(.nav-link) {
  font-weight: 600!important;
}
</style>