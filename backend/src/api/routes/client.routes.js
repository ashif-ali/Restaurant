const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.post('/find-or-create', clientController.findOrCreate);

module.exports = router;