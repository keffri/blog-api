const User = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/blog',
  failureRedirect: '/user/sign-up',
});

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/blog');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('signup');
};

exports.postSignup = [
  body('username')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Username must be at least 4 characters.')
    .isLength({ max: 16 })
    .withMessage('Username must be less than or 17 characters.'),
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
        throw new Error('Passwords must match each other.');
      }
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('signup', { errors: errors.array() });
    }

    try {
      const existingUser = await User.find({ username: req.body.username });
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
