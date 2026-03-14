const express = require('express')
const connectToDb = require('./mongoDb/dbconnection')
const postRouter = require('./Routers/postrouter')
const cookieParser = require('cookie-parser')
const authRouter = require('./Routers/authRouter')
const userRouter = require('./Routers/userrouter')
const likeRouter = require('./Routers/likeRouter')
const commentRouter = require('./Routers/commentRouter')
const otpVerifyRouter = require('./Routers/otpRouter')
require('dotenv').config()

//Connecting to DB, Invoking the express function/module , initializing the port
connectToDb()
const server = express()
const port = process.env.PORT || 3000




//Some Application Level Middleware
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cookieParser())


server.use('/api', postRouter)
server.use('/api', userRouter)
server.use('/api', authRouter)
server.use('/api', likeRouter)
server.use('/api', commentRouter)
server.use('/api', otpVerifyRouter)



server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
