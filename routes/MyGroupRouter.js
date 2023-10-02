const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostControllers'); // Import controller
// Sử dụng router và controller phù hợp
router.get('/', PostController.getIndex);
router.get('/post/', PostController.getIndex);
router.post('/delete', PostController.deleteIndex);
router.post('/add-comment', PostController.addComment);
router.post('/create-post', PostController.createPost);
router.post('/create-post-detail', PostController.createPostDetail);
router.post('/edit-post', PostController.editPost);
router.post('/edit-post-detail', PostController.editPostDetail);
module.exports = router;
