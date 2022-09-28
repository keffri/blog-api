const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello World!',
    message: 'This is my Blog API project',
  });
});

module.exports = router;
