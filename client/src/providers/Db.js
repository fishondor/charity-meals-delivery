import Vue from 'vue';
import axios from 'axios'

class DbService{

    static headers(uid, token){
        return {
            authorization: token,
            user_id: uid
        }
    }

    async getUser(id, authToken){
        try{
            let response = await axios.get(`/api/user/${id}`, {headers: DbService.headers(id, authToken)});
            return response.data;
        }catch{
            return false;
        }
    }

    async saveTag(tag, authToken){
        try{
            let response = await axios.post('/api/page', tag, {headers: DbService.headers(tag.uid, authToken)});
            return response.data;
        }catch{
            return false;
        }
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