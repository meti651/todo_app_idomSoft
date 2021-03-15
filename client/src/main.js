import Vue from "vue"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "./assets/style.scss"
import App from "./App.vue";

import VueMaterial from "vue-material"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
})
