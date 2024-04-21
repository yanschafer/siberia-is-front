<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <ScrollPanel
    style="height: 80vh; width: 88vw"
    class="main-area animate__animated animate__fadeIn"
  >
    <TabView>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <template v-if="tab.id === 1">
          <DialogComponentTrigger
            :button-text="localize('createPlusCapslock')"
            class="mb-2"
            :init-object="initBrandDialog"
          />
          <TableComponent
            :enableDelete="true"
            :rows="brandList"
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :columns="tableColumns"
            edit-input-type="str"
            @row-delete="deleteBrand"
            @row-edit-save="editBrand"
          />
        </template>
        <template v-if="tab.id === 2">
          <DialogComponentTrigger
            :button-text="localize('createPlusCapslock')"
            :init-object="initCollectionDialog"
          />
          <TableComponent
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :enableDelete="true"
            :rows="collectionList"
            :columns="tableColumns"
            edit-input-type="str"
            @row-delete="deleteCollection"
            @row-edit-save="editCollection"
          />
        </template>
        <template v-if="tab.id === 3">
          <DialogComponentTrigger
            :button-text="localize('createPlusCapslock')"
            :init-object="initCategoryDialog"
          />
          <TreeTableComponent
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :enableDelete="true"
            :nodes="transformCategoryList(categoryList)"
            @row-delete="startRemoveCategory"
            @row-edit="startEditCategory"
          />
        </template>
      </TabPanel>
    </TabView>
  </ScrollPanel>
</template>

<script lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import TreeTableComponent from "@/components/Elements/Tables/TreeTableComponent.vue";
import { useBrandStore } from "@/stores/brand.store";
import { useCollectionStore } from "@/stores/collection.store";
import { useCategoriesStore } from "@/stores/categories.store";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import loggerUtil from "@/utils/logger/logger.util";
import { useModalStore } from "@/stores/modal.store";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";
import ApiResponseDto from "@/api/dto/api-response.dto";
import { useDialogStore } from "@/stores/dialog.store";
import CategoryModel from "@/api/modules/category/models/category.model";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import ScrollPanel from "primevue/scrollpanel";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import PrintUtil from "@/utils/localization/print.util";

export default {
  name: "AssortmentVue",
  components: {
    ModalComponent,
    TableComponent,
    TreeTableComponent,
    DialogComponentTrigger,
    TabView,
    TabPanel,
    ScrollPanel,
  },
  data() {
    return {
      editableColumns: ["name"],
      tableColumns: [
        { field: "name", header: this.localize("tableNameHeader") },
      ],
      onDelete: {
        remove(modelId: number): Promise<ApiResponseDto<any>> {},
        loadList() {},
      },
      idOnDelete: 0,
      toastOnSuccess: "",
      toastOnError: "",
      initCategoryDialog: {
        header: this.localize("modalHeaderCreateCategory"),
        showSelect: true,
        selectItems: this.categoryList,
        selectName: this.localize("selectName"),
        inputName: this.localize("inputNameCategory"),
        methodOnSave: async () => {
          const loadRes = await this.categoryStore.loadCategoriesList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.initCategoryDialog.selectItems = this.categoryList;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
        toastSuccessText: this.localize("toastSuccessCreationCategory"),
        toastErrorText: this.localize("toastErrorCreationCategory"),
      },
      initBrandDialog: {
        header: this.localize("modalHeaderCreateBrand"),
        inputName: this.localize("inputNameBrand"),
        model: new BrandModel(),
        methodOnSave: async () => {
          const loadRes = await this.brandStore.loadBrandsList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        toastSuccessText: this.localize("toastSuccessCreationBrand"),
        toastErrorText: this.localize("toastErrorCreationBrand"),
      },
      initCollectionDialog: {
        header: this.localize("modalHeaderCreateCollection"),
        inputName: this.localize("inputNameCollection"),
        methodOnSave: async () => {
          const loadRes = await this.collectionStore.loadCollectionList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
        toastSuccessText: this.localize("toastSuccessCreationCollection"),
        toastErrorText: this.localize("toastErrorCreationCollection"),
      },
    };
  },
  async setup() {
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoryStore = useCategoriesStore();
    const modalStore = useModalStore();
    const dialogStore = useDialogStore();
    const authCheckStore = useAuthCheckStore();

    const loaders = await Promise.all([
      brandStore.loadBrandsList(),
      collectionStore.loadCollectionList(),
      categoryStore.loadCategoriesList(),
    ]);

    return {
      brandStore,
      categoryStore,
      collectionStore,
      modalStore,
      dialogStore,
      loaders,
      authCheckStore,
    };
  },
  async created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));

    this.initCategoryDialog.selectItems = this.categoryList;
  },
  methods: {
    localize(key, module = "assortment") {
      return PrintUtil.localize(key, module);
    },
    showModal(type, name) {
      this.modalStore.show({
        title: this.localize("confirmModalTitle"),
        text: `${this.localize("confirmModalText")} ${this.localize(type)} "${name}"`,
        disclaimer: `${this.localize("confirmModalDisclaimer")} ${type} ${this.localize("dataWillBeLostText")}`,
      });
    },
    closeModal() {
      this.modalStore.hide();
    },
    async removeAndCloseModal() {
      const removed = await this.onDelete.remove(this.idOnDelete);
      if (removed.success) {
        this.modalStore.hide();
        await this.onDelete.loadList();
        this.$toast.add({
          severity: "success",
          summary: this.localize("Success"),
          detail: this.toastOnSuccess,
          life: 3000,
        });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
    deleteCollection(collectionRow) {
      this.toastOnSuccess = this.localize("collectionRemoveSuccessToast");
      this.onDelete = this.collectionStore;
      this.idOnDelete = collectionRow.id;
      this.showModal("collection", collectionRow.name);
    },
    deleteBrand(brandRow) {
      this.toastOnSuccess = this.localize("brandRemoveSuccessToast");
      this.onDelete = this.brandStore;
      this.idOnDelete = brandRow.id;
      this.showModal("brand", brandRow.name);
    },
    showErrorToast() {
      this.$toast.add({
        severity: "error",
        summary: PrintUtil.localize("validateError", "components"),
        detail: PrintUtil.localize("checkDataProvided", "components"),
        life: 3000,
      });
    },
    async editBrand(data) {
      if (data.name == "") {
        this.showErrorToast();
        return;
      }
      const updated = await this.brandStore.update(data.id, data);
      if (updated.success) {
        this.$toast.add({
          severity: "success",
          summary: this.localize("Success"),
          detail: this.localize("brandUpdatedSuccessToast"),
          life: 3000,
        });
        const loadListRes = await this.brandStore.loadBrandsList();
        loadListRes.toastIfError(this.$toast, this.$nextTick);
      } else {
        updated.toastIfError(this.$toast, this.$nextTick);
      }
    },
    async editCollection(data) {
      if (data.name == "") {
        this.showErrorToast();
        return;
      }
      const updated = await this.collectionStore.update(data.id, data);
      if (updated.success) {
        this.$toast.add({
          severity: "success",
          summary: this.localize("Success"),
          detail: this.localize("collectionUpdatedSuccessToast"),
          life: 3000,
        });
        const loadListRes = await this.collectionStore.loadCollectionList();
        loadListRes.toastIfError(this.$toast, this.$nextTick);
      } else {
        updated.toastIfError(this.$toast, this.$nextTick);
      }
    },
    startEditCategory(category) {
      this.dialogStore.show(
        {
          header: `${this.localize("editCategoryHeader")} ${category.label}`,
          showSelect: true,
          selectItems: this.categoryList,
          selectName: this.localize("selectName"),
          inputName: this.localize("inputNameCategory"),
          model: new CategoryModel(),
          methodOnSave: this.categoryOnSave,
          methodOnClose: () => {},
          toastSuccessText: this.localize("toastSuccessUpdateCategory"),
          toastErrorText: this.localize("toastErrorUpdateCategory"),
        },
        { id: category.id, input: category.label, selected: category.parent },
        (state) => ({
          name: state.value.name,
          parent: state.value.parent ? parseInt(state.value.parent) : 0,
        }),
      );
    },
    async categoryOnSave() {
      const loadRes = await this.categoryStore.loadCategoriesList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
      this.initCategoryDialog.selectItems = this.categoryList;
    },
    startRemoveCategory(category) {
      this.dialogStore.show(
        {
          header: `${this.localize("removeCategoryHeader")} ${category.label}`,
          showSelect: true,
          selectItems: this.categoryList,
          selectName: this.localize("selectName"),
          inputName: this.localize("inputNameCategory"),
          model: new CategoryModel(),
          methodOnSave: this.categoryOnRemove,
          methodOnClose: () => {},
          toastSuccessText: this.localize("toastSuccessRemoveCategory"),
          toastErrorText: this.localize("toastErrorRemoveCategory"),
        },
        null,
        (state) => ({
          removeChildren: !state.value.checkbox,
          transferChildrenTo: state.value.parent,
        }),
        { id: category.id, input: category.label, selected: category.parent },
        false,
        true,
        {
          true: this.localize("checkBoxParentValueRemove"),
          false: this.localize("checkBoxParentValueMoveToNew"),
        },
      );
    },
    async categoryOnRemove() {
      const loadRes = await this.categoryStore.loadCategoriesList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
      this.initCategoryDialog.selectItems = this.categoryList;
    },
    transformCategoryList(categoryList) {
      if (!categoryList || categoryList.length === 0) {
        return [];
      }

      const list = categoryList.map((category, index) => {
        return {
          id: category.key,
          key: category.key,
          label: category.label || "",
          data: {
            id: category.key,
            label: category.label || "",
            isEditable: "",
          },
          children: this.transformChildren(category.key, category.children),
        };
      });
      return list;
    },

    transformChildren(parent, children) {
      if (!children || children.length === 0) {
        return [];
      }

      return children.map((child, index) => {
        return {
          id: child.key,
          key: child.key,
          name: child.label || "",
          parent,
          label: child.label || "",
          data: {
            parent,
            label: child.label || "",
            data: child.label || "",
            icon: child.icon,
            isEditable: "",
          },
          children: this.transformChildren(child.key, child.children),
        };
      });
    },
  },
  computed: {
    tabs() {
      return this.authCheckStore.getAssortmentTabs;
    },
    categoryList() {
      return this.categoryStore.getCategoryList;
    },
    brandList() {
      return this.brandStore.getBrandList;
    },
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
  },
};
</script>

<style scoped>
.card-body {
  width: 86vw;
}
</style>
