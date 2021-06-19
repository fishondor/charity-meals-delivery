<template>
  <v-app light>
    <Navigation />
    <v-content class="pb-0">
      <router-view></router-view>
    </v-content>
    <Notification />
  </v-app>
</template>

<script>
import firebaseService from "./providers/Firebase"

export default {
  name: 'App',
  components: {
      Navigation: () => import('./components/Navigation'),
      Notification: () => import('./components/Notification')
  },
  beforeCreate: async function(){
    let user = await firebaseService.getCurrentUser();
    this.$store.commit('setUser', user)
  },
  data: () => ({
    //
  }),
};
</script>
