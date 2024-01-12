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

import { defineComponent, ref } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Checkbox from "primevue/checkbox";
import RolesComponent from "@/components/Elements/RolesComponent.vue";
import RoleDto from "@/api/modules/rbac/dto/roles/role.dto";
import loggerUtil from "@/utils/logger/logger.util";

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
  data: () => ({
    activeTabId: "",
  }),
  methods: {
    ruleRemoved({ roleId, removedRule }) {
      loggerUtil.debug("Rule removed", roleId, removedRule);
    },
    ruleSelected({ roleId, addedRule }) {
      loggerUtil.debug("Rule selected", roleId, addedRule);
    },
  },
});
</script>

<style scoped>
/* Здесь вы можете добавить стили для вашего компонента */
</style>
