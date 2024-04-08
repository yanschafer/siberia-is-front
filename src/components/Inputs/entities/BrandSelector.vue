<template>
  <SelectComponent
    :placeholder="placeholder"
    class="animate__animated animate__flipInX animate__faster"
    :class="{ 'p-invalid': !brandSelectorStore.validateRes }"
    :items="brandList"
    v-model="brandSelectorStore.value"
  />
  <DialogComponentTrigger
    :button-text="createButtonText"
    :init-object="initBrandDialog"
  />
</template>

<script lang="ts">
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import { useBrandStore } from "@/stores/brand.store";
import { useBrandSelectorStore } from "@/stores/components/brand-selector.store";
import BrandModel from "@/api/modules/brand/models/brand.model";
import PrintUtil from "@/utils/localization/print.util";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "BrandSelector",
  components: {
    SelectComponent,
    DialogComponentTrigger,
  },
  props: {
    initValue: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: "SELECT BRAND",
    },
  },
  emits: ["changed"],
  data() {
    return {
      createButtonText: "CREATE",
      initBrandDialog: {
        header: this.localize("createABrand"),
        inputName: this.localize("brandName"),
        model: new BrandModel(),
        methodOnSave: async (brand) => {
          const loadRes = await this.brandStore.loadBrandsList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.brandSelectorStore.value = brand;
        },
        methodOnClose: () => {},
        toastSuccessText: this.localize("brandIsCreated"),
        toastErrorText: this.localize("brandCreationFailed"),
      },
    };
  },
  mounted() {
    if (this.initValue) this.brandSelectorStore.value = { ...this.initValue };
  },
  async setup() {
    const brandStore = useBrandStore();
    const brandSelectorStore = useBrandSelectorStore();

    return {
      brandStore,
      brandSelectorStore,
      loadList: await brandStore.loadBrandsList(),
    };
  },
  created() {
    this.loadList.toastIfError(this.$toast, this.$nextTick);
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
  },
  computed: {
    brandList() {
      return this.brandStore.getBrandList;
    },
  },
};
</script>

<style scoped></style>
