var mongoose = require('mongoose');

var Schema = mongoose.Schema;

require('./DeliveryGroup');

var deliverySchema = new Schema(
    {
        project: {
            type: String,
        },
        date: Date,
        groups: [
            {
                type:   String,
                ref:    'DeliveryGroup'
            }
        ],
        carriers: [
            {
                type:   String,
                ref:    'Carrier'
            }
        ]
    },
    { timestamps: true }
)

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports.schema = deliverySchema;
module.exports.model = Delivery;