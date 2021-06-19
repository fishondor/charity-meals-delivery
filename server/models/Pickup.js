var mongoose = require('mongoose');
var mongooseTypePhone = require('mongoose-type-phone');

var Schema = mongoose.Schema;

var pickupSchema = new Schema(
    {
        name: String,
        phone: mongoose.SchemaTypes.Phone,
        address: String,
        description: String
    },
    { timestamps: true }
)

var Pickup = mongoose.model('Pickup', pickupSchema);

module.exports.schema = pickupSchema;
module.exports.model = Pickup;