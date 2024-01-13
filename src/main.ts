import 'mdb-vue-ui-kit/css/mdb.min.css';
import 'animate.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';




import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
})
app.use(ToastService)

app.mount('#app')
