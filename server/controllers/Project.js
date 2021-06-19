var serverLogger = require('../providers/Logger');

var Project = require('../models/Project');

var logger = new serverLogger('Project controller');

var saveProject = async (data) => {
    try{
        let dataModel = new Project.model(data)
        let document = await dataModel.save()
        if(!document){
            logger.warn(`Create project did not return new object. Returned ${document}`);
            return false;
        }
        return document;
    }catch(err){
        logger.error(`Error creating project. Error: ${err}`);
        return false
    }
}

var getProject = async (id) => {
    try{
        var data = await Project.model.findById(id)
        .lean();
        if(!data){
            logger.error(`Project ${id} could not be found. Data ${data}`);
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
            document = await saveProject(data);
            if(!document){
                logger.error("Could not save project day", data)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error saving project day", error)
            res.status(500).send()
        }
    },
    get: async (req, res) => {
        let id = req.params.id;
        try{
            document = await getProject(id);
            if(!document){
                logger.error("Could not get project", id)
                res.status(500).send()
                return
            }
            res.status(200).send(document)
        }catch(error){
            logger.error("Error getting project", error)
            res.status(500).send()
        }
    }
}

module.exports = {
    api
}