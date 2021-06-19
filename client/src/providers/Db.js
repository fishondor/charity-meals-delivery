import Vue from 'vue';
import axios from 'axios'

import firebaseService from './Firebase'

class DbService{

    static async getById(name, id){
        try{
            let headers = await DbService.headers()
            let response = await axios.get(`/api/${name}/${id}`,
                {
                    headers: headers
                }
            );
            return response.data;
        }catch{
            return false;
        }
    }

    static async get(name){
        try{
            let headers = await DbService.headers()
            let response = await axios.get(`/api/${name}`,
                {
                    headers: headers
                }
            );
            return response.data;
        }catch{
            return false;
        }
    }

    static async save(name, data){
        try{
            let headers = await DbService.headers()
            let response = await axios.post(`/api/${name}/create`, 
                data, 
                {
                    headers: headers
                }
            );
            return response.data;
        }catch{
            return false;
        }
    }

    static async headers(){
        let token = await firebaseService.getToken();
        return {
            authorization: token
        }
    }

    async saveDelivery(delivery){
        return DbService.save("delivery", delivery)
    }

    async getDelivery(id){
        return DbService.getById("delivery", id);
    }

    async savePickup(pickup){
        return DbService.save("pickup", pickup)
    }

    async getPickup(id){
        return DbService.getById("pickup", id);
    }

    async getDeliveries(){

    }

    async deleteTag(tag, authToken){
        try{
            let response = await axios.delete(`/api/page/${tag._id}`, {headers: DbService.headers(tag.uid, authToken)});
            return response.status == 200;
        }catch{
            return false;
        }
    }

}

const dbService = new DbService();

Vue.mixin( {
  beforeCreate() {
    const options = this.$options;
    if ( options.dbService )
      this.$dbService = options.dbService;
    else if ( options.parent && options.parent.$dbService )
      this.$dbService = options.parent.$dbService;
  }
} );

export {dbService, DbService} ;