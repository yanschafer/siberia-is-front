<template>
  <TreeDropdownComponent
    :placeholder="placeholder"
    class="animate__animated animate__flipInX animate__faster"
    :class="{ 'p-invalid': !categorySelectorStore.validateRes }"
    :nodes="categoryList"
    v-model="categorySelectorStore.value"
  />
  <DialogComponentTrigger
    :button-text="createButtonText"
    :init-object="initCategoryDialog"
  />
</template>

<script lang="ts">
import TreeDropdownComponent from "@/components/Elements/Selectors/TreeDropdownComponent.vue";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import PrintUtil from "@/utils/localization/print.util";
import loggerUtil from "@/utils/logger/logger.util";
import CategoryModel from "@/api/modules/category/models/category.model";
import { useCategoriesStore } from "@/stores/categories.store";
import { useCategorySelectorStore } from "@/stores/components/category-selector.store";

export default {
  name: "CategorySelector",
  components: {
    TreeDropdownComponent,
    DialogComponentTrigger,
  },
  props: {
    initValue: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: "SELECT COLLECTION",
    },
  },
  emits: ["changed"],
  data() {
    return {
      createButtonText: "CREATE",
      initCategoryDialog: {
        header: this.localize("createACategory"),
        showSelect: true,
        selectItems: this.categoryList,
        selectName: this.localize("selectParentCategory"),
        inputName: this.localize("categoryName"),
        methodOnSave: async (category) => {
          const loadRes = await this.categoryStore.loadCategoriesList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.initCategoryDialog.selectItems = this.categoryList;
          this.$nextTick(() => {
            this.categorySelectorStore.value = category.id;
          });
        },
        methodOnClose: () => {},
        model: new CategoryModel(),
        toastSuccessText: this.localize("categoryIsCreated"),
        toastErrorText: this.localize("categoryCreationFailed"),
      },
    };
  },
  async setup() {
    const categoryStore = useCategoriesStore();
    const categorySelectorStore = useCategorySelectorStore();

    return {
      categoryStore,
      categorySelectorStore,
      loadList: await categoryStore.loadCategoriesList(),
    };
  },
  created() {
    this.initCategoryDialog.selectItems = this.categoryList;
    this.loadList.toastIfError(this.$toast, this.$nextTick);
    if (this.initValue) this.categorySelectorStore.value = this.initValue;
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
  },
  computed: {
    categoryList() {
      return this.categoryStore.getCategoryList;
    },
  },
};
</script>

<style scoped></style>
