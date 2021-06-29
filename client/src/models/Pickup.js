/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    name: String,
    phone: String,
    address: String,
    description: String,
    done: Boolean,
    _id: String
}

const validate = ajv.compile(schema) */

class Pickup{
    constructor(data){
        this.name = data.name;
        this.phone = data.phone;
        this.address = data.address;
        this.description = data.description;
        this.done = data.done;
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    static fromObject(pickupsObject = {}){
        return Object.keys(pickupsObject).map(
            key => {
                let pickup = new Pickup(pickupsObject[key])
                pickup.id = key
                return pickup
            }
        )
    }

    static fromSnapshot(snapshot){
        let pickups = []
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            let pickup = new Pickup(childData);
            pickup.id = childKey;
            pickups.push(pickup)
        });
        return pickups
    }
}

export default Pickup