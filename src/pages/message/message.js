import Vue from 'vue'
import message from '..message/message.vue'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: h => h(message)
}).$mount('#message')