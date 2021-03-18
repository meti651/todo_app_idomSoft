import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./assets/style.scss";
import App from "./App.vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);

import "@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css";
import VueClockPickerPlugin from "@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.plugin.js";
Vue.use(VueClockPickerPlugin);

new Vue({
    el: "#app",
    components: { App },
    template: "<App/>",
});
