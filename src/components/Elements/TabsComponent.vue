<template>
  <MDBTabs v-model="activeTabId" vertical>
    <MDBTabNav tabsClasses="mb-3 text-center">
      <template v-for="role in roles">
        <MDBTabItem
          :wrap="false"
          :tabId="String(role.id)"
          :href="String(role.id)"
          >{{ role.name }}</MDBTabItem
        >
      </template>
    </MDBTabNav>
    <MDBTabContent>
      <template v-for="role in roles">
        <MDBTabPane :tabId="String(role.id)">
          <Suspense>
            <RolesComponent
              @new-rule-selected="ruleSelected"
              @rule-removed="ruleRemoved"
              :role="role"
              :can-change="role.canChange"
            />
          </Suspense>
        </MDBTabPane>
      </template>
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

import { defineComponent } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Checkbox from "primevue/checkbox";
import RolesComponent from "@/components/Elements/RolesComponent.vue";
import RoleDto from "@/api/modules/rbac/dto/roles/role.dto";
import loggerUtil from "@/utils/logger/logger.util";
import { useUsersStore } from "@/stores/user.store";
import { useRolesStore } from "@/stores/roles.store";
import LinkedRuleInputDto from "@/api/modules/rbac/dto/rules/linked-rule-input.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";

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
  },
  props: {
    userId: Number,
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
  setup() {
    const userStore = useUsersStore();
    const rolesStore = useRolesStore();

    return { userStore, rolesStore };
  },
  data: () => ({
    activeTabId: "",
  }),
  methods: {
    async ruleRemoved({ roleId, linkedRule }) {
      let result: ApiResponseDto<any>;
      if (roleId == 0)
        result = await this.userStore.removeRule(this.userId || 0, linkedRule);
      else result = await this.rolesStore.removeRule(roleId, linkedRule);

      if (result.success) {
        //TODO: Check for errors
      }
    },
    async ruleSelected({ roleId, linkedRule }) {
      let result: ApiResponseDto<LinkedRuleDto[]>;
      if (roleId == 0)
        result = await this.userStore.appendRule(this.userId || 0, linkedRule);
      else result = await this.rolesStore.appendRule(roleId, linkedRule);

      if (result.success) {
        //TODO: Check for errors
      }
    },
  },
});
</script>

<style scoped>
/* Здесь вы можете добавить стили для вашего компонента */
</style>
