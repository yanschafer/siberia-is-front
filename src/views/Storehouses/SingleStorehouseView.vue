<template>
  <ModalComponent v-if="showModal" @closeModal="closeModal" />
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <h1 v-if="!editing" class="storehouse-heading">{{ storehouseName }}</h1>
    <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newStorehouseName" />
    <span v-if="!editing" class="storehouse-adress">
    <IconMapPinFilled color="#4E4E4E" :size="24" stroke-width="1" />
      {{ storehouseAdress }}
    </span>
    <MDBInput v-else class="input-wrapper animate__animated animate__fadeIn username-input" type="text" v-model="newStorehouseAdress" />
    <MDBBtn v-if="!editing" @click="startEditing" class="utility-btn" outline="black">Edit storehouse</MDBBtn>
    <MDBCol v-else class="d-flex justify-content-start">
      <MDBBtn @click="cancelEditing" class="utility-btn" outline="black">CANCEL</MDBBtn>
      <MDBBtn @click="openDeleteModal" class="utility-btn btn-danger">DELETE STOREHOUSE</MDBBtn>
      <MDBBtn @click="saveChanges" class="utility-btn btn-black">SAVE</MDBBtn>
    </MDBCol>
  </MDBContainer>
  <MDBContainer class="d-flex flex-column gap-3">
    <MDBRow class="d-flex flex-row w-100 align-items-center align-self-center gap-3 pt-4">
      <h1 class="storehouse-heading">Products in stock</h1>
      <MDBBtn class="utility-btn" outline="black">+ NEW ARRIVAL</MDBBtn>
      <MDBBtn class="utility-btn" outline="black">+ NEW SALE</MDBBtn>
      <MDBBtn class="utility-btn" outline="black">+ REQUEST</MDBBtn>
      <SearchComponent class="search" @search="handleSearch" />
    </MDBRow>
    <TableComponent class="table" :rows="productRows" :columns="productColumns" :searchTerm="searchTerm" />
  </MDBContainer>
</template>

<script lang="ts">
import { IconMapPinFilled, IconRoute } from '@tabler/icons-vue';
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import ModalComponent from "@/components/Elements/ModalComponent.vue";


export default {
  name: "SingleStorehouseView",
  components: {
    MDBCol,
    MDBInput, SearchComponent, TableComponent, IconRoute, IconMapPinFilled, MDBBtn, MDBContainer, MDBRow,
    ModalComponent
  },
  props: {
    storehousesData: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    selectedStorehouse() {
      return this.storehousesData.find(storehouse => storehouse.id === this.id) || {};
    },
    storehouseName() {
      return this.selectedStorehouse.storehouseName || '';
    },
    storehouseAdress() {
      return this.selectedStorehouse.storehouseAdress || '';
    },
  },
  data() {
    return {
      editing: false,
      showModal: false,
      searchTerm: '',
      newStorehouseName: '',
      originalStorehouseName: '',
      newStorehouseAdress: '',
      originalStorehouseAdress: '',
    }
  },
  methods: {
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    openDeleteModal() {
      this.showModal = true;
    },
    closeModal() {
      console.log('closeModal called');
      this.showModal = false;
    },
    startEditing() {
      this.editing = true;
      this.originalStorehouseName = this.storehouseName;
      this.newStorehouseName = this.storehouseName;
      this.originalStorehouseAdress = this.storehouseAdress;
      this.newStorehouseAdress = this.storehouseAdress;
    },
    saveChanges() {
      this.editing = false;
      this.originalStorehouseName = this.storehouseName;
      this.originalStorehouseAdress = this.storehouseAdress;
    },
    cancelEditing() {
      this.editing = false;
    },
  }
}
</script>

<style scoped>
.table {
  margin-top: 2rem;
}
.storehouse-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
}
.storehouse-adress {
  font-weight: 500;
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
.storehouse-info {
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2rem;
}
.search {
  width: 100%;
  max-width: 35vw;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>