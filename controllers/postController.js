const Post = require('../models/postModel');

exports.getPosts = (req, res, next) => {
  Post.find((err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
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

exports.getPost = (req, res, next) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (err) {
      return next(err);
    }
    res.json(post);
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
