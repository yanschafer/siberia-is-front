<template>
  <ScrollPanel
    style="width: 88vw; height: 80vh"
    class="main-area animate__animated animate__fadeIn"
  >
    <div class="d-flex flex-row">
      <div class="col col-7">
        <div class="line-chart">
          <TabView>
            <TabPanel v-for="tab in tabs" :key="tab.id" :header="tab.title">
              <template v-if="tab.id === 1">
                <BarChartComponent
                  :options="websiteOptions"
                  :series="websiteSeries"
                />
              </template>
              <template v-if="tab.id === 2">
                <BarChartComponent
                  :options="websiteOptions"
                  :series="websiteSeries"
                />
              </template>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div class="col col-2 d-flex align-items-center">
        <div class="container-chart">
          <GaugeChartComponent :options="storeOptions" :series="storeSeries" />
        </div>
      </div>
    </div>
    <Panel :header="localize('leastBestsellingItems')">
      <TableComponent
        :infoMessage="noDataMessage"
        :columns="tableColumns"
        :rows="tableRows"
      />
    </Panel>
  </ScrollPanel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChartComponent from "@/components/Elements/Dashboard elements/BarChartComponent.vue";
import GaugeChartComponent from "@/components/Elements/Dashboard elements/GaugeChartComponent.vue";
import TableComponent from "@/components/Elements/Tables/TableComponent.vue";
import ScrollPanel from "primevue/scrollpanel";
import Panel from "primevue/panel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import PrintUtil from "@/utils/localization/print.util";

export default defineComponent({
  components: {
    TableComponent,
    GaugeChartComponent,
    BarChartComponent,
    ScrollPanel,
    Panel,
    TabView,
    TabPanel,
  },
  data() {
    return {
      storeOptions: {
        chart: {
          id: "1",
        },
        colors: ["#000000"],
        xaxis: {
          categories: [
            this.localize("lastDay"),
            this.localize("week"),
            this.localize("month"),
            this.localize("quarter"),
          ],
        },
      },
      storeSeries: [
        {
          name: this.localize("sales"),
          data: [400000, 350000, 400000, 600000],
        },
      ],
      websiteOptions: {
        plotOptions: {
          bar: {
            columnWidth: "40%",
          },
        },
        chart: {
          id: "2",
        },
        colors: ["#000000"],
        xaxis: {
          categories: [
            this.localize("lastDay"),
            this.localize("week"),
            this.localize("month"),
            this.localize("quarter"),
          ],
        },
      },
      websiteSeries: [
        {
          name: this.localize("sales"),
          data: [600000, 650000, 700000, 800000],
        },
      ],
      tabs: [
        { id: 1, title: this.localize("website") },
        { id: 2, title: this.localize("store") },
      ],
      noDataMessage: {
        icon: "IconSearchOff",
        title: this.localize("nothingFound", "default"),
        text: this.localize("pleaseClarifyYourSearchQuery", "role"),
      },
      tableColumns: [
        { field: "name", header: this.localize("nameCapslock", "default") },
        {
          field: "lastSaleDate",
          header: this.localize("lastSaleDateCapslock"),
        },
        { field: "quantity", header: this.localize("totalQuantityCapslock") },
        { field: "cost", header: this.localize("totalValueCapslock") },
      ],
      tableRows: [
        {
          id: "1",
          name: "Nail Polish",
          lastSaleDate: "12.05.2022",
          quantity: 65,
          cost: "1200EUR",
        },
        {
          id: "2",
          name: "Manicure Set",
          lastSaleDate: "05.08.2021",
          quantity: 92,
          cost: "1800EUR",
        },
        {
          id: "3",
          name: "Cuticle Oil",
          lastSaleDate: "18.11.2023",
          quantity: 30,
          cost: "500EUR",
        },
        {
          id: "4",
          name: "Nail Art Brushes",
          lastSaleDate: "30.03.2022",
          quantity: 45,
          cost: "750EUR",
        },
        {
          id: "5",
          name: "UV Nail Lamp",
          lastSaleDate: "02.09.2023",
          quantity: 20,
          cost: "1200EUR",
        },
        {
          id: "6",
          name: "Gel Nail Polish",
          lastSaleDate: "14.07.2022",
          quantity: 75,
          cost: "950EUR",
        },
        {
          id: "7",
          name: "Nail File Set",
          lastSaleDate: "09.01.2024",
          quantity: 40,
          cost: "600EUR",
        },
        {
          id: "8",
          name: "Acrylic Nail Kit",
          lastSaleDate: "22.06.2023",
          quantity: 55,
          cost: "1400EUR",
        },
        {
          id: "9",
          name: "Nail Strengthening Serum",
          lastSaleDate: "05.04.2022",
          quantity: 28,
          cost: "350EUR",
        },
        {
          id: "10",
          name: "Nail Dryer Spray",
          lastSaleDate: "19.12.2021",
          quantity: 60,
          cost: "800EUR",
        },
      ],
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    localize(key, module = "dashboard") {
      return PrintUtil.localize(key, module);
    },
  },
});
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
.main-area {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
</style>
