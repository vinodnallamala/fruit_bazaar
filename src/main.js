
import Vue from 'vue'
import App from './App.vue' 
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Notifications from 'vue-notification'

Vue.use(BootstrapVue)
Vue.use(Notifications)





import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
}).$mount('#app')
