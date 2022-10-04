const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, minLength: 3, maxLength: 10, required: true },
  password: { type: String, minLength: 8, required: true },
});

module.exports = mongoose.model('User', UserSchema);
