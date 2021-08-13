<template>
  <v-app light>
    <Navigation />
    <v-main class="pb-0">
      <router-view></router-view>
    </v-main>
    <Footer />
    <Notification />
    <Loader />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  title: "מחלקים ארוחות שישי",
  components: {
      Navigation: () => import('./components/Navigation'),
      Notification: () => import('./components/Notification'),
      Loader: () => import('./components/Loader'),
      Footer: () => import('./components/Footer')
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
