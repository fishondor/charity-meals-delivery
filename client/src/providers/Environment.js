import logger from './Logger'

const get = (name) => {
    if(!process.env[name]){
        logger.error(`could not find ${name}`)
        return null
    }

    return process.env[name]
}

export default {
    get
}