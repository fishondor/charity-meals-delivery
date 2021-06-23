import Vue from 'vue';
import firebase from 'firebase'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css";

import Environment from './Environment'
import logger from './Logger'

const config = {
    apiKey: Environment.get('VUE_APP_FIREBASE_API_KEY'),
    authDomain: Environment.get('VUE_APP_FIREBASE_AUTH_DOMAIN'),
    databaseURL: Environment.get('VUE_APP_FIREBASE_DATABASE_URL'),
    projectId: Environment.get('VUE_APP_FIREBASE_PROJECT_ID'),
    storageBucket: Environment.get('VUE_APP_FIREBASE_STORAGE_BUCKET')
}

class FirebaseService{
    constructor(){
        this.logger = logger
        firebase.initializeApp(config);
    }

    getCurrentUser(){
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    }

    logout(){
        return firebase.auth().signOut();
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

    async createDelivery(delivery){
        try{
            let deliveriesRef = firebase.database().ref("/deliveries");
            let ref = await deliveriesRef.push(delivery)
            return ref.getKey();
        }catch(err){
            this.logger.error(`Err creating delivery: ${err}`);
            return false
        }
    }

    async getDelivery(deliveryId){
        try{
            let ref = await firebase.database().ref(`/deliveries/${deliveryId}`);
            return ref
        }catch(err){
            this.logger.error(`Err getting delivery ${deliveryId}: ${err}`);
            return false
        }
    }

    async getDeliveryOwner(deliveryId){
        try{
            let ref = await firebase.database().ref(`/deliveries/${deliveryId}/ownerId`);
            let snapshot = await ref.once('value');
            return snapshot.val()
        }catch(err){
            this.logger.error(`Err getting delivery ${deliveryId}: ${err}`);
            return false
        }
    }

    async registerCarrier(deliveryId, carrier){
        try{
            let carrierRef = firebase.database().ref(`/deliveries/${deliveryId}/carriers/${carrier.id}`);
            await carrierRef.set(carrier.data)
            return true
        }catch(err){
            this.logger.error(`Err registering carrier to ${deliveryId}: ${err}`, "Carrier", carrier);
            return false
        }
    }

    getRef(deliveryId, refPath){
        return firebase.database().ref(`/deliveries/${deliveryId}/${refPath}`)
    }

}

const firebaseService = new FirebaseService()

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