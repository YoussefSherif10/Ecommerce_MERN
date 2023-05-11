const express = require('express');
const router = express.Router();
const ctrlItems = require('../controllers/items');

router.get('/items', ctrlItems.getItems);

module.exports = router;