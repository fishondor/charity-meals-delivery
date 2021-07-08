import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';

import App from './App.vue'
import router from './router'
import store from './store'

import notificationsService from './providers/Notifications'
import logger from './providers/Logger'
import loaderService from './providers/Loader'
import firebaseService from './providers/Firebase'
import './providers/Filters'
import titleMixin from './mixins/titleMixin'

Vue.config.productionTip = false

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.mixin(titleMixin)

new Vue({
    router,
    store,
    vuetify,
    notificationsService,
    logger,
    loaderService,
    firebaseService,
    created: function(){
      notificationsService.init(store);
      loaderService.init(store);
    },
    render: h => h(App)
  }).$mount('#app')
