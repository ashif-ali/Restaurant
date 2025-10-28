const express = require('express');
const router = express.Router();
const chefController = require("../controllers/chef.controller");

router.get('/:id', chefController.getChefById);
router.put('/:id', chefController.updateChef);
router.delete('/:id', chefController.deleteChef);

router.post('/', chefController.createChef);
router.get('/', chefController.getAllChef);



module.exports = router;