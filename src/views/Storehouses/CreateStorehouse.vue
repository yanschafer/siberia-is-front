<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <h3 class="storehouse-heading">Storehouse name</h3>
    <InputText
      :placeholder="namePlaceholder"
      class="input-wrapper animate__animated animate__fadeIn username-input"
      type="text"
      v-model="name"
    />
    <h3 class="storehouse-heading">Storehouse address</h3>
    <InputText
      :placeholder="addressPlaceholder"
      class="input-wrapper animate__animated animate__fadeIn username-input"
      type="text"
      v-model="address"
    />
    <MDBCol class="d-flex justify-content-start">
      <MDBBtn @click="cancelCreation" class="utility-btn" outline="black"
        >CANCEL</MDBBtn
      >
      <MDBBtn @click="saveCreation" class="utility-btn btn-black">SAVE</MDBBtn>
    </MDBCol>
  </MDBContainer>
</template>
<script lang="ts">
import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-vue-ui-kit";
import { IconMapPinFilled } from "@tabler/icons-vue";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { useStorehousesStore } from "@/stores/storehouse.store";

export default {
  name: "CreateStorehouse",
  components: {
    MDBInput,
    IconMapPinFilled,
    MDBContainer,
    MDBCol,
    MDBBtn,
    InputText,
  },
  setup() {
    const router = useRouter();
    const storehouseStore = useStorehousesStore();
    return { router, storehouseStore };
  },
  data: () => ({
    namePlaceholder: "Enter storehouse name",
    addressPlaceholder: "Enter storehouse address",
    name: "",
    address: "",
  }),
  methods: {
    async saveCreation() {
      const newStorehouse = {
        name: this.name,
        address: this.address,
      };
      const created = await this.storehouseStore.create(newStorehouse);
      if (created.success) {
        this.router.push({ name: "storehouses" });
      }
    },
    cancelCreation() {
      this.router.push({ name: "storehouses" });
    },
  },
};
</script>
<style scoped>
.storehouse-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: 4.5rem;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 2px;
  padding-right: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
  margin-top: 0.5rem;
}
:deep(.form-outline) {
  width: 100%;
  max-width: 10rem;
  background: #f8f8f8;
  border: 0;
  border-bottom: 2px solid #565656;
  height: 2rem;
  padding-top: 0 !important;
}
:deep(.form-control) {
  padding-top: 0.1rem;
}
:deep(#product-name-input) {
  width: 100%;
  max-width: 50vw !important;
}
:deep(.p-dropdown-label) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown) {
  width: 100%;
  max-width: fit-content;
}
:deep(.p-dropdown-filter) {
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
