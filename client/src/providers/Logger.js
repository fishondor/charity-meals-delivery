import Vue from 'vue';

class Logger{

    info(...message){
        console.log(message);
    }

    error(...message){
        console.error(message);
    }

    warn(...message){
        console.warn(message);
    }

}

const logger = new Logger();

Vue.mixin( {
  beforeCreate() {
    const options = this.$options;
    if ( options.logger )
      this.$logger = options.logger;
    else if ( options.parent && options.parent.$logger )
      this.$logger = options.parent.$logger;
  }
} );

export default logger;