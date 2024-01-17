<template>
  <div class="bar-chart">
    <apexchart width="700" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: "BarChartComponent",
  components: {
    VueApexCharts
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    series: {
      type: Array,
      default: () => ([])
    }
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
