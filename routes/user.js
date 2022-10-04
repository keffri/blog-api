const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// LOGIN
router.get('/log-in', user_controller.getLogin);

// SIGN-UP
router.get('/sign-up', user_controller.getSignup);

module.exports = router;
