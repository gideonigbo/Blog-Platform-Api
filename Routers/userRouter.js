const  express = require('express')
const { createUser, allUser, getUserById, deleteUser, updateUser } = require('../controllers/userController')



const userRouter = express.Router()

userRouter

//Create a user
  .post('/register', createUser)

//Get all users
  .get('/users', allUser)

//Get a User
  .get('/user/:id', getUserById)
  
//Update a user details
  .put('/user/:id', updateUser)

//Delete a user
  .delete('/user/:id', deleteUser)

module.exports = userRouter
