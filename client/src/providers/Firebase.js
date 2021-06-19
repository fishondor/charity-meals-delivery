import firebase from 'firebase'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css";

import Environment from './Environment'

const config = {
    apiKey: Environment.get('VUE_APP_FIREBASE_API_KEY'),
    authDomain: Environment.get('VUE_APP_FIREBASE_AUTH_DOMAIN'),
    databaseURL: Environment.get('VUE_APP_FIREBASE_DATABASE_URL'),
    projectId: Environment.get('VUE_APP_FIREBASE_PROJECT_ID'),
    storageBucket: Environment.get('VUE_APP_FIREBASE_STORAGE_BUCKET')
}

class FirebaseService{
    constructor(){
        firebase.initializeApp(config);

        this.deliveriesRef = firebase.database().ref("/deliveries");
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
            let ref = await this.deliveriesRef.push(delivery)
            return ref.getKey();
        }catch(err){
            this.logger.error(`Err creating delivery: ${err}`);
            return false
        }
    }

}

const firebaseService = new FirebaseService()

export default firebaseService;