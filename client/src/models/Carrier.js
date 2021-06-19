/* import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
    name: String,
    phone: String,
    email: String,
}

const validate = ajv.compile(schema)
 */
class Carrier{
    constructor(data){

        this.data = data;
    }
}

export default Carrier