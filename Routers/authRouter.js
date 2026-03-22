const  express = require('express')
const { signIn, resetRequest, validationPasswordOtp, resetPassword, signOut } = require('../controllers/authController')


const authRouter = express.Router()

authRouter

//Login a user
  .post('/user/login', signIn)

 //LogOut a user
  .post('/user/logOut', signOut) 

//reset a user's password
  .post('/password/resetReq', resetRequest)

//reset a user's password
  .post('/password/validate', validationPasswordOtp)

//reset a user's password
  .post('/password/reset', resetPassword)


module.exports = authRouter
