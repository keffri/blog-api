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
router.put(
  '/posts/:post_id/comments/:comment_id',
  comment_controller.putComment
);
router.delete(
  '/posts/:post_id/comments/:comment_id/',
  comment_controller.deleteComment
);

module.exports = router;

// | GET /blog/posts - get all posts
// | POST /blog/posts - create a post
// | GET /blog/posts/:post_id - get a single post
// | PUT  /blog/posts/:post_id - update a post
// | DELETE /blog/posts/:post_id - delete a post

// | GET /blog/posts/:post_id/comments - get all comments on single post
// | POST /blog/posts/:post_id/comments - create a comment
// | GET /blog/posts/:post_id/comments/:comment_id - get a single comment from post
// | PUT /blog/posts/:post_id/comments/:comment_id - update a comment
// | DELETE /blog/posts/:post_id/comments/:comment_id - delete a comment
