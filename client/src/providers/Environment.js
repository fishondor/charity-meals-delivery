import logger from './Logger'

const constants = {
    VUE_APP_API_KEY: process.env.VUE_APP_API_KEY,
    VUE_APP_FIREBASE_API_KEY: process.env.VUE_APP_FIREBASE_API_KEY,
    VUE_APP_FIREBASE_AUTH_DOMAIN: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    VUE_APP_FIREBASE_DATABASE_URL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    VUE_APP_FIREBASE_PROJECT_ID: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    VUE_APP_FIREBASE_STORAGE_BUCKET: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
}

const get = (name) => {
    if(!constants[name]){
        logger.error(`could not find ${name}`)
        return null
    }

    return constants[name]
}

export default {
    get
}