require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticate, serialize, deserialize } = require('./passport/passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
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

passport.use(authenticate);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

app.use(session({ secret: 'keffri', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(compression());

app.use('/blog', indexRouter);
app.use('/user', userRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
