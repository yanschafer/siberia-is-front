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

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.use(VueApexCharts);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  locale: {
    cancel: PrintUtil.localize("cancel", "media"),
    choose: PrintUtil.localize("choose", "media"),
    upload: PrintUtil.localize("upload", "media"),
    //...
  },
});
app.use(ToastService);

app.mount("#app");
