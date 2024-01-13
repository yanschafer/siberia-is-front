<template>
  <div class="container bg-container">
    <v-chart ref="chartRef" class="chart" :option="option" />
    <v-chart class="chart2" :options="option2" />
  </div>
</template>

<script lang="ts">
import 'echarts-gl';

import VChart from "vue-echarts";
import { GaugeChart, PieChart } from 'echarts/charts'
import { TitleComponent,  TooltipComponent, LegendComponent, VisualMapComponent} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

export default {
  name: 'Dashboard',
  components: {
    GaugeChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    CanvasRenderer,
    VChart
  },
  data(){
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        colorBy: "series",
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true,
              itemStyle: {
                color: "black",
              }
            },
            splitLine: {
              lineStyle: {
                color: "black",
              }
            },
            axisTick: {
              lineStyle: {
                color: "grey",
              }
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 20,
                  color: '#999',
                  padding: [0, 0, -20, 10]
                }
              },
            },
            pointer: {
              itemStyle: {
                color: 'black',
              }
            },
            tooltip: {
              show: false,
            },
            data: [
              {
                value: 83,
                name: '800k from 1kk saled',
                title: {
                  offsetCenter: ['0', '80%']
                },
              }
            ],
          }
        ]
      },
      option2: {
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 274, name: 'Union Ads' },
              { value: 235, name: 'Video Ads' },
              { value: 400, name: 'Search Engine' }
            ],
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
          }
        ]
      }
    }
  }
}
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
