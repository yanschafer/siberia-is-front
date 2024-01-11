<template>
  <MDBTabs v-model="activeTabId4" vertical>
    <MDBTabNav tabsClasses="mb-3 text-center">
      <MDBTabItem :wrap="false" tabId="ex4-1" href="ex4-1">Role 1</MDBTabItem>
      <MDBTabItem :wrap="false" tabId="ex4-2" href="ex4-2">Role 2</MDBTabItem>
      <MDBTabItem :wrap="false" tabId="ex4-3" href="ex4-3">Role 3</MDBTabItem>
    </MDBTabNav>
    <MDBTabContent>
      <MDBTabPane tabId="ex4-1">
        <RolesComponent />
      </MDBTabPane>
      <MDBTabPane tabId="ex4-2">
        <RolesComponent />
      </MDBTabPane>
      <MDBTabPane tabId="ex4-3">
        <RolesComponent />
      </MDBTabPane>
    </MDBTabContent>
  </MDBTabs>
</template>

<script lang="ts">
import {MDBTabs, MDBTabNav, MDBTabItem, MDBTabContent, MDBTabPane} from "mdb-vue-ui-kit";

import { defineComponent, ref } from 'vue';
import  TabView from 'primevue/tabview';
import TabPanel from "primevue/tabpanel";
import Checkbox  from 'primevue/checkbox';
import RolesComponent from "@/components/Elements/RolesComponent.vue";

export default defineComponent({
  components: {
    RolesComponent,
    TabView,
    TabPanel,
    Checkbox,
    MDBTabs,
    MDBTabNav,
    MDBTabItem,
    MDBTabContent,
    MDBTabPane
  },
  setup() {
    const categories = ref([
      {name: "Accounting", key: "A"},
      {name: "Marketing", key: "M"},
      {name: "Production", key: "P"},
      {name: "Research", key: "R"}
    ]);
    const selectedCategories = ref(['Marketing']);
    return { categories, selectedCategories };
  }
});
</script>

<style scoped>
/* Здесь вы можете добавить стили для вашего компонента */
</style>
