/* import Ajv from "ajv" */

/* import Pickup from './Pickup'
import Carrier from './Carrier' */
/* import Group from './Group'

const ajv = new Ajv()

const schema = {
    ownerId: String,
    secondaryAdmins: [String],
    date: Date,
    description: String,
    lockCooksRegistration: Boolean
    groups: [
        Group.schema
    ],
    carriers: [
        Carrier.schema
    ],
    pickups: [
        Pickup.schema
    ],
    _id: String
}

const validate = ajv.compile(schema) */

class Delivery{
    constructor(data){
        this.ownerId = data.ownerId;
        this.date = data.date;
        this.description = data.description;
        this.lockCooksRegistration = data.lockCooksRegistration;
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    set owner(id){
        this.ownerId = id
    }

    get owner(){
        return this.ownerId
    }

    static fromSnapshot(snapshot){
        let deliveries = []
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            let delivery = new Delivery(childData);
            delivery.id = childKey;
            deliveries.push(delivery)
        });
        return deliveries
    }
}

export default Delivery;