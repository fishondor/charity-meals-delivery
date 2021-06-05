var chalk = require("chalk");

class ServerLogger{

    constructor(name){
        this.name = name;
    }

    info(message){
        var prefix = (this.name) ? "[INFO] ("+this.name+") " : "[INFO]";
        console.log(prefix + message);
    }
    error(message){
        var prefix = (this.name) ? "[ERROR] ("+this.name+") " : "[ERROR]";
        console.error(chalk.red(prefix + message));
    }
    warn(message){
        var prefix = (this.name) ? "[WARN] ("+this.name+") " : "[WARN]";
        console.warn(chalk.yellow(prefix + message));
    }
}

module.exports = ServerLogger;