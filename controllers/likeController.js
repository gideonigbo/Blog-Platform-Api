const Usercomment = require("../schema/commentschema")
const Userpost = require("../schema/postschema")


//Like a post
const likePost = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const { postId } = req.params
  try {
    //Check that all fields are entered.
    if(!postId) return res.status(400).json({mess: 'Enter the required field, postId'})
    //Getting the post via its id
    const postToLike = await Userpost.findById({_id: postId})
  

    //    const postToLike = await Userpost.findByIdAndUpdate({_id: postId}, {{$inc : {likeCount: 1}}, likes.push(user._id))
    //Above is another approach
    //Chane userId from token to string
    const tokenUserId = user._id.toString()
    if(!postToLike) return res.status(400).json({mess: "Post does not exist /has been deleted!."})
    if(postToLike.likes.includes(tokenUserId)) return res.status(400).json({mess: "You can not like mmore than once."})

    postToLike.likes.push(tokenUserId)
    postToLike.likeCount += 1
    
    //Save Like
    await postToLike.save()
      res
        .status(200)
        .json({mess: `Post-${postId} liked by user: ${tokenUserId}`}) 
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Unlike a post
const unlikePost = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const { postId } = req.params
  try {
    //Check that all fields are entered.
    if(!postId) return res.status(400).json({mess: 'Enter the required field, postId'})
    //Getting the post via its id
    const postToUnlike = await Userpost.findByIdAndUpdate({_id: postId})

    //    const postToLike = await Userpost.findByIdAndUpdate({_id: postId}, {{$inc : {likeCount: 1}}, likes.push(user._id))
    //Above is another approach
    const tokenUserId = user._id.toString()

    if(!postToUnlike) return res.status(400).json({mess: "Post does not exist /has been deleted!."})
    if(!postToUnlike.likes.includes(tokenUserId)) return res.status(400).json({mess: "You have to like the post first"})

    const newLikes = postToUnlike.likes.filter(item => item !== tokenUserId)
    postToUnlike.likes = newLikes
    postToUnlike.likeCount -= 1
    
    //Save Like
    await postToUnlike.save()
      res
        .status(200)
        .json({mess: `Post-${postId} Unliked by user: ${user._id}`}) 
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Like a comment/reply(Reply)
//Like a comment
const likeComment = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const { commentId } = req.params
  try {
    //Check that all fields are entered.
    if(!commentId) return res.status(400).json({mess: 'Enter the required field, commentId'})
    //Getting the post via its id
    const commentToLike = await Usercomment.findById({_id: commentId})

    //    const commentToLike = await Usercomment.findByIdAndUpdate({_id: commentId}, {{$inc : {likeCount: 1}}, likes.push(user._id))
    //Above is another approach
    const tokenUserId = user._id.toString()


    if(!commentToLike) return res.status(400).json({mess: "Comment does not exist /has been deleted!."})
    if(commentToLike.likes.includes(tokenUserId)) return res.status(400).json({mess: "You can not like mmore than once."})

    commentToLike.likes.push(user._id)
    commentToLike.likeCount += 1
    
    //Save Like
    await commentToLike.save()
      res
        .status(200)
        .json({mess: `Comment-${commentId} liked by user: ${tokenUserId}`}) 
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Unlike a comment
const unlikeComment = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const { commentId } = req.params
  try {
    //Check that all fields are entered.
    if(!commentId) return res.status(400).json({mess: 'Enter the required field, postId'})
    //Getting the post via its id
    const commentToUnlike = await Usercomment.findById({_id: commentId})

    //    const postToLike = await Userpost.findByIdAndUpdate({_id: postId}, {{$inc : {likeCount: 1}}, likes.push(user._id))
    //Above is another approach
    const tokenUserId = user._id.toString()

    
    if(!commentToUnlike) return res.status(400).json({mess: "Post does not exist /has been deleted!."})
    if(!commentToUnlike.likes.includes(tokenUserId)) return res.status(400).json({mess: "You have to like the post first"})

    const newLikes = commentToUnlike.likes.filter(item => item !== user._id)
    commentToUnlike.likes = newLikes
    commentToUnlike.likeCount -= 1
    
    //Save Like
    await commentToUnlike.save()
      res
        .status(200)
        .json({mess: `Post-${commentId} Unliked by user: ${user._id}`}) 
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


module.exports = {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment
}
