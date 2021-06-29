/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    name: String,
    phone: String,
    email: String,
    pickupsNumber: Number,
    uid: String
}

const validate = ajv.compile(schema)
 */
class Carrier{
    constructor(data){
        this._id = data.uid;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.pickupsNumber = data.pickupsNumber; 
    }

    set id(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    isDisabled(groups = []){
        let carriersGroups = groups.filter(
            group => group.carrier == this._id
        );
        return carriersGroups.length >= this.pickupsNumber
    }

    static fromSnapshot(snapshot){
        let carriers = []
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            let carrier = new Carrier(childData);
            carrier.id = childKey;
            carriers.push(carrier)
        });
        return carriers
    }
}

export default Carrier