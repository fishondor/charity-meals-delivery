/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    index: Number,
    carrier: String,
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
    }
}

const validate = ajv.compile(schema) */

class Group{
    constructor(data){

        this.data = data;
    }
}

export default Group