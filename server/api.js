const express = require('express');
const router = express.Router();

const deliveryController = require('./controllers/Delivery');
const pickupController = require('./controllers/Pickup');

router.post('/delivery/create',  deliveryController.api.save);
router.get('/delivery/:id', deliveryController.api.getById);
router.post('/pickup/create',  pickupController.api.save);
router.get('/pickup/:id', pickupController.api.get);

module.exports = router;