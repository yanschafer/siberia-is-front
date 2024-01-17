<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import VChart from "vue-echarts";
import { use } from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GaugeChart,
  CanvasRenderer
])
export default {
  components: {
    VChart
  },
  data() {
    return {
      option: {
        series: {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#e3e3e3'],
                [0.7, '#737373'],
                [1, '#0c0c0c']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: -25,
            fontSize: 16
          },

          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: 'inherit',
            fontSize: 16,
            offsetCenter: [0, '-60%'] // Adjust the vertical position for value
          },
          data: [
            {
              value: 80,
              name: 'Sold 800K of 1M',
              title: {
                offsetCenter: ['0', '70%']
              },
              detail: {
                offsetCenter: ['0', '40%'],
                fontSize: 40
              }
            }
          ]
        }
      }
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
