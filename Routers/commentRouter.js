const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getAllCommentsOnPost, getCommentById, getCommentByUser, deleteComment, updateComment, createCommentForPost, createCommentForComment } = require('../controllers/commentController')


const commentRouter = express.Router()

commentRouter
//Create a Comment to a blogpost
  .post('/post/:postId/newComment', authMiddleware, createCommentForPost)

//Create a Comment to a blogpost Comment
  .post('/post/:postId/:commentId/reply', authMiddleware, createCommentForComment)

//Get all Coments made on a post, including replies
  .get('/post/:postId/comments', authMiddleware, getAllCommentsOnPost)

//Get a specific comment
  .get('/comments/:id', authMiddleware, getCommentById)

//Get all users comments
  .get('/comments', authMiddleware, getCommentByUser)

// //Wrong Route Capture 
//   .get('/post/', noId)

//Edit/ Update a comment
  .put('/comments/:id', authMiddleware, updateComment)

//delete a comment
  .delete('/comments/:id', authMiddleware, deleteComment)


module.exports = commentRouter
