const router = require('express').Router();
const postController = require('../contollers/post.controller');
const {uploadpost}= require('../midlleware/multer.middleware')





router.get('/', postController.readPost);
router.post('/createpost',uploadpost.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);


module.exports = router;