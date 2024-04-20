<template>
  <div class="container-fluid mt-3" style="padding: 0; width: 86vw">
    <template v-if="!isIdProvided">
      <SearchComponent
        v-model="storehousesStore.searchTerm"
        @search="handleSearch"
        class="search"
      />
      <TableComponent
        :rows="filteredStorehouses"
        :infoMessage="noDataMessage"
        :columns="storehousesStore.storehousesColumns"
        :searchTerm="storehousesStore.searchTerm"
        @rowClick="handleRowClick"
      />
    </template>
    <router-view v-if="isIdProvided" :id="routeIdParam" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import SearchComponent from "@/components/Inputs/SearchComponent.vue";
import { useStorehousesStore } from "@/stores/storehouse.store";
import { useRoute, useRouter } from "vue-router";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import PrintUtil from "@/utils/localization/print.util";

export default {
  name: "StorehousesView",
  components: { SearchComponent, TableComponent },
  async setup() {
    const storehousesStore = useStorehousesStore();
    const authCheckStore = useAuthCheckStore();
    const route = useRoute();
    const router = useRouter();

    const loaders = await Promise.all([storehousesStore.loadStorehouseList()]);

    return {
      storehousesStore,
      route,
      router,
      loaders,
      authCheckStore,
    };
  },
  created() {
    this.loaders.forEach((el) => el.toastIfError(this.$toast, this.$nextTick));
    this.authCheckStore.$onAction(async ({ name }) => {
      if (name == "refresh") {
        const loadRes = await this.storehousesStore.loadStorehouseList();
        loadRes.toastIfError(this.$toast, this.$nextTick);
      }
    });
  },
  data() {
    return {
      noDataMessage: {
        icon: "IconInfoCircle",
        title: this.localize("noStorehouseAvailable"),
        text: this.localize("tryToEditStorehouse"),
      },
    };
  },
  computed: {
    filteredStorehouses() {
      const searchTerm = this.storehousesStore.getSearchTerm;
      if (searchTerm.trim() === "") {
        return this.storehousesStore.getStorehouseList;
      } else {
        return this.storehousesStore.getStorehouseList.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );
      }
    },
    routeIdParam() {
      return parseInt(this.route.params.id.toString());
    },
    isIdProvided() {
      return !!this.route.params.id;
    },
  },
  methods: {
    localize(key, module = "storehouses") {
      return PrintUtil.localize(key, module);
    },
    handleSearch(searchTerm) {
      this.storehousesStore.searchTerm = searchTerm;
    },
    handleRowClick(row) {
      this.router.push({ name: "Storehouse", params: { id: row.id } });
    },
  },
};
</script>

<style scoped>
.search {
  width: 90vw;
}
</style>
