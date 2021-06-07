var mongoose = require('mongoose');

const Logger = require('./Logger');
var logger = new Logger('DbService');

var connect = async (host, port, user, pass, dbName) => {
    let mongodb_uri = `mongodb://${host}:${port}/${dbName}?authSource=admin`
    try{
        await mongoose.connect(
            mongodb_uri,
            {
                useNewUrlParser: true,
                user: user,
                pass: pass
            }
        )
        logger.info('Connected to: ' + mongodb_uri);
    }catch(err){
        logger.error('ERROR connecting to: ' + mongodb_uri + '. ' + err);
    }
}

module.exports.connect = connect;