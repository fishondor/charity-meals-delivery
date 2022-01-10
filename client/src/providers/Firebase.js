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
        this.db = firebase.database()
        this.auth = firebase.auth()

        if (Environment.get('VUE_APP_LOCAL_FIREBASE_EMULATORS_ACTIVE') === "true") {
            this.db.useEmulator("localhost", Environment.get('VUE_APP_LOCAL_FIREBASE_EMULATORS_DB_PORT'));
            this.auth.useEmulator(
                `http://localhost:${Environment.get('VUE_APP_LOCAL_FIREBASE_EMULATORS_AUTH_PORT')}`,
                {
                    disableWarnings: true
                }
            );
        }
    }

    getCurrentUser(){
        return new Promise((resolve, reject) => {
            const unsubscribe = this.auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        })
    }

    logout(){
        return this.auth.signOut();
    }

    get firebase(){
        return firebase;
    }

    async getToken(){
        try{
            let token = await this.auth.currentUser.getIdToken();
            return token;
        }catch(err){
            this.logger.error(`Err fetching user token: ${err}`);
        }
    }

    get firebaseUiInstance(){
        if(!this._firebaseUiInstance)
            this._firebaseUiInstance = new firebaseui.auth.AuthUI(this.auth);
        return this._firebaseUiInstance;
    }

    async createDelivery(delivery){
        try{
            let deliveriesRef = this.db.ref("/deliveries");
            let ref = await deliveriesRef.push(delivery)
            return ref.getKey();
        }catch(err){
            this.logger.error(`Err creating delivery: ${err}`);
            return false
        }
    }

    async getDelivery(deliveryId){
        try{
            let ref = await this.db.ref(`/deliveries/${deliveryId}`);
            return ref
        }catch(err){
            this.logger.error(`Err getting delivery ${deliveryId}: ${err}`);
            return false
        }
    }

    async getDeliveryOwner(deliveryId){
        try{
            let ref = await this.db.ref(`/deliveries/${deliveryId}/ownerId`);
            let snapshot = await ref.once('value');
            return snapshot.val()
        }catch(err){
            this.logger.error(`Err getting delivery ${deliveryId}: ${err}`);
            return false
        }
    }

    async saveDestination(ownerId, destination){
        try{
            let destinationsRef = this.db.ref(`/destinations/${ownerId}`);
            let ref = await destinationsRef.push(destination)
            return ref.getKey();
        }catch(err){
            this.logger.error(`Err creating destination: ${err}`);
            return false
        }
    }

    async editDestination(ownerId, destination){
        try{
            let destinationRef = this.db.ref(`/destinations/${ownerId}/${destination.id}`);
            await destinationRef.set(destination)
            return true;
        }catch(err){
            this.logger.error(`Err editing destination: ${err}`);
            return false
        }
    }

    async getDeliveriesByOwner(ownerId){
        try{
            let ref = await this.db.ref(`/deliveries`)
                .orderByChild("ownerId")
                .equalTo(ownerId);
            let snapshot = await ref.once('value');
            return snapshot
        }catch(err){
            this.logger.error(`Err getting deliveries for owner ${ownerId}: ${err}`);
            return false
        }
    }

    async getDestinationsByOwner(ownerId){
        try{
            let ref = await this.db.ref(`/destinations/${ownerId}`);
            let snapshot = await ref.once('value');
            return snapshot
        }catch(err){
            this.logger.error(`Err getting destinations for owner ${ownerId}: ${err}`);
            return false
        }
    }

    deleteDelivery(deliveryId){
        try{
            this.db.ref(`/deliveries`).child(deliveryId).remove()
            return true
        }catch(err){
            this.logger.error(`Err deleting delivery ${deliveryId}: ${err}`);
            return false
        }
    }

    deleteDestination(ownerId, destinationId){
        try{
            this.db.ref(`/destinations/${ownerId}`).child(destinationId).remove()
            return true
        }catch(err){
            this.logger.error(`Err deleting destination ${destinationId}: ${err}`);
            return false
        }
    }

    async registerCarrier(deliveryId, carrier){
        try{
            let carrierRef = this.db.ref(`/deliveries/${deliveryId}/carriers/${carrier.id}`);
            await carrierRef.set(carrier.data)
            return true
        }catch(err){
            this.logger.error(`Err registering carrier to ${deliveryId}: ${err}`, "Carrier", carrier);
            return false
        }
    }

    getRef(deliveryId, refPath){
        return this.db.ref(`/deliveries/${deliveryId}/${refPath}`)
    }

    getDestinationsRef(ownerId){
        return this.db.ref(`/destinations/${ownerId}`)
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