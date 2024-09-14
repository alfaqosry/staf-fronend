import { createApp } from 'vue'
import { createPinia } from 'pinia';

// import './style.css'
import App from './App.vue'

// css
import "./assets/vendors/feather/feather.css";
import "./assets/vendors/mdi/css/materialdesignicons.min.css";
import "./assets/vendors/ti-icons/css/themify-icons.css";
import "./assets/vendors/font-awesome/css/font-awesome.min.css";
import "./assets/vendors/typicons/typicons.css";
import "./assets/vendors/simple-line-icons/css/simple-line-icons.css";
import "./assets/vendors/css/vendor.bundle.base.css";
import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css";
import "./assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
import "./assets/js/select.dataTables.min.css";
import "./assets/css/style.css";


// js

import "./assets/vendors/js/vendor.bundle.base.js";
import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js";
import "./assets/vendors/chart.js/chart.umd.js";
import "./assets/vendors/progressbar.js/progressbar.min.js";
import "./assets/js/off-canvas.js";
import "./assets/js/template.js";
import "./assets/js/settings.js";
import "./assets/js/hoverable-collapse.js";
import "./assets/js/todolist.js";
import "./assets/js/jquery.cookie.js";
import "./assets/js/dashboard.js";





import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import '../axios.js';
import router from './router/index.js';
import Shimmer from 'vue3-shimmer';

const app = createApp(App);
const pinia = createPinia();
app.component('VueDatePicker', VueDatePicker);
app.use(Shimmer);
app.use(pinia);
app.use(router);
app.mount('#app')

