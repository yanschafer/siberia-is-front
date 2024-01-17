<template>
  <div class="gauge-chart">
    <apexchart width="500" type="radialBar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts
  },
  data() {
    return {
      series: [80],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 0,
                fontSize: '50px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: '600',
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                }
              }
            }
          }
        },
        colors: ["#1e1e1e"],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          },
        },
        labels: ['800K sold from 1M'],
      },
    };
  },
  methods: {
    initializeChart() {
      // Perform any additional initialization logic here
      console.log("Chart initialized");
    },
    disposeChart() {
      // Perform any cleanup logic here
      console.log("Chart disposed");
    }
  },
  mounted() {
    this.initializeChart();
  },
  beforeDestroy() {
    this.disposeChart();
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
