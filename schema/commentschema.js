const mongoose = require('mongoose')

//
const Schema =  mongoose.Schema

const commentSchema = new Schema ({
  postId: {type: mongoose.Schema.Types.ObjectId, ref: "userpost"}, //reference to the blogpost model

  commentUserId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}, //reference to the user model

  content: {type: String, required: true},

  replyToCommentId: {type: mongoose.Schema.Types.ObjectId, ref: "comment", default: null}, //reference to the comment model
  likeCount: { type: Number, default: 0},
  likes: []

}, {timestamps: true})


const Usercomment = mongoose.model('usercomment', commentSchema)

module.exports = Usercomment
