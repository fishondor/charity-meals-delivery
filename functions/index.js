const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const getRequestedTimes = async (deliveryId) => {
    try{
        const carriersRef = await admin.database().ref(`/deliveries/${deliveryId}/carriers`).once('value');
        let carriers = carriersRef.val()
        let requestedTimes = Object.keys(carriers).reduce(
            (accu, carrierId) => {
                let carrier = carriers[carrierId]
                if(!carrier.time)
                    return accu

                if(!accu[carrier.time]){
                    accu[carrier.time] = 1
                    return accu
                }

                accu[carrier.time] ++
                return accu
            },
            {}
        )
        return requestedTimes
    }catch(error){
        functions.logger.error(error)
    }
}

const getTimeOptions = async (deliveryId) => {
    try{
        const timeOptionsRef = await admin.database().ref(`/deliveries/${deliveryId}/timeOptions`).once('value');
        let timeOptions = timeOptionsRef.val()
        return timeOptions
    }catch(error){
        functions.logger.error(error)
    }
}

const getAvailableTimeOptions = async (deliveryId) => {
    let requestedTimes = await getRequestedTimes(deliveryId)
    let timeOptions = await getTimeOptions(deliveryId)
    Object.keys(requestedTimes).map(
        optionKey => {
            let option = timeOptions.find(item => item.time == optionKey)
            if(!option)
                return

            if(option.numOfCarriers == 0)
                return

            if(parseInt(option.numOfCarriers) <= requestedTimes[optionKey])
                option.disabled = true
        }
    )
    return timeOptions
}

const handleGet = async (req, res) => {
    switch(req.query.action){
        case "registeredToTimes":
            let requestedTimes = await getRequestedTimes(req.query.delivery)
            res.send(requestedTimes)
            break
        case "timeOptions":
            let timeOptions = await getTimeOptions(req.query.delivery)
            res.send(timeOptions)
            break
        case "availableTimeOptions":
            let availableTimeOptions = await getAvailableTimeOptions(req.query.delivery)
            res.send(availableTimeOptions)
            break
        default:
            res.send("Default")
    }
}

exports.FMAPI = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if(request.method == "GET"){
            handleGet(request, response)
            return
        }
    
        functions.logger.info("Health", {structuredData: true});
        response.send("API is up");
    })
});
