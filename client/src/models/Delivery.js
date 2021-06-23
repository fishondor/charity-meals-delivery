/* import Ajv from "ajv" */

/* import Pickup from './Pickup'
import Carrier from './Carrier' */
/* import Group from './Group'

const ajv = new Ajv()

const schema = {
    project: String,
    date: Date,
    groups: [
        Group.schema
    ],
    carriers: [
        Carrier.schema
    ],
    pickups: [
        Pickup.schema
    ]
}

const validate = ajv.compile(schema) */

class Delivery{
    constructor(data){

        this.data = data;
    }

    set owner(id){
        this.ownerId = id
    }

    get owner(){
        return this.ownerId
    }
}

export default Delivery;