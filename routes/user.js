const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// LOGIN
router.get('/log-in', user_controller.getLogin);
router.post('/log-in', user_controller.postLogin);

// LOGOUT
router.get('/log-out', user_controller.getLogout);

// SIGN-UP
router.get('/sign-up', user_controller.getSignup);
router.post('/sign-up', user_controller.postSignup);

module.exports = router;
