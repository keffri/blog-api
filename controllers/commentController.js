const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

// exports.postComment = async (req, res, next) => {
//   const post = await Post.findById(req.params.post_id).exec();

//   const comments = post.comments;

//   const comment = new Comment({
//     user: req.user.username,
//     post: req.params.post_id,
//     comment: req.body.comment,
//   });

//   comment.save();

//   comments.push(comment);

//   Post.findByIdAndUpdate(req.params.post_id, { comments }, (err, post) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(`/blog/posts/${req.params.post_id}`);
//   });
// };

exports.postComment = [
  body('comment')
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage('Comment is too short. (min: 4)')
    .isLength({ max: 140 })
    .escape()
    .withMessage('Comment is too long. (max: 140)'),

  async (req, res, next) => {
    const post = await Post.findById(req.params.post_id)
      .populate('comments')
      .exec();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('post', { post, errors: errors.array() });
    }

    const comments = post.comments;

    const comment = new Comment({
      user: req.user.username,
      post: req.params.post_id,
      comment: req.body.comment,
    });

    comment.save();

    comments.push(comment);

    Post.findByIdAndUpdate(req.params.post_id, { comments }, (err, post) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/blog/posts/${req.params.post_id}`);
    });
  },
];

exports.getComment = (req, res, next) => {
  Comment.findById(req.params.comment_id)
    .populate('user')
    .populate('post')
    .populate('comment')
    .exec((err, comment) => {
      if (err) {
        return next(err);
      } else {
        res.render('comment', {
          comment,
          postID: req.params.post_id,
        });
      }
    });
};

exports.putComment = (req, res, next) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      return next(err);
    }

    comment.comment = req.body.comment;
    comment.edited = true;
    comment.editedDate = DateTime.fromJSDate(new Date()).toFormat(
      'DDDD, h:mm:ss, a'
    );

    comment.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect(`/blog/posts/${req.params.post_id}`);
    });
  });
};

exports.deleteComment = async (req, res, next) => {
  const post = await Post.findById(req.params.post_id).exec();
  const comments = post.comments;
  const updatedComments = comments.filter((comment) => {
    return comment._id.toString() !== req.params.comment_id;
  });

  Post.findByIdAndUpdate(
    req.params.post_id,
    { comments: updatedComments },
    (err, post) => {
      if (err) {
        return next(err);
      }
    }
  );

  Comment.findByIdAndDelete(req.params.comment_id, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect(`/blog/posts/${req.params.post_id}`);
    }
  });
};
