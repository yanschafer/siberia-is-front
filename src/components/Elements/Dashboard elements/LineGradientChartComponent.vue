<template>
  <v-chart class="chart" :option="option" />
</template>

<script lang="ts">
import VChart from "vue-echarts";
import { use } from 'echarts/core'
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer,  } from 'echarts/renderers'

use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
    BarChart,
    CanvasRenderer
])
export default {
  name: "LineGradientChartComponent",
  components: {
    VChart
  },
  data() {
    let dataAxis = ['Last day', 'Week', 'Month', 'Quartal'];
    let data = [220, 182, 191, 234];
    return {
      option: {
        title: {
          text: 'Sales',
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#212121' },
                { offset: 0.5, color: '#252525' },
                { offset: 1, color: '#1a1a1a' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#464646' },
                  { offset: 0.7, color: '#414141' },
                  { offset: 1, color: '#262626' }
                ])
              }
            },
            data: data
          }
        ]
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
