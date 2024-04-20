import "mdb-vue-ui-kit/css/mdb.min.css";
import "animate.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import VueApexCharts from "vue3-apexcharts";
import Tooltip from "primevue/tooltip";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrintUtil from "@/utils/localization/print.util";
import LoggerUtil from "@/utils/logger/logger.util";

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.use(VueApexCharts);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {});
app.use(ToastService);

app.mount("#app");
