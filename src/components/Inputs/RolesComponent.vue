<template>
  <ModalComponent
    v-if="modalStore.getIsVisible && modalStore.getIsNested"
    :nested="true"
    @approved="removeAndCloseModal"
    @close-nested="closeModal"
  />
  <MDBAccordion v-model="activeItem" borderless>
    <MDBAccordionItem
      style="width: max-content; padding: 0.1rem !important"
      :headerTitle="localize('mainGroup', 'role')"
      collapseId="collapseOne"
    >
      <div
        v-for="category of rulesCheckboxes"
        :key="category.key"
        class="flex align-items-center mb-2"
      >
        <Checkbox
          v-model="selectedRules"
          :inputId="String(category.key)"
          name="category"
          :disabled="!canChange"
          :value="category.key"
          @change="checkboxChanges"
        />
        <label class="label" :for="category.key">{{
          localize(category.name)
        }}</label>
      </div>
    </MDBAccordionItem>
    <template v-for="category in categories">
      <MDBAccordionItem
        style="width: max-content; padding: 0.1rem !important"
        :headerTitle="localize(category.name)"
        :collapseId="`collapse${category.id}`"
      >
        <template v-for="item in categoryItems(category.id - 1)">
          <MDBContainer class="d-flex flex-column">
            <span>{{ localize(item.name) }}</span>
            <MultiSelectComponent
              :start-items="storehouseList[item.id]"
              :options="storehouseOptions"
              option-label="name"
              :placeholder="localize('tabSelectPlaceholder')"
              :disabled="!canChange"
              :selected-sorting="true"
              @items-added="storehouseAdded(item.id, $event)"
              @items-removed="storehouseRemoved(item.id, $event)"
            />
          </MDBContainer>
        </template>
      </MDBAccordionItem>
    </template>
  </MDBAccordion>
</template>
<script lang="ts">
import Checkbox from "primevue/checkbox";
import {
  MDBContainer,
  MDBAccordion,
  MDBAccordionItem,
  MDBCheckbox,
} from "mdb-vue-ui-kit";
import MultiSelect from "primevue/multiselect";
import { appConf } from "@/api/conf/app.conf";
import LinkedRuleInputDto from "@/api/modules/rbac/dto/rules/linked-rule-input.dto";
import MultiSelectComponent from "@/components/Elements/Selectors/MultiSelectComponent.vue";
import PrintUtil from "@/utils/localization/print.util";
import { useModalStore } from "@/stores/modal.store";
import ModalComponent from "@/components/Elements/Dialogs/ModalComponent.vue";
import TokenUtil from "@/utils/token.util";
import { useUsersStore } from "@/stores/user.store";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "RolesComponent",
  components: {
    MultiSelectComponent,
    ModalComponent,
    MDBContainer,
    MDBAccordion,
    MDBAccordionItem,
    MDBCheckbox,
    Checkbox,
    MultiSelect,
  },
  props: {
    rules: {
      type: Array,
      default: [],
    },
    stocks: {
      type: Array,
      default: [],
    },
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
    rulesWithConfirmation: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeItem: "1",
      lastCheckboxSelected: [],
      selectedRules: [],
      selectedRulesWithStorehouses: {},
      multiSelectPlaceholder: this.localize("tabSelectPlaceholder", "role"),
      storehouseList: {},
      lastStorehouseList: {},
      storehouseIdToObject: {},
    };
  },
  emits: ["newRuleSelected", "ruleRemoved"],
  setup() {
    const modalStore = useModalStore();

    return {
      modalStore,
    };
  },
  created() {
    this.selectedRules = this.role?.rules.map((el) => el.ruleId);
    this.lastCheckboxSelected = [...this.selectedRules];
    this.storehouseOptions.forEach((el) => {
      this.storehouseIdToObject[el.id] = { ...el };
    });
    const rulesToStock = {};
    this.role.rules
      .filter((el) => el.needStock)
      .forEach((el) => {
        if (rulesToStock[el.ruleId]) {
          rulesToStock[el.ruleId].push({
            ...this.storehouseIdToObject[el.stockId],
          });
        } else {
          rulesToStock[el.ruleId] = [
            { ...this.storehouseIdToObject[el.stockId] },
          ];
        }
      });
    Object.keys(appConf.rulesCategories).forEach((key) => {
      const category = appConf.rulesCategories[key];
      Object.values(category.items).forEach((el) => {
        this.storehouseList[el.id] = [];
        if (rulesToStock[el.id])
          this.storehouseList[el.id] = rulesToStock[el.id];
      });
    });
    LoggerUtil.debug("STOREHOUSE LIST", this.storehouseList);
    this.lastStorehouseList = { ...this.storehouseList };
  },
  methods: {
    localize(key, module = "role") {
      return PrintUtil.localize(key, module);
    },
    closeModal() {
      this.selectedRules = [...this.lastCheckboxSelected];
    },
    removeAndCloseModal() {
      const removedItem = this.lastCheckboxSelected.filter(
        (el) => !this.selectedRules.includes(el),
      );
      if (removedItem.length > 0) {
        this.emit("remove", {
          roleId: this.role.id,
          rule: removedItem[0],
          stockId: null,
        });
      }
      this.lastCheckboxSelected = [...this.selectedRules];
      this.modalStore.hide();
    },
    emit(type, { roleId, rule, stockId }) {
      let linkedRule: LinkedRuleInputDto[] = [];
      if (typeof stockId == "object" && stockId != null)
        linkedRule = stockId.map((el) => new LinkedRuleInputDto(rule, el));
      else linkedRule = [new LinkedRuleInputDto(rule, stockId)];
      const event = type == "add" ? "newRuleSelected" : "ruleRemoved";
      this.$emit(event, {
        roleId,
        linkedRule,
      });
    },
    checkboxChanges() {
      let modalWindowOpened = false;
      if (this.lastCheckboxSelected.length > this.selectedRules.length) {
        const removedItem = this.lastCheckboxSelected.filter(
          (el) => !this.selectedRules.includes(el),
        );
        if (
          this.$route.name == "User" &&
          TokenUtil.getAuthorizedId() == useUsersStore().getSelectedUser.id &&
          removedItem.length > 0 &&
          removedItem[0] == appConf.rules.userManaging
        ) {
          modalWindowOpened = true;
          this.modalStore.show(
            {
              title: this.localize("confirmDeletion", "default"),
              text: this.localize("removeUserManagingRule", "user"),
              disclaimer: "",
            },
            true,
          );
        } else if (removedItem.length > 0) {
          this.emit("remove", {
            roleId: this.role.id,
            rule: removedItem[0],
            stockId: null,
          });
        }
      } else {
        const addedItem = this.selectedRules.filter(
          (el) => !this.lastCheckboxSelected.includes(el),
        );
        if (addedItem.length > 0) {
          this.emit("add", {
            roleId: this.role.id,
            rule: addedItem[0],
            stockId: null,
          });
        }
      }
      //If confirmation modal was opened, we must not clear selection
      if (!modalWindowOpened) {
        this.lastCheckboxSelected = [...this.selectedRules];
      }
    },
    categoryItems(categoryIndex: number) {
      const category =
        appConf.rulesCategories[
          Object.keys(appConf.rulesCategories)[categoryIndex]
        ];
      return category.items;
    },
    listContains(list, id) {
      return list.filter((el) => el.id == id).length > 0;
    },
    storehouseAdded(ruleId, addedItems) {
      this.emit("add", {
        roleId: this.role.id,
        rule: ruleId,
        stockId: addedItems,
      });
    },
    storehouseRemoved(ruleId, removedItems) {
      this.emit("remove", {
        roleId: this.role.id,
        rule: ruleId,
        stockId: removedItems,
      });
    },
  },
  computed: {
    rulesList() {
      return this.rules;
    },
    rulesCheckboxes() {
      return this.rulesList
        .filter((el) => !el.needStock)
        .map((el) => ({
          name: el.name,
          key: el.id,
        }));
    },
    storehouseOptions() {
      return this.stocks;
    },
    categories() {
      return Object.values(appConf.rulesCategories).map((el) => ({
        id: el.id,
        name: el.name,
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
.label {
  margin-left: 0.5rem !important;
  font-weight: 500;
}
</style>
