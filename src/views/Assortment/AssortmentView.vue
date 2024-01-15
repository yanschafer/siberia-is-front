<template>
  <div class="card">
    <TabView>
      <TabPanel
          v-for="tab in tabs"
          :key="tab.title"
          :header="tab.title">
        <TreeTableComponent
            class="animate__animated animate__fadeIn"
            :editableColumns="editableColumns"
            :showEditColumn="true"
            v-if="tab.title === 'Categories'"
            :nodes="transformCategoryList(categoryList)" />
        <TableComponent
            v-if="tab.title === 'Brands'"
            :rows="brandList"
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :columns="brandColumns"/>
        <TableComponent
            v-if="tab.title === 'Collections'"
            :editableColumns="editableColumns"
            :showEditColumn="true"
            :rows="collectionList"
            :columns="brandColumns"/>
      </TabPanel>
    </TabView>
  </div>
</template>

<script lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TreeTableComponent from "@/components/Elements/TreeTableComponent.vue";
import {useProductsStore} from "@/stores/products.store";
import {useBrandStore} from "@/stores/brand.store";
import {useCollectionStore} from "@/stores/collection.store";
import {useCategoriesStore} from "@/stores/categories.store";
import {useRoute, useRouter} from "vue-router";
import TableComponent from "@/components/Elements/TableComponent.vue";

export default {
  name: 'AssortmentVue',
  components: {
    TableComponent,
    TreeTableComponent,
    TabView,
    TabPanel
  },
  data() {
    return {
      editableColumns: ["name"],
      brandColumns: [
        { field: "name", header: "NAME" },
      ],
      tabs: [
        { title: 'Brands', content: 'Tab 1 Content' },
        { title: 'Collections', content: 'Tab 2 Content' },
        { title: 'Categories', content: 'Tab 3 Content' }
      ],
      nodes: [
        {
          key: '0',
          data: {
            label: 'Hueta',
            data: 'Documents',
            icon: 'pi pi-fw pi-inbox',
          },
          children: [
            {
              key: '0-0',
              name: 'Work',
              data: {
                label: 'Work',
                data: 'Work Folder',
              },
              children: [
                { key: '0-0-0',
                  data: {
                    label: 'Expenses.doc',
                    icon: 'pi pi-fw pi-file',
                    data: 'Expenses Document'
                  }
                },
              ]
            },
          ]
        },
      ]
    };
  },
  async setup() {
    const brandStore = useBrandStore();
    const collectionStore = useCollectionStore();
    const categoriesStore = useCategoriesStore();
    await brandStore.loadBrandsList();
    await collectionStore.loadCollectionList();
    await categoriesStore.loadCategoriesList();

    // await productStore.loadSelectedProduct(parseInt(route.params.id.toString()));
    return {
      brandStore,
      categoriesStore,
      collectionStore,
    };
  },
  methods: {
    transformCategoryList(categoryList) {
      if (!categoryList || categoryList.length === 0) {
        return [];
      }

      return categoryList.map((category, index) => {
        return {
          key: index.toString(),
          data: {
            label: category.name || '',
          },
          children: this.transformChildren(category.children),
        };
      });
    },

    transformChildren(children) {
      if (!children || children.length === 0) {
        return [];
      }

      return children.map((child, index) => {
        return {
          key: `${index}`,
          name: child.name || '',
          data: {
            label: child.name || '',
            data: child.name || '',
            icon: 'pi pi-fw pi-folder-open', // You might want to customize the icon
          },
          children: this.transformChildren(child.children),
        };
      });
    },
  },

  computed: {
    categoryList() {
      return this.categoriesStore.getCategoryList;
    },
    brandList() {
      return this.brandStore.getBrandList;
    },
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
  },
}
</script>


<style scoped>
/* Add any necessary styles here */
</style>
