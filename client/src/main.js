import Vue from 'vue'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import App from './App.vue'
import router from './router'
import store from './store'

import { dbService } from './providers/Db'
import notificationsService from './providers/Notifications'
import logger from './providers/Logger'
import loaderService from './providers/Loader'

import Environment from './providers/Environment'

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: Environment.get('VUE_APP_API_KEY'),
});

new Vue({
    router,
    store,
    vuetify,
    dbService,
    notificationsService,
    logger,
    loaderService,
    created: function(){
      notificationsService.init(store);
      loaderService.init(store);
    },
    render: h => h(App)
  }).$mount('#app')
