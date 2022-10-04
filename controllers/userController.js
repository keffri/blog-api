const User = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.getSignup = (req, res, next) => {
  res.render('signup');
};
