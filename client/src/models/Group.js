/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    index: Number,
    carrier: String,
    description: String,
    pickups: [
        {
            pickup: String,
            done: Boolean
        }
    ],
    destination: {
        name: String,
        phone: String,
        address: String,
        done: Boolean
    },
    _id: String
}

const validate = ajv.compile(schema) */

import Pickup from './Pickup'

class Group{
    constructor(data){

        this.index = data.index
        this.description = data.description
        this.pickups = Pickup.fromObject(data.pickups)
        this.carrier = data.carrier
        this.destination = data.destination || {}
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    static fromSnapshot(snapshot){
        let groups = []
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            let group = new Group(childData);
            group.id = childKey;
            groups.push(group)
        });
        return groups
    }
}

export default Group