<template>
  <MDBAccordion v-model="activeItem" borderless>
    <MDBAccordionItem
      style="width: max-content; padding: 0.1rem !important"
      headerTitle="Permission group 1"
      collapseId="collapseOne"
    >
      <div
        v-for="category of rulesCheckboxes"
        :key="category.key"
        class="flex align-items-center"
      >
        <Checkbox
          v-model="selectedRules"
          :inputId="String(category.key)"
          name="category"
          :disabled="!canChange"
          :value="category.key"
          @change="checkboxChanges"
        />
        <label :for="category.key">{{ category.name }}</label>
      </div>
    </MDBAccordionItem>
    <MultiSelect
        v-model="storehousesList"
        :options="storehousesOptions"
        filter
        optionLabel="name"
        :placeholder="multiSelectPlaceholder"
        class="w-full md:w-20rem" />
  </MDBAccordion>

</template>
<script lang="ts">
import Checkbox from "primevue/checkbox";
import { MDBAccordion, MDBAccordionItem, MDBCheckbox } from "mdb-vue-ui-kit";
import { useRulesStore } from "@/stores/rules.store";
import loggerUtil from "@/utils/logger/logger.util";
import MultiSelect from 'primevue/multiselect';
import {useStorehousesStore} from "@/stores/storehouse.store";

export default {
  name: "RolesComponent",
  components: { MDBAccordion, MDBAccordionItem, MDBCheckbox, Checkbox, MultiSelect },
  props: {
    items: {
      type: Array,
    },
    role: {
      type: Object,
    },
    canChange: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    activeItem: "1",
    lastCheckboxSelected: [],
    selectedRules: [],
    multiSelectPlaceholder: 'Select storehouse',
    storehousesList: [],
  }),
  emits: ["newRuleSelected", "ruleRemoved"],
  async setup() {
    const rulesStore = useRulesStore();
    const storehousesStore = useStorehousesStore();
    await rulesStore.loadRulesList();
    await storehousesStore.loadStorehouseList();
    return {
      rulesStore,
      storehousesStore
    };
  },
  created() {
    this.selectedRules = this.role?.rules.map((el) => el.ruleId);
    this.lastCheckboxSelected = [...this.selectedRules];
  },
  methods: {
    checkboxChanges() {
      if (this.lastCheckboxSelected.length > this.selectedRules.length) {
        const removedItem = this.lastCheckboxSelected.filter(
          (el) => !this.selectedRules.includes(el),
        );
        if (removedItem.length > 0) {
          this.$emit("ruleRemoved", {
            roleId: this.role.id,
            removedRule: removedItem[0],
          });
        }
      } else {
        const addedItem = this.selectedRules.filter(
          (el) => !this.lastCheckboxSelected.includes(el),
        );
        if (addedItem.length > 0) {
          this.$emit("newRuleSelected", {
            roleId: this.role.id,
            addedRule: addedItem[0],
          });
        }
      }
      this.lastCheckboxSelected = [...this.selectedRules];
    },
  },
  computed: {
    rulesList() {
      return this.rulesStore.getRuleList;
    },
    storehousesOptions() {
      return this.storehousesStore.getStorehouseList;
    },
    linkedRulesAsObject() {
      const object = {};
      this.role?.rules.forEach((el) => {
        object[el.ruleId] = { ...el };
      });
      return object;
    },
    rulesCheckboxes() {
      return this.rulesList
        .filter((el) => !el.needStock)
        .map((el) => ({
          name: el.name,
          key: el.id,
        }));
    },
  },
};
</script>
<style scoped>
:deep(.accordion-button) {
  padding: 0.3rem;
  gap: 0.3rem;
}
:deep(.accordion-button:not(.collapsed)) {
  background-color: #eeeeee !important;
  color: black !important;
}
:deep(.accordion-button:not(.collapsed)::after) {
  filter: invert(0%) sepia(6%) saturate(0%) hue-rotate(93deg) brightness(106%)
    contrast(106%) !important;
}
</style>
