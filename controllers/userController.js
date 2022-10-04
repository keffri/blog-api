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

exports.postSignup = [
  body('username')
    .trim()
    .isLength({ min: 4, max: 16 })
    .escape()
    .withMessage('Username must be at least 4 characters.'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage('Password must be at least 8 characters.'),
  body('confirmPassword')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage('Password must be at least 8 characters.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match eachother.');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('signup', { errors: errors.array() });
    }

    try {
      const existingUser = User.find({ username: req.body.username });
      if (existingUser.length > 0) {
        return res.render('signup', { userFail: 'Username is already taken.' });
      }
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        new User({
          username: req.body.username,
          password: hashedPassword,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/blog');
        });
      });
    } catch (err) {
      return next(err);
    }
  },
];
