<template>
  <ModalComponent
    v-if="modalStore.getIsVisible"
    @approved="removeAndCloseModal"
    @close="closeModal"
  />
  <div class="card">
    <TabView>
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <TreeTableComponent
          :editableColumns="editableColumns"
          :showEditColumn="true"
          :enableDelete="true"
          v-if="tab.id === 3"
          :nodes="transformCategoryList(categoryList)"
          @row-delete="deleteCategory"
        />
        <TableComponent
          v-if="tab.id === 1"
          :enableDelete="true"
          :rows="brandList"
          :editableColumns="editableColumns"
          :showEditColumn="true"
          :columns="brandColumns"
          edit-input-type="str"
          @row-delete="deleteBrand"
          @row-edit-save="editBrand"
        />
        <TableComponent
          v-if="tab.id === 2"
          :editableColumns="editableColumns"
          :showEditColumn="true"
          :enableDelete="true"
          :rows="collectionList"
          :columns="brandColumns"
          edit-input-type="str"
          @row-delete="deleteCollection"
          @row-edit-save="editCollection"
        />
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

export default {
  name: "AssortmentVue",
  components: {
    ModalComponent,
    TableComponent,
    TreeTableComponent,
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
    };
  },
  async setup() {
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoryStore = useCategoriesStore();
    const modalStore = useModalStore();
    await brandStore.loadBrandsList();
    await collectionStore.loadCollectionList();
    await categoryStore.loadCategoriesList();

    // await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));
    return {
      brandStore,
      categoryStore,
      collectionStore,
      modalStore,
    };
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
    deleteCategory(categoryRow) {
      loggerUtil.debug("Category delete", categoryRow);
      this.onDelete = this.categoryStore;
      this.idOnDelete = categoryRow.key;
      this.showModal("category", categoryRow.label);
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
    transformCategoryList(categoryList) {
      if (!categoryList || categoryList.length === 0) {
        return [];
      }

      const list = categoryList.map((category, index) => {
        loggerUtil.debug(category);
        return {
          key: category.key,
          data: {
            label: category.label || "",
            isEditable: "",
          },
          children: this.transformChildren(category.children),
        };
      });
      loggerUtil.debug(list);
      return list;
    },

    transformChildren(children) {
      if (!children || children.length === 0) {
        return [];
      }

      return children.map((child, index) => {
        return {
          key: child.key,
          name: child.label || "",
          data: {
            label: child.label || "",
            data: child.label || "",
            icon: child.icon,
            isEditable: "",
          },
          children: this.transformChildren(child.children),
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
