const express = require('express')
const { getAllPosts, getPostById, createPost, deletePost, noId, updatePost } = require('../controllers/postcontoller')
const authMiddleware = require('../middleware/authMiddleware')


const postRouter = express.Router()

postRouter
//Create a Post
  .post('/new', authMiddleware, createPost)

//Get all Posts made
  .get('/posts', getAllPosts)

//Get one Post 
  .get('/post/:id', getPostById)

//Wrong Route Capture 
  .get('/post/', noId)

//Edit/ Update a Post
  .put('/post/:id', authMiddleware, updatePost)

//delete a Post
  .delete('/post/:id', authMiddleware, deletePost)


module.exports = postRouter
