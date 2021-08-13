<template>
  <v-footer
    color="primary lighten-2 pa-1 white--text text-caption"
    padless
  >
        <v-icon color="white" small>{{icons.copyRights}}</v-icon>Ariel Fisher {{ new Date().getFullYear() }}
        &nbsp;|&nbsp;
        <router-link 
            v-for="link in links" 
            :key="link.name" 
            :to="link.name"
            color="white">
            {{ link.label }}
        </router-link>
  </v-footer>
</template>

<script>
import {
    copyRights
} from './icons'

export default {
    data: () => ({
        links: [
            {
                label: 'תנאי שימוש',
                name: '/tos'
            }
        ],
        icons: {
            copyRights
        }
    }),
}
</script>

<style lang="scss" scoped>
.router-link,
.router-link-active{
  color: white;
  text-decoration: none;
}
</style>