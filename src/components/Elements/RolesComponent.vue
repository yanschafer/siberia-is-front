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
  </MDBAccordion>
</template>
<script lang="ts">
import Checkbox from "primevue/checkbox";
import { MDBAccordion, MDBAccordionItem, MDBCheckbox } from "mdb-vue-ui-kit";
import { useRulesStore } from "@/stores/rules.store";
import loggerUtil from "@/utils/logger/logger.util";

export default {
  name: "RolesComponent",
  components: { MDBAccordion, MDBAccordionItem, MDBCheckbox, Checkbox },
  props: {
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
  }),
  emits: ["newRuleSelected", "ruleRemoved"],
  async setup() {
    const rulesStore = useRulesStore();
    await rulesStore.loadRulesList();
    return { rulesStore };
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
