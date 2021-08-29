/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    name: String,
    phone: String,
    address: String,
    description: String,
    _id: String
}

const validate = ajv.compile(schema) */

class Destination{
    constructor(data){
        this.name = data.name;
        this.phone = data.phone;
        this.address = data.address;
        this.description = data.description || "";
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    static fromObject(destinationsObject = {}){
        return Object.keys(destinationsObject).map(
            key => {
                let destination = new Destination(destinationsObject[key])
                destination.id = key
                return destination
            }
        )
    }

    static fromSnapshot(snapshot){
        let destinations = []
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            let destination = new Destination(childData);
            destination.id = childKey;
            destinations.push(destination)
        });
        return destinations
    }
}

export default Destination