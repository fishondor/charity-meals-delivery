class EnvironmentVariables {

    constructor(){
        if(process.env.ENV == 'dev')
            require('dotenv').config({path: __dirname + '/../../.env'});
    }

    get(name){
        return process.env[name];
    }

}

const environmentVariables = new EnvironmentVariables()

module.exports = environmentVariables;