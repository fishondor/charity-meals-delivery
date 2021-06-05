import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
}

class FirebaseService{
    init(store, logger){
        this.logger = logger;
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                store.commit('setUser', user)
            } else {
                store.dispatch('clearUserData')
            }
        });
    }

    logout(){
        firebase.auth().signOut();
    }

    get firebase(){
        return firebase;
    }

    async getToken(){
        try{
            let token = await firebase.auth().currentUser.getIdToken();
            return token;
        }catch(err){
            this.logger.error(`Err fetching user token: ${err}`);
        }
    }

    get firebaseUiInstance(){
        if(!this._firebaseUiInstance)
            this._firebaseUiInstance = new firebaseui.auth.AuthUI(this.firebase.auth());
        return this._firebaseUiInstance;
    }
}

const firebaseService = new FirebaseService();

Vue.mixin( {
  beforeCreate() {
    const options = this.$options;
    if ( options.firebaseService )
      this.$firebaseService = options.firebaseService;
    else if ( options.parent && options.parent.$firebaseService )
      this.$firebaseService = options.parent.$firebaseService;
  }
} );

export default firebaseService;