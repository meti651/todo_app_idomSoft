import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./assets/style.scss";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import {
    MdButton,
    MdCard,
    MdCheckbox,
    MdContent,
    MdDialog,
    MdDivider,
    MdField,
    MdIcon,
    MdList,
    MdMenu,
    MdSubheader,
} from "vue-material/dist/components";
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdCheckbox);
Vue.use(MdContent);
Vue.use(MdDialog);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdMenu);
Vue.use(MdSubheader);

import "@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css";
import VueClockPickerPlugin from "@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.plugin.js";
Vue.use(VueClockPickerPlugin);

new Vue({
    el: "#app",
    components: {
        App: () => import("./App.vue"),
    },
    template: "<App/>",
});
