<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">Group name</h1>
        <!-- TODO Переход на(хуй хаха) ApplyChangesView.vue -->
        <MDBBtn class="btn btn-outline-black utility-btn">APPLY CHANGES</MDBBtn>
      </MDBRow>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">Products list</h1>
    </MDBRow>
    <SearchComponent />
    <TableComponent />
  </MDBContainer>
</template>
<script lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";

export default {
  name: "SingleProductGroupView",
  components: {
    SearchComponent,
    TableComponent,
    MDBRow,
    MDBContainer,
    MDBCol,
    MDBBtn,
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
