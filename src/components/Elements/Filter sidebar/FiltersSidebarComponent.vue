<template>
  <div :class="{ 'sidebar-collapsed': collapsed }">
    <button @click="toggleSidebar" class="toggle-btn">
      <IconAdjustmentsHorizontal color="#121212" :size="24" stroke-width="1" />
    </button>
    <div v-if="collapsed"></div>
    <div class="sidebar" v-else>
      <ScrollPanel class="sidebar animate__animated animate__fadeIn">
        <div class="top-gradient-overlay"></div>
        <template v-for="(filter, index) in filters">
          <TextFilter
            :default-value="filter.value"
            v-if="isText(filter)"
            :title="filter.title"
            @change="handleFilterChange(filter, $event)"
          />
          <selector-filter
            :default-value="filter.value"
            v-if="isSelect(filter)"
            :title="filter.title"
            :items="filter.items"
            @change="handleFilterChange(filter, $event)"
          />
          <tree-selector-filter
            :default-value="filter.value"
            v-if="isTreeSelect(filter)"
            :title="filter.title"
            :items="filter.items"
            @change="handleFilterChange(filter, $event)"
          />
          <min-max-filter
            :default-value="filter.value"
            v-if="isNumber(filter)"
            :title="filter.title"
            @change="handleFilterChange(filter, $event)"
          />
          <min-max-date-filter
            :default-value="filter.value"
            v-if="isDate(filter)"
            :title="filter.title"
            @change="handleFilterChange(filter, $event)"
          />
        </template>
        <MDBRow>
          <MDBCol>
            <MDBBtn class="utility-btn btn-black" @click="clearFields">{{
              localize("clear")
            }}</MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn class="utility-btn btn-black" @click="search">{{
              localize("search")
            }}</MDBBtn>
          </MDBCol>
        </MDBRow>
      </ScrollPanel>
    </div>
  </div>
</template>

<script lang="ts">
import { IconAdjustmentsHorizontal } from "@tabler/icons-vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import { MDBBtn, MDBCol, MDBRow } from "mdb-vue-ui-kit";
import TextFilter from "@/components/Elements/Filter sidebar/Filter items/TextFilter.vue";
import SelectorFilter from "@/components/Elements/Filter sidebar/Filter items/SelectorFilter.vue";
import MinMaxFilter from "@/components/Elements/Filter sidebar/Filter items/MinMaxFilter.vue";
import loggerUtil from "@/utils/logger/logger.util";
import { FilterType } from "@/api/conf/app.conf";
import filesResolverUtil from "@/utils/files-resolver.util";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import FieldSearchWrapperDto from "@/utils/crud/dto/field-search-wrapper.dto";
import MinMaxDateFilter from "@/components/Elements/Filter sidebar/Filter items/MinMaxDateFilter.vue";
import TreeSelectorFilter from "@/components/Elements/Filter sidebar/Filter items/TreeSelectorFilter.vue";
import ScrollPanel from "primevue/scrollpanel";
import PrintUtil from "@/utils/localization/print.util";
import { useCategoriesStore } from "@/stores/categories.store";
import { useFiltersStore } from "@/stores/filters.store";

export default {
  name: "FiltersSidebarComponent",
  components: {
    TreeSelectorFilter,
    MinMaxDateFilter,
    MinMaxFilter,
    SelectorFilter,
    TextFilter,
    SelectComponent,
    IconAdjustmentsHorizontal,
    InputText,
    InputNumber,
    ScrollPanel,
    MDBRow,
    MDBCol,
    MDBBtn,
  },
  props: {
    // filtersInput: {
    //   type: Object,
    //   default: {},
    // },
  },
  emits: ["startSearch"],
  data() {
    return {
      filtersObject: {},
      filters: [],
      collapsed: true,
      textFilterValue: null,
    };
  },
  computed: {
    filtersInput() {
      return useFiltersStore().getFilters;
    },
  },
  created() {
    this.filters = Object.keys(this.filtersInput).map((key) => {
      return {
        ...this.filtersInput?.[key],
        key,
      };
    });
    this.filtersObject = { ...this.filtersInput };
  },
  methods: {
    localize(key, module = "filters") {
      return PrintUtil.localize(key, module);
    },
    clearFields() {
      useFiltersStore().clearFilter();
      this.$nextTick(() => {
        this.search();
      });
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
    handleFilterChange(filterItem, value) {
      this.filters?.forEach((el, index) => {
        if (el.key == filterItem.key) this.filters[index].value = value;
      });
      this.filtersObject[filterItem.key].value = value;
    },
    search() {
      const searchFilterDto = {};
      Object.keys(this.filtersObject).map((key) => {
        const filter = this.filtersObject[key];
        if (filter.type == FilterType.SELECT && filter.value)
          searchFilterDto[key] = (() => {
            const filtered = filter.value.map((el) => el.id);
            if (filtered.length == 0) return null;
            else return filtered;
          })();
        if (filter.type == FilterType.TEXT && filter.value)
          searchFilterDto[key] = filter.value;
        if (
          filter.type == FilterType.NUMBER &&
          (filter.value.min || filter.value.max)
        )
          searchFilterDto[key] = new FieldSearchWrapperDto(
            null,
            filter.value.max != "" ? filter.value.max : null,
            filter.value.min != "" ? filter.value.min : null,
          );
        if (filter.type == FilterType.DATE && filter.value) {
          searchFilterDto["rangeStart"] = filter.value.min;
          searchFilterDto["rangeEnd"] = filter.value.max;
        }
      });
      this.$emit("startSearch", searchFilterDto);
    },
    isText(filter) {
      return filter.type == FilterType.TEXT;
    },
    isNumber(filter) {
      return filter.type == FilterType.NUMBER;
    },
    isSelect(filter) {
      return filter.type == FilterType.SELECT && !filter.tree;
    },
    isTreeSelect(filter) {
      return filter.type == FilterType.SELECT && filter.tree;
    },
    isDate(filter) {
      return filter.type == FilterType.DATE;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 70vh;
  background-color: #ffffff;
  color: white;
  transition: width 0.5s ease;
  border-right: 2px solid #efefef;
  padding-right: 1rem;
}

.sidebar-collapsed {
  width: 60px;
}

.toggle-btn {
  padding: 10px;
  cursor: pointer;
  background-color: #f1f1f1;
  border-radius: 0.3rem;
  color: white;
  border: none;
  outline: none;
}

.content {
  padding: 0;
}
.filtername {
  color: black;
}
:deep(.p-inputnumber-input) {
  width: 4rem;
}
.filter-group {
  height: 73vh;
}
.overlay-bottom {
  width: 100%;
  height: 1rem;
  background-color: black;
  box-shadow: 0px -9px 10px 10px white;
  position: absolute;
  bottom: 0px;
}
</style>
