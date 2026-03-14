const Usercomment = require("../schema/commentschema")



//Get All comments for a Post by PostId
const getAllCommentsOnPost = async (req, res) => {
  try {
    const { postId } = req.params
    //This finds all posts based on the model(userPost) and populate the id to return only name
    const comments = await Usercomment.find({postId}).populate("commentUserId", "username")
    //Check to confirm if there is a post in the db.
    if (comments.length === 0) {return res.status(200).json({mess: 'No comment has been made on post'})}
    res.status(200).json(comments)
    
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


// //Handles methods requiring id's but missing ids
// const noId = async (req, res) => {
//   return res.status(404).json({mess: 'ID path can not be empty'})
// }


//Get comments by ID
const getCommentById = async (req, res) => {
  //This finds the actual comment based on the unique mongo generated ID
  const user = req.verifiedUser
  const id = req.params.id
  try {
    //Check in the db and assign finding to post
    const comment = await Usercomment.findById(id).populate("commentUserId", "username");

    //Check to confirm if there is a comment in the db.
    if (!comment) {
      return res.status(200).json({
        mess: `Comment with ID: ${id} cannot be found/ has been deleted`,
      });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Get all comments made by a User.
const getCommentByUser = async (req, res) => {
  //This finds the actual comment based on the unique mongo generated ID
  const user = req.verifiedUser
  try {
    //Check in the db and assign finding to post
    const comment = await Usercomment.find({ commentUserId: user._id });

    //Check to confirm if there is a comment in the db.
    if (!comment) {
      return res.status(200).json({
        mess: "User has added no comment"
      });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Creating a comment for a post
const createCommentForPost = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body && params.
  const { postId } = req.params
  const {comment} = req.body
  try {
    //Check that all fields are entered.
    if(!comment || !postId) {
      return res.status(400).json({mess: 'All fields cannot be empty.'})
    } else {
      const newComment = new Usercomment({
        postId,
        content: comment,
        commentUserId: user._id
      })
      await newComment.save()
      res
        .status(200)
        .json(newComment).populate(postId)
    }    
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Creating a comment for a comment (Reply)
const createCommentForComment = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const { postId, commentId } = req.params
  const { comment } = req.body
  try {
    //Check that all fields are entered.
    if(!comment || !commentId || !postId) {
      return res.status(400).json({mess: 'All fields cannot be empty.'})
    } else {
      const replyComment = new Usercomment({
        postId,
        content: comment,
        commentUserId: user._id,
        replyToCommentId: commentId
      })
      
      await replyComment.save()
      res
        .status(200)
        .json(replyComment)
    }    
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}



//Update a Comment
const updateComment = async (req, res) => {
  //Initializing content recieved from the body
  const {content} = req.body

  //Getting user details from token
  const user = req.verifiedUser

  //Getting comment ID from path variable
  const { id } = req.params
  try {
    //Checks if user is a premium subscriber...
    if(!user.premiumSub) return res.status(400).json({mess: "Please subscribe to premium to edit content.."})

    if (!content) {
      return res.status(400).json({ mess: "All fields must be entered." });
    }
    const fetchComment = await Usercomment.findById(id)
      if (!fetchComment) {
        return res
          .status(404)
          .json({ mess: `${id} not found/has been deleted.` });
      } 
      const commentUserId = fetchComment.commentUserId.toString()
      const tokenUserId = user._id.toString()
      //Check if user owns post and update or bounce out
      if(commentUserId === tokenUserId ){
        fetchComment.content = content

        await fetchComment.save()
      }else {
        return res
          .status(404)
          .json({ mess: `You do not have permission to Update this post` });
      }
      res.status(200).json({ mess: `Post with ID: ${id} is now Updated` });
    } catch (error) {
    res.status(500).json({ mess: error.message });
  }
}


//Delete A Comment
const deleteComment = async (req, res) => {
  //Getting user details from token
  const user = req.verifiedUser
  
  //Getting post ID from path variable
  const { id } = req.params
try {
    const fetchComment = await Usercomment.findById(id)
      if (!fetchComment) {
        return res
          .status(404)
          .json({ mess: `Comment:${id} not found/has been deleted.` });
      } 
      const commentUserId = fetchComment.commentUserId.toString()
      const tokenUserId = user._id.toString()
      //Check if user owns post and delete or bounce out
      if(commentUserId === tokenUserId || user.admin){
        await fetchComment.deleteOne()
      }else {
        return res
          .status(404)
          .json({ mess: `You do not have permission to Delete this comment` });
      }
      res.status(200).json({ mess: `Post with ID: ${id} is now Deleted` });
    } catch (error) {
    res.status(500).json({ mess: error.message });
  }
}


module.exports = {
  getAllCommentsOnPost,
  getCommentById,
  getCommentByUser,
  createCommentForPost,
  createCommentForComment,
  //noId,
  updateComment,
  deleteComment
}
