var mongoose = require('mongoose');
require('mongoose-type-phone');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var carrierSchema = new Schema(
    {
        name: String,
        phone: mongoose.SchemaTypes.Phone,
        email: mongoose.SchemaTypes.Email,
    },
    { timestamps: true }
)

var Carrier = mongoose.model('Carrier', carrierSchema);

module.exports.schema = carrierSchema;
module.exports.model = Carrier;