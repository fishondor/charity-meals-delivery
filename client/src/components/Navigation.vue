<template>
  <div>
    <v-app-bar
      color="blue lighten-2"
      dark
      app
    >
      <v-toolbar-title class="pl-0 pt-2">
        <a class="nav-logo" href="/">
          
        </a>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <template v-if="user">
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="navbar-user-avatar"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar
                v-if="user"
                size="36px"
              >
                <img
                  v-if="user.photoURL"
                  alt="Avatar"
                  :src="user.photoURL"
                >
                <v-icon v-else>{{icons.account}}</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title><v-btn id="navbar-logout" text small @click="logOut">יציאה</v-btn></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-btn id="navbar-login" v-else text small @click="logIn">כניסה</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

var {
  account
} = require('./icons');

export default {
  name: "Navigation",
  components: {
  },
  data: () => ({
    icons: {
      account
    },
    hideLogin: false
  }),
  props: [
  ],
  methods: { 
    async logOut() { 
        try {
          await this.$firebaseService.logout();
          this.$store.commit('setUser', null)
          this.$router.push({ path: 'login' });
        }catch(error){
          this.$logger.error("Could not log out", error)
        }
    },
    logIn: function(){
        this.$router.push({ path: 'login' });
    }
  },
  computed: mapState({
      user: function(state){
          return state.user;
      }
  })
}
</script>

<style lang="scss">
.nav-logo{
  padding: 5px;
  picture, img{
    height: 45px
  }
}
.v-toolbar__title{
  padding-left: 0;
}
</style>