<template>
  <div :class="{ 'sidebar-collapsed': collapsed }" class="sidebar">
    <button @click="toggleSidebar" class="toggle-btn">
      <IconAdjustmentsHorizontal color="#121212" :size="24" stroke-width="1" />
    </button>
    <div class="content d-flex flex-column" v-show="!collapsed">
      <span class="filtername">Vendor code</span>
      <InputText type="text" v-model="value" />
      <span class="filtername">Brand</span>
      <SelectComponent />
      <span class="filtername">Price</span>
      <MDBRow class="d-flex flex-row flex-nowrap">
        <MDBCol class="col-auto d-flex flex-column">
          <span class="filtername">min</span>
          <InputNumber style="width: 4rem!important" v-model="value2" inputId="withoutgrouping" :useGrouping="false" />
        </MDBCol>
        <MDBCol class="col-auto d-flex flex-column">
          <span class="filtername">max</span>
          <InputNumber style="width: 4rem!important" v-model="value3" inputId="withoutgrouping" :useGrouping="false" />
        </MDBCol>
      </MDBRow>
    </div>
  </div>
</template>
<!--<template>-->
<!--  <div :class="{ 'sidebar-collapsed': collapsed }" class="sidebar">-->
<!--    <button @click="toggleSidebar" class="toggle-btn">-->
<!--      <IconAdjustmentsHorizontal color="#121212" :size="24" stroke-width="1" />-->
<!--    </button>-->
<!--    <div class="content d-flex flex-column" v-show="!collapsed">-->
<!--      <div v-if="filters">-->
<!--        <div v-for="(value, key) in filters" :key="key">-->
<!--          <span class="filtername">{{ key }}</span>-->
<!--          <template v-if="Array.isArray(value)">-->
<!--            &lt;!&ndash; Селект для массива &ndash;&gt;-->
<!--            <SelectComponent v-if="Array.isArray(value)" :options="value" v-model="selectedFilters[key]" />-->
<!--          </template>-->
<!--          <template v-else-if="typeof value === 'string'">-->
<!--            &lt;!&ndash; InputText для строки &ndash;&gt;-->
<!--            <InputText type="text" v-model="selectedFilters[key]" />-->
<!--          </template>-->
<!--          <template v-else-if="typeof value === 'object' && value !== null && value.hasOwnProperty('min') && value.hasOwnProperty('max')">-->
<!--            &lt;!&ndash; Два InputNumber для Number &ndash;&gt;-->
<!--            <MDBRow class="d-flex flex-row flex-nowrap">-->
<!--              <MDBCol class="col-auto d-flex flex-column">-->
<!--                <span class="filtername">min</span>-->
<!--                <InputNumber style="width: 4rem!important" v-model="selectedFilters[key].min" inputId="withoutgrouping" :useGrouping="false" />-->
<!--              </MDBCol>-->
<!--              <MDBCol class="col-auto d-flex flex-column">-->
<!--                <span class="filtername">max</span>-->
<!--                <InputNumber style="width: 4rem!important" v-model="selectedFilters[key].max" inputId="withoutgrouping" :useGrouping="false" />-->
<!--              </MDBCol>-->
<!--            </MDBRow>-->
<!--          </template>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
import {IconAdjustmentsHorizontal} from "@tabler/icons-vue";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import SelectComponent from "@/components/Elements/SelectComponent.vue";
import {MDBCol,  MDBRow} from "mdb-vue-ui-kit";


export default {
  name: 'FiltersSidebarComponent',
  components: {SelectComponent, IconAdjustmentsHorizontal, InputText, InputNumber, MDBRow, MDBCol},
  data() {
    return {
      collapsed: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #ffffff;
  color: white;
  transition: width 0.5s ease;
  border-right: 2px solid #efefef;
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
</style>