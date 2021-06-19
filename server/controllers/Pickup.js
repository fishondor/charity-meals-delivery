var serverLogger = require('../providers/Logger');

var Pickup = require('../models/Pickup');

var logger = new serverLogger('Pickup controller');

var savePickup = async (pickup) => {
    try{
        let pickupModel = new Pickup.model(pickup)
        let document = await pickupModel.save()
        if(!document){
            logger.warn(`Create pickup did not return new object. Returned ${document}`);
            return false;
        }
        return document;
    }catch(err){
        logger.error(`Error creating pickup. Error: ${err}`);
        return false
    }
}

var getPickup = async (id) => {
    try{
        var data = await Pickup.model.findById(id)
        .lean();
        if(!data){
            logger.error(`Pickup ${id} could not be found. Data ${data}`);
            return false;
        }
        return data;
    }catch(err){
        logger.error(`Error getting pickup: ${id}: ${err}`);
        return false;
    }
}

const api = {
    save: async (req, res) => {
        let data = req.body;
        try{
            document = await savePickup(data);
            if(!document){
                logger.error("Could not save pickup day", data)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error saving pickup day", error)
            res.status(500).send()
        }
    },
    get: async (req, res) => {
        let id = req.params.id;
        try{
            document = await getPickup(id);
            if(!document){
                logger.error("Could not get pickup", id)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error getting pickup", error)
            res.status(500).send()
        }
    }
}

module.exports = {
    api
}