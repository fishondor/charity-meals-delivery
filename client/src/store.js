import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    loginModalOpen: false,
    notification: {},
    loader: {},
    requestedRoute: null,
    destinations: []
  },
  mutations: {
    setUser(state, user){
      Vue.set(state, 'user', user);
    },
    setLoginModalState(state, loginModalOpen){
      state.loginModalOpen = loginModalOpen;
    },
    setNotification(state, notification){
      state.notification = notification;
    },
    setLoader(state, loader){
      state.loader = loader;
    },
    setRequestedRoute(state, route){
      state.requestedRoute = route;
    },
    setDestinations(state, destinations){
      state.destinations = destinations
    }
  },
  getters: {
    user: state => state.user,
    loginModalOpen: state => state.loginModalOpen,
    notification: state => state.notification,
    requestedRoute: state => state.requestedRoute,
    destinations: state => state.destinations
  }
})
