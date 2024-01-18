<template>
  <MDBContainer class="storehouse-info d-flex flex-column gap-3">
    <h3 class="storehouse-heading">{{ localize("storehouseName") }}</h3>
    <InputText
      :placeholder="namePlaceholder"
      class="input-wrapper animate__animated animate__fadeIn username-input"
      :class="{ 'p-invalid': !validate.name }"
      type="text"
      v-model="name"
    />
    <h3 class="storehouse-heading">{{ localize("storehouseAddress") }}</h3>
    <InputText
      :placeholder="addressPlaceholder"
      class="input-wrapper animate__animated animate__fadeIn username-input"
      :class="{ 'p-invalid': !validate.address }"
      type="text"
      v-model="address"
    />
    <MDBCol class="d-flex justify-content-start">
      <MDBBtn @click="cancelCreation" class="utility-btn" outline="black">{{
        localize("cancelCapslock", "default")
      }}</MDBBtn>
      <MDBBtn @click="saveCreation" class="utility-btn btn-black">{{
        localize("saveCapslock", "default")
      }}</MDBBtn>
    </MDBCol>
  </MDBContainer>
</template>
<script lang="ts">
import { MDBBtn, MDBCol, MDBContainer, MDBInput } from "mdb-vue-ui-kit";
import { IconMapPinFilled } from "@tabler/icons-vue";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { useStorehousesStore } from "@/stores/storehouse.store";
import PrintUtil from "@/utils/localization/print.util";
import ValidatorUtil from "@/utils/validator/validator.util";
import ValidateRule from "@/utils/validator/validate-rule";

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
  data() {
    return {
      namePlaceholder: this.localize("enterStorehouseName"),
      addressPlaceholder: this.localize("enterStorehouseAddress"),
      name: "",
      address: "",
      validate: {
        name: true,
        address: true,
      },
      validator: new ValidatorUtil(),
    };
  },
  setup() {
    const router = useRouter();
    const storehouseStore = useStorehousesStore();
    return { router, storehouseStore };
  },
  created() {
    const nameValidateRule = new ValidateRule().required();
    const addressValidateRule = new ValidateRule().required();

    this.validator = this.validator
      .addRule("name", nameValidateRule)
      .addRule("address", addressValidateRule);
  },
  methods: {
    localize(key, module = "storehouses") {
      return PrintUtil.localize(key, module);
    },
    showSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success"),
        detail: this.localize("storehouseCreationSuccess"),
        life: 3000,
      });
    },
    async saveCreation() {
      const newStorehouse = {
        name: this.name,
        address: this.address,
      };

      const validateRes = this.validator.validate(newStorehouse);
      if (validateRes !== true) {
        this.validate = validateRes;
        this.validator.showErrorToast(this.$toast);
        return;
      }

      const created = await this.storehouseStore.create(newStorehouse);
      if (created.success) {
        this.showSuccessToast();
        this.router.push({ name: "storehouses" });
      } else {
        created.toastIfError(this.$toast, this.$nextTick);
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
