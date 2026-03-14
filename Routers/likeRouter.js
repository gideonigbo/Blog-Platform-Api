const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { likePost, unlikePost, likeComment, unlikeComment } = require('../controllers/likeController')


const likeRouter = express.Router()

likeRouter
//Like a post
  .post('/post/:postId/like', authMiddleware, likePost)

//Get all Coments made on a post, including replies
  .put('/post/:postId/like', authMiddleware, unlikePost)

//Liking A comment
//Like a comment
  .post('/comment/:commentId/like', authMiddleware, likeComment)

//Get all Coments made on a post, including replies
  .put('/comment/:commentId/like', authMiddleware, unlikeComment)



module.exports = likeRouter
