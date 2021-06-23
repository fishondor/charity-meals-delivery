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
        this.uid = data.uid;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.pickupsNumber = data.pickupsNumber; 
    }

    get id(){
        return this.uid
    }

    get data(){
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            pickupsNumber: this.pickupsNumber
        }
    }
}

export default Carrier