require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_APPCODE;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
