const Post = require('../models/postModel');

exports.getPosts = (req, res, next) => {
  Post.find({}, 'title')
    .populate('post')
    .populate('date')
    .populate('comments')
    .sort({ date: -1 })
    .exec((err, posts_list) => {
      if (err) {
        return next(err);
      }

      res.render('posts', {
        posts_list,
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.post_id)
    .populate('title')
    .populate('post')
    .populate('date')
    .populate('comments')
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (post === null) {
        const err = new Error('Post not found.');
        err.status = 404;
        return next(err);
      }
      res.render('post', {
        title: post.title,
        post,
      });
    });
};

exports.createPost = (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    post: req.body.post,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'post created' });
  });
};

exports.updatePost = (req, res, next) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (err) {
      return next(err);
    }

    post.post = req.body.post;

    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'post updated!' });
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.remove(
    {
      _id: req.params.post_id,
    },
    (err, post) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'successfully deleted' });
    }
  );
};
