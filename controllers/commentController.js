const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.postComment = async (req, res, next) => {
  const post = await Post.findById(req.params.post_id).exec();

  const comments = post.comments;

  const comment = new Comment({
    user: req.user.username,
    comment: req.body.comment,
  });

  comments.push(comment);

  Post.findByIdAndUpdate(req.params.post_id, { comments }, (err, post) => {
    if (err) {
      return next(err);
    }
    res.redirect(`/blog/posts/${req.params.post_id}`);
  });
};

exports.putComment = (req, res, next) => {};

exports.deleteComment = (req, res, next) => {};
