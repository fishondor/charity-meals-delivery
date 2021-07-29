import firebase from "firebase/app";
import "firebase/auth";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = Cypress.env('FIREBASE_CONFIG');

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    let clientId = Cypress.env('VUE_APP_GOOGLE_CLIENTID');
    let host = Cypress.env('HOST');
    cy.log("host" + host)
    cy.log('clientId' + clientId)
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('VUE_APP_GOOGLE_CLIENTID'),
        client_secret: Cypress.env('VUE_APP_GOOGLE_CLIENT_SECRET'),
        refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body
  
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body)
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
  
        window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
      })
    })
})