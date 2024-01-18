<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <ScrollPanel
    style="height: 80vh"
    class="main-area animate__animated animate__fadeIn"
  >
    <TabView>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <template v-if="tab.id === 1">
          <DialogComponentTrigger
            button-text="CREATE +"
            class="mb-2"
            :init-object="initBrandDialog"
          />
          <TableComponent
            :enableDelete="true"
            :rows="brandList"
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :columns="brandColumns"
            edit-input-type="str"
            @row-delete="deleteBrand"
            @row-edit-save="editBrand"
          />
        </template>
        <template v-if="tab.id === 2">
          <DialogComponentTrigger
            button-text="CREATE +"
            :init-object="initCollectionDialog"
          />
          <TableComponent
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :enableDelete="true"
            :rows="collectionList"
            :columns="brandColumns"
            edit-input-type="str"
            @row-delete="deleteCollection"
            @row-edit-save="editCollection"
          />
        </template>
        <template v-if="tab.id === 3">
          <DialogComponentTrigger
            button-text="CREATE +"
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
      brandColumns: [{ field: "name", header: "NAME" }],
      onDelete: {
        remove(modelId: number): Promise<ApiResponseDto<any>> {},
        loadList() {},
      },
      idOnDelete: 0,
      toastOnSuccess: "",
      toastOnError: "",
      initCategoryDialog: {
        header: "Create a category",
        showSelect: true,
        selectItems: this.categoryList,
        selectName: "Select parent category",
        inputName: "Category name",
        methodOnSave: async () => {
          const loadRes = await this.categoryStore.loadCategoriesList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          this.initCategoryDialog.selectItems = this.categoryList;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
        toastSuccessText: "Category is created",
        toastErrorText: "Category creation failed",
      },
      initBrandDialog: {
        header: "Create a brand",
        inputName: "Brand name",
        model: new BrandModel(),
        methodOnSave: async () => {
          const loadRes = await this.brandStore.loadBrandsList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        toastSuccessText: "Brand is created",
        toastErrorText: "Brand creation failed",
      },
      initCollectionDialog: {
        header: "Create a collection",
        inputName: "Collection name",
        methodOnSave: async () => {
          const loadRes = await this.collectionStore.loadCollectionList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
        toastSuccessText: "Collection is created",
        toastErrorText: "Collection creation failed",
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

    // await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));
    return {
      brandStore,
      categoryStore,
      collectionStore,
      modalStore,
      dialogStore,
      loadBrandRes: await brandStore.loadBrandsList(),
      loadCollectionRes: await collectionStore.loadCollectionList(),
      loadCategoryRes: await categoryStore.loadCategoriesList(),
      authCheckStore,
    };
  },
  created() {
    this.loadBrandRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCollectionRes.toastIfError(this.$toast, this.$nextTick);
    this.loadCategoryRes.toastIfError(this.$toast, this.$nextTick);

    this.initCategoryDialog.selectItems = this.categoryList;
  },
  methods: {
    showModal(type, name) {
      this.modalStore.show({
        title: "Confirm deletion",
        text: `Are you sure you want to delete ${type} ${name}`,
        disclaimer: `This action cannot be undone, this ${type} data will be lost`,
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
          summary: "Success",
          detail: this.toastOnSuccess,
          life: 3000,
        });
      } else {
        removed.toastIfError(this.$toast, this.$nextTick);
      }
    },
    deleteCollection(collectionRow) {
      loggerUtil.debug("Collection delete", collectionRow);
      this.toastOnSuccess = "Collection is removed";
      this.onDelete = this.collectionStore;
      this.idOnDelete = collectionRow.id;
      this.showModal("collection", collectionRow.name);
    },
    deleteBrand(brandRow) {
      loggerUtil.debug("Brand delete", brandRow);
      this.toastOnSuccess = "Brand is removed";
      this.onDelete = this.brandStore;
      this.idOnDelete = brandRow.id;
      this.showModal("brand", brandRow.name);
    },
    showErrorToast() {
      this.$toast.add({
        severity: "warning",
        summary: "Validate error",
        detail: "Check data provided",
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
          summary: "Success",
          detail: "Brand is updated",
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
          summary: "Success",
          detail: "Collection is updated",
          life: 3000,
        });
        const loadListRes = await this.collectionStore.loadCollectionList();
        loadListRes.toastIfError(this.$toast, this.$nextTick);
      } else {
        updated.toastIfError(this.$toast, this.$nextTick);
      }
    },
    startEditCategory(category) {
      loggerUtil.debug("START EDITING", category);
      this.dialogStore.show(
        {
          header: `Edit category ${category.label}`,
          showSelect: true,
          selectItems: this.categoryList,
          selectName: "Parent category",
          inputName: "Category name",
          model: new CategoryModel(),
          methodOnSave: this.categoryOnSave,
          methodOnClose: () => {},
          toastSuccessText: "Category is updated",
          toastErrorText: "Failed update category",
        },
        { id: category.id, input: category.label, selected: category.parent },
        (state) => ({
          ...state.value,
        }),
      );
    },
    async categoryOnSave() {
      const loadRes = await this.categoryStore.loadCategoriesList();
      loadRes.toastIfError(this.$toast, this.$nextTick);
      this.initCategoryDialog.selectItems = this.categoryList;
    },
    startRemoveCategory(category) {
      loggerUtil.debug("Category delete", category);
      this.dialogStore.show(
        {
          header: `Remove category ${category.label}`,
          showSelect: true,
          selectItems: this.categoryList,
          selectName: "Parent category",
          inputName: "Category name",
          model: new CategoryModel(),
          methodOnSave: this.categoryOnRemove,
          methodOnClose: () => {},
          toastSuccessText: "Category is removed",
          toastErrorText: "Failed remove category",
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
          false: "Remove children",
          true: "Move children to new parent",
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
