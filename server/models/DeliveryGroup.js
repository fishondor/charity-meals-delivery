var mongoose = require('mongoose');

require('./Pickup')
require('./Carrier')

var Schema = mongoose.Schema;

var deliveryGroupSchema = new Schema(
    {
        index: Number,
        carrier: {
            type:   String,
            ref:    'Carrier'
        },
        stops: [
            {
                cooker: {
                    type:   String,
                    ref:    'Pickup'
                },
                done: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        destination: {
            name: String,
            phone: mongoose.SchemaTypes.Phone,
            address: String
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

var DeliveryGroup = mongoose.model('DeliveryGroup', deliveryGroupSchema);

module.exports.schema = deliveryGroupSchema;
module.exports.model = DeliveryGroup;