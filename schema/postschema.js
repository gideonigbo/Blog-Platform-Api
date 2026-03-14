const mongoose = require('mongoose')

//
const Schema =  mongoose.Schema

const postSchema = new Schema ({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}, //reference to the user model
  title: {type: String, required: true},
  content: {type: String, required: true},
  likeCount : { type: Number, default: 0},
  likes: []

}, {timestamps: true})


const Userpost = mongoose.model('userpost', postSchema)

module.exports = Userpost
