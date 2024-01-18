<template>
  <MDBTabs v-model="activeTabId" vertical>
    <MDBTabNav tabsClasses="mb-3 text-center" class="tabs">
      <template v-for="role in roles">
        <MDBTabItem
          :wrap="false"
          :tabId="String(role.id)"
          :href="String(role.id)"
        >
          {{ role.name }}
        </MDBTabItem>
      </template>
    </MDBTabNav>
    <MDBTabContent class="content">
      <ScrollPanel style="width: 100%; height: 40vh">
        <template v-for="role in roles">
          <MDBTabPane class="content" :tabId="String(role.id)">
            <RolesComponent
              @new-rule-selected="ruleSelected"
              @rule-removed="ruleRemoved"
              :role="validateRole(role)"
              :can-change="role.canChange"
              :rules="rules"
              :stocks="stocks"
            />
          </MDBTabPane>
        </template>
      </ScrollPanel>
    </MDBTabContent>
  </MDBTabs>
</template>

<script lang="ts">
import {
  MDBTabs,
  MDBTabNav,
  MDBTabItem,
  MDBTabContent,
  MDBTabPane,
} from "mdb-vue-ui-kit";
import ScrollPanel from "primevue/scrollpanel";
import { defineComponent } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Checkbox from "primevue/checkbox";
import RolesComponent from "@/components/Blocks/RolesComponent.vue";
import { useUsersStore } from "@/stores/user.store";
import { useRolesStore } from "@/stores/roles.store";
import ApiResponseDto from "@/api/dto/api-response.dto";
import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";
import { useRulesStore } from "@/stores/rules.store";
import { useStorehousesStore } from "@/stores/storehouse.store";
import loggerUtil from "@/utils/logger/logger.util";
import PrintUtil from "@/utils/localization/print.util";

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
    MDBTabPane,
    ScrollPanel,
  },
  props: {
    userId: {
      type: Number,
      default: null,
    },
    creationMode: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    if (this.roles?.length > 0) {
      this.activeTabId = String(this.roles?.[0].id);
    }
  },
  async setup() {
    const userStore = useUsersStore();
    const rolesStore = useRolesStore();
    const rulesStore = useRulesStore();
    const storehousesStore = useStorehousesStore();

    await rulesStore.loadRulesList();
    await storehousesStore.loadStorehousesForInput();

    return { userStore, rolesStore, rulesStore, storehousesStore };
  },
  data() {
    return {
      activeTabId: "",
      currentRules: [],
    };
  },
  computed: {
    stocks() {
      return this.storehousesStore.getStorehouseListForInputs;
    },
    rules() {
      return this.rulesStore.getRuleList;
    },
  },
  methods: {
    localize(key, module) {
      return PrintUtil.localize(key, module);
    },
    showSuccessToast(type) {
      this.$toast.add({
        severity: "success",
        summary: this.localize("success", "storehouses"),
        detail: `${this.localize("rules", "components")} ${type}`,
        life: 3000,
      });
    },
    validateRole(role) {
      loggerUtil.debug(role);
      if (role.rules) return role;
      else return { ...role, rules: [] };
    },
    async ruleRemoved({ roleId, linkedRule }) {
      if (this.creationMode) {
        linkedRule.forEach((rule) => {
          this.currentRules = this.currentRules.filter(
            (el) => el.ruleId != rule.ruleId,
          );
        });
        this.rolesStore.roleOnCreate = { rules: [...this.currentRules] };
        return;
      }
      let result: ApiResponseDto<any>;
      if (roleId == 0 && this.userId != null)
        result = await this.userStore.removeRule(this.userId || 0, linkedRule);
      else result = await this.rolesStore.removeRule(roleId, linkedRule);

      if (!result.success) {
        result.getError().showServerErrorToast(this.$toast, this.$nextTick);
      } else {
        this.showSuccessToast(this.localize("removed", "components"));
      }
    },
    async ruleSelected({ roleId, linkedRule }) {
      loggerUtil.debug("SELECTED", roleId, linkedRule);
      if (this.creationMode) {
        this.currentRules = this.currentRules.concat(linkedRule);
        this.rolesStore.roleOnCreate = { rules: [...this.currentRules] };
        return;
      }
      let result: ApiResponseDto<LinkedRuleDto[]>;
      if (roleId == 0 && this.userId != null)
        result = await this.userStore.appendRule(this.userId || 0, linkedRule);
      else result = await this.rolesStore.appendRule(roleId, linkedRule);

      if (!result.success) {
        result.getError().showServerErrorToast(this.$toast, this.$nextTick);
      } else {
        this.showSuccessToast(this.localize("added", "components"));
      }
    },
  },
});
</script>

<style scoped>
.tabs {
  padding-right: 0 !important;
}
.content {
  padding: 0 !important;
}
:deep(.col-9) {
  padding-left: 0 !important;
  border-left: 2px solid #e3e3e3 !important;
}
</style>
