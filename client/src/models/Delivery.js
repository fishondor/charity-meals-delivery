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
    timeOptions: [
        { time: String, numOfCarriers: Number }
    ],
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

const TIME_OPTIONS = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30"
].map(item => ({time: item, numOfCarriers: 0}))

class Delivery{
    constructor(data){
        this.ownerId = data.ownerId;
        this.date = data.date;
        this.description = data.description;
        this.timeOptions = data.timeOptions || []
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

    static TIME_OPTIONS = TIME_OPTIONS
}

export default Delivery;