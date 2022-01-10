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

        this.index = parseInt(data.index)
        this.description = data.description
        this.pickups = Pickup.fromObject(data.pickups)
        this.carrier = data.carrier || null
        this.destination = data.destination || {}
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    static fromDestination(destination){
        return new Group({
            index: destination.index,
            description: destination.description,
            destination: {
                name: destination.name,
                address: destination.address,
                phone: destination.phone
            }
        })
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