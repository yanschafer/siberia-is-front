<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <div class="card">
    <TabView>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <template v-if="tab.id === 1">
          <DialogComponentTrigger
            button-text="CREATE"
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
            button-text="CREATE"
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
            button-text="CREATE"
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
  </div>
</template>

<script lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import TreeTableComponent from "@/components/Elements/TreeTableComponent.vue";
import { useBrandStore } from "@/stores/brand.store";
import { useCollectionStore } from "@/stores/collection.store";
import { useCategoriesStore } from "@/stores/categories.store";
import TableComponent from "@/components/Elements/TableComponent.vue";
import loggerUtil from "@/utils/logger/logger.util";
import { useModalStore } from "@/stores/modal.store";
import ModalComponent from "@/components/Elements/ModalComponent.vue";
import ApiResponseDto from "@/api/dto/api-response.dto";
import { useDialogStore } from "@/stores/dialog.store";
import CategoryModel from "@/api/modules/category/models/category.model";
import BrandModel from "@/api/modules/brand/models/brand.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import DialogComponentTrigger from "@/components/Elements/DialogComponentTrigger.vue";

export default {
  name: "AssortmentVue",
  components: {
    ModalComponent,
    TableComponent,
    TreeTableComponent,
    DialogComponentTrigger,
    TabView,
    TabPanel,
  },
  data() {
    return {
      editableColumns: ["name"],
      brandColumns: [{ field: "name", header: "NAME" }],
      tabs: [
        { id: 1, title: "Brands", content: "Tab 1 Content" },
        { id: 2, title: "Collections", content: "Tab 2 Content" },
        { id: 3, title: "Categories", content: "Tab 3 Content" },
      ],
      onDelete: {
        remove(modelId: number): Promise<ApiResponseDto<any>> {},
        loadList() {},
      },
      idOnDelete: 0,
      initCategoryDialog: {
        header: "Create a category",
        showSelect: true,
        selectItems: this.categoryList,
        selectName: "Select parent category",
        inputName: "Category name",
        methodOnSave: () => this.categoryStore.loadCategoriesList(),
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CategoryModel(),
      },
      initBrandDialog: {
        header: "Create a brand",
        inputName: "Brand name",
        model: new BrandModel(),
        methodOnSave: () => this.brandStore.loadBrandsList(),
        methodOnClose: () => loggerUtil.debug("workds"),
      },
      initCollectionDialog: {
        header: "Create a collection",
        inputName: "Collection name",
        methodOnSave: () => this.collectionStore.loadCollectionList(),
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
      },
    };
  },
  async setup() {
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoryStore = useCategoriesStore();
    const modalStore = useModalStore();
    const dialogStore = useDialogStore();
    await brandStore.loadBrandsList();
    await collectionStore.loadCollectionList();
    await categoryStore.loadCategoriesList();

    // await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));
    return {
      brandStore,
      categoryStore,
      collectionStore,
      modalStore,
      dialogStore,
    };
  },
  created() {
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
      }
    },
    deleteCollection(collectionRow) {
      loggerUtil.debug("Collection delete", collectionRow);
      this.onDelete = this.collectionStore;
      this.idOnDelete = collectionRow.id;
      this.showModal("collection", collectionRow.name);
    },
    deleteBrand(brandRow) {
      loggerUtil.debug("Brand delete", brandRow);
      this.onDelete = this.brandStore;
      this.idOnDelete = brandRow.id;
      this.showModal("brand", brandRow.name);
    },
    async editBrand(data) {
      if (data.name == "") {
        //TODO: Show error
        return;
      }
      const updated = await this.brandStore.update(data.id, data);
      if (updated.success) {
        await this.brandStore.loadBrandsList();
      } else {
        //TODO: Check errors
      }
    },
    async editCollection(data) {
      if (data.name == "") {
        //TODO: Show error
        return;
      }
      const updated = await this.collectionStore.update(data.id, data);
      if (updated.success) {
        await this.collectionStore.loadCollectionList();
      } else {
        //TODO: Check errors
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
        },
        { id: category.id, input: category.label, selected: category.parent },
        (state) => ({
          ...state.value,
        }),
      );
    },
    categoryOnSave() {
      this.categoryStore.loadCategoriesList();
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
    categoryOnRemove() {
      this.categoryStore.loadCategoriesList();
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
/* Add any necessary styles here */
</style>
