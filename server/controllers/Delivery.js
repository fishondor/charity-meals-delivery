var serverLogger = require('../providers/Logger');

var Delivery = require('../models/Delivery');

var logger = new serverLogger('Delivery controller');

var saveDelivery = async (delivery) => {
    try{
        let deliveryModel = new Delivery.model(delivery)
        let document = await deliveryModel.save()
        if(!document){
            logger.warn(`Create delivery did not return new object. Returned ${document}`);
            return false;
        }
        return document;
    }catch(err){
        logger.error(`Error creating delivery. Error: ${err}`);
        return false
    }
}

var getDelivery = async (id) => {
    try{
        var data = await Delivery.model.findById(id)
        .populate('deliveries')
        .lean();
        if(!data){
            logger.error(`Delivery ${id} could not be found. Data ${data}`);
            return false;
        }
        return data;
    }catch(err){
        logger.error(`Error getting delivery: ${id}: ${err}`);
        return false;
    }
}

const api = {
    save: async (req, res) => {
        let data = req.body;
        try{
            document = await saveDelivery(data);
            if(!document){
                logger.error("Could not save delivery day", data)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error saving delivery day", error)
            res.status(500).send()
        }
    },
    getById: async (req, res) => {
        let id = req.params.id;
        try{
            document = await getDelivery(id);
            if(!document){
                logger.error("Could not get delivery", id)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error getting delivery", error)
            res.status(500).send()
        }
    }
}

module.exports = {
    api
}