<template>
  <v-app light>
    <Navigation />
    <v-main class="pb-0">
      <router-view></router-view>
    </v-main>
    <Notification />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  title: "מחלקים ארוחות שישי",
  components: {
      Navigation: () => import('./components/Navigation'),
      Notification: () => import('./components/Notification')
  },
  beforeCreate: async function(){
    let user = await this.$firebaseService.getCurrentUser();
    this.$store.commit('setUser', user)
  },
  data: () => ({
    //
  }),
};
</script>
