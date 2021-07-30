import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = Cypress.env('FIREBASE_CONFIG');

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
