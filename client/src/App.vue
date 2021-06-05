<template>
  <v-app light>
    <v-content class="pb-0">
      <router-view></router-view>
    </v-content>
    <Notification />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
      Notification: () => import('./components/Notification')
  },

  data: () => ({
    //
  }),
};
</script>
