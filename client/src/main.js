import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import App from './App.vue'
import router from './router'
import store from './store'

import notificationsService from './providers/Notifications'
import logger from './providers/Logger'
import loaderService from './providers/Loader'
import firebaseService from './providers/Firebase'
import './providers/Filters'

import Environment from './providers/Environment'

Vue.config.productionTip = false

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
