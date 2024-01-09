import { defineStore } from "pinia";
import CategoryModel from "@/api/modules/category/models/category.model";

export const useCategoriesStore = defineStore({
    id: 'categories',
    state: () => ({
        searchTerm: '',
        categoriesItems: [],
    }),
    getters: {
        getCategoriesList: (state) => {
            return () => state.categoriesItems;
        },
    },
    actions: {
        async loadCategoriesList() {
            const categoriesModel = new CategoryModel();
            try {
                const categoriesList = await categoriesModel.getAll();
                if (categoriesList.success) {
                    const transformedCategories = this.transformCategoriesData(categoriesList.getData(), 0);
                    this.categoriesItems = transformedCategories;
                } else {
                    console.error("Failed to load categories list");
                }
            } catch (error) {
                console.error("An error occurred while loading categories list:", error);
            }
        },

        transformCategoriesData(data, level) {
            return data.map(category => {
                const hasChildren = category.children && category.children.length > 0;
                const icon = this.getIconForLevel(level, hasChildren);

                return {
                    key: category.id,
                    label: category.name,
                    icon: icon,
                    children: this.transformCategoriesData(category.children || [], level + 1),
                };
            });
        },

        getIconForLevel(level, hasChildren) {
            if (level === 0) {
                return 'pi pi-fw pi-folder';
            } else if (hasChildren) {
                return 'pi pi-fw pi-folder-open';
            } else {
                return 'pi pi-fw pi-star-fill';
            }
        },
    },
});
