import Vue from 'vue';

const COMMIT_NAME = 'setLoader';

class LoaderService{

    init(store){
        this.store = store;
    }

    show(){
        this.store.commit(COMMIT_NAME, {show: true});
    }

    hide(){
        this.store.commit(COMMIT_NAME, {show: false});
    }

}

const loaderService = new LoaderService();

Vue.mixin( {
  beforeCreate() {
    const options = this.$options;
    if ( options.loaderService )
      this.$loaderService = options.loaderService;
    else if ( options.parent && options.parent.$loaderService )
      this.$loaderService = options.parent.$loaderService;
  }
} );

export default loaderService;