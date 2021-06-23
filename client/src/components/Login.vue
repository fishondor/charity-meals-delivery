<template>
    <v-card
        width="auto">
        <v-card-title class="headline">Sign in</v-card-title>
        <v-card-text>
            Please login or sign up using one of the methods below.
            <div id="firebaseuiAuthContainer"></div>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    methods: {
        initUI: function(uiConfig){
            this.$firebaseService.firebaseUiInstance.start('#firebaseuiAuthContainer', uiConfig);
        }
    },
    mounted() {
        let uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: async () => {
                    let user = await this.$firebaseService.getCurrentUser();
                    this.$store.commit('setUser', user)
                    this.$router.push(this.$route.query.redirect || '/')
                    return true;
                },
                signInFailure: () => {
                    this.$notificationsService.error("Could not login. Please try again later");
                    return false;
                }
            },
            signInOptions: [
                this.$firebaseService.firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
        };
        this.initUI(uiConfig);
    },
}
</script>

<style scoped>
ul.firebaseui-idp-list{
    padding-left: 0;
}
</style>