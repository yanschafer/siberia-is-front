<template>
  <MDBTabs v-model="tabs" vertical>
    <MDBTabNav pills tabsClasses="mb-3 text-center">
      <MDBTabItem v-for="tabId in Object.keys(tabContent)" :key="tabId" class="tab-item" :wrap="false" :tabId="tabId" :href="tabId">
        {{ tabId }}
      </MDBTabItem>
    </MDBTabNav>

    <MDBTabContent>
      <MDBTabPane>
        <CheckboxGroup />
        <MDBCheckbox label="Permission 1" v-model="checkbox1" />
        <MDBCheckbox label="Permission 1" v-model="checkbox2" />
        <MDBCheckbox label="Permission 1" v-model="checkbox3" />
      </MDBTabPane>
    </MDBTabContent>
  </MDBTabs>
</template>

<script lang="ts">
import { useTabsStore } from '@/stores/store';
import {MDBTabContent, MDBAccordion, MDBAccordionItem, MDBCheckbox, MDBTabItem, MDBTabNav, MDBTabPane, MDBTabs} from "mdb-vue-ui-kit";
import CheckboxGroup from "@/components/Filters/CheckboxGroupComponent.vue";
export default {
  components: {
    CheckboxGroup,
    MDBTabContent, MDBCheckbox, MDBAccordion, MDBAccordionItem, MDBTabItem, MDBTabNav, MDBTabPane, MDBTabs},
  name: "TabsComponent",
  setup() {
    const tabsStore = useTabsStore();

    return {
      tabs: tabsStore.activeTab,
      tabContent: tabsStore.tabContent,
    };
  },
}
</script>
<style>
.nav-pills .nav-link.active {
  color: white;
  background-color: #121212;
}
.form-check-input[type=checkbox]:checked {
  background-color: #121212!important;
}
.form-check-input:checked:focus {
  background-color: #121212!important;
}
.form-check-input:checked:focus {
  border-color: black!important;
}
.form-check-input:checked {
  border-color: black!important;
}
.accordion-borderless .accordion-item .accordion-button:not(.collapsed) {
  background-color: transparent;
  color: black;
}
.accordion-button {
  width: auto;
  gap: 1rem;
  padding: 0.3rem!important;
}
.accordion-button::after {
  filter: brightness(0) saturate(100%)
}
* {
  --mdb-accordion-active-color: #000!important;
}
</style>