const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  name: { type: String, minLength: 1, maxLength: 12, required: true },
  comment: { type: String, minLength: 10, maxLength: 140, required: true },
  date: { type: Date, default: Date.now, required: true },
});

// create virtual date with luxon

module.exports = mongoose.model('Comment', CommentSchema);
