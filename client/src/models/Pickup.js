/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    name: String,
    phone: String,
    address: String,
    description: String
}

const validate = ajv.compile(schema) */

class Pickup{
    constructor(data){

        this.data = data;
    }
}

export default Pickup