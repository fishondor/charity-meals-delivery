import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebaseService from './providers/Firebase'
import { dbService } from './providers/Db'
import notificationsService from './providers/Notifications'
import logger from './providers/Logger'
import loaderService from './providers/Loader'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    firebaseService,
    dbService,
    notificationsService,
    logger,
    loaderService,
    created: function(){
      firebaseService.init(store, logger);
      notificationsService.init(store);
      loaderService.init(store);
    },
    render: h => h(App)
  }).$mount('#app')
