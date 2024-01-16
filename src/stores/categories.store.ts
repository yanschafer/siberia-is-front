import { defineStore } from "pinia";
import CategoryModel from "@/api/modules/category/models/category.model";
import CategoryRemoveDto from "@/api/modules/category/dto/category-remove.dto";

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    searchTerm: "",
    categoryItems: [],
  }),
  getters: {
    getCategoryList: (state) => state.categoryItems,
  },
  actions: {
    async loadList() {
      await this.loadCategoriesList();
    },
    async loadCategoriesList() {
      const categoriesModel = new CategoryModel();
      const categoryList = await categoriesModel.getAll();
      if (categoryList.success) {
        this.categoryItems = this.transformCategoriesData(
          categoryList.getData(),
          0,
        );
      }
      return categoryList;
    },

    transformCategoriesData(data, level) {
      return data.map((category) => {
        const hasChildren = category.children && category.children.length > 0;
        const icon = this.getIconForLevel(level, hasChildren);

        return {
          key: category.id,
          label: category.name,
          icon: icon,
          children: this.transformCategoriesData(
            category.children || [],
            level + 1,
          ),
        };
      });
    },

    getIconForLevel(level, hasChildren) {
      if (level === 0) {
        return "pi pi-fw pi-folder";
      } else if (hasChildren) {
        return "pi pi-fw pi-folder-open";
      } else {
        return "pi pi-fw pi-star-fill";
      }
    },

    async remove(categoryId: number, deleteConfig: CategoryRemoveDto) {
      const categoryModel = new CategoryModel();
      return await categoryModel.remove(categoryId, deleteConfig);
    },
  },
});
