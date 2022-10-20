const express = require('express');
const router = express.Router();

const blog_controller = require('../controllers/blogController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// HOME PAGE
router.get('/', blog_controller.getBlog);

// POSTS
router.get('/posts', post_controller.getPosts);
router.post('/posts', post_controller.createPost);

// SINGLE POST
router.get('/posts/:post_id', post_controller.getPost);
router.put('/posts/:post_id', post_controller.updatePost);
router.delete('/posts/:post_id', post_controller.deletePost);

// COMMENTS
router.post('/posts/:post_id/comments', comment_controller.postComment);

// SINGLE COMMENT
router.get(
  '/posts/:post_id/comments/:comment_id/',
  comment_controller.getComment
);

router.put(
  '/posts/:post_id/comments/:comment_id',
  comment_controller.putComment
);

router.delete(
  '/posts/:post_id/comments/:comment_id/',
  comment_controller.deleteComment
);

module.exports = router;
