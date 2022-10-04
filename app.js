require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_APPCODE;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());

app.use('/blog', indexRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
