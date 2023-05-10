const express = require('express');
const ctrlUsers = require('../controllers/users');
const router = express.Router();

router.post('/login', ctrlUsers.login);

router.post('/signup', ctrlUsers.signup);

module.exports = router;
