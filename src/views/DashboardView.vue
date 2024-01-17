<template>
  <div class="d-flex flex-row">
    <div class="col col-7">
      <div class="line-chart">
        <LineGradientChartComponent />
      </div>
    </div>
    <div class="col col-4">
      <div class="container-chart">
        <GaugeChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import GaugeChart from "@/components/Elements/Dashboard elements/GaugeChartComponent.vue";
import LineGradientChartComponent from "@/components/Elements/Dashboard elements/LineGradientChartComponent.vue";

export default defineComponent({
  components: {LineGradientChartComponent, GaugeChart}
})
</script>

<style scoped>
.chart {
  height: 400px;
}
.chart2 {
  height: 800px;
}
.bg-container {
  background-color: #fdfdfd;
  border: 2px solid #efefef;
  width: 30rem;
  border-radius: 1rem;
}
.card-heading {
  font-size: 2rem;
  color: #4f4f4f;
  font-weight: 500;
  text-align: center;
  width: 100%;
}
</style>
