const Userpost = require("../schema/postschema")


const getAllPosts = async (req, res) => {
  try {
    //This finds all posts based on the model(userPost)
    const posts = await Userpost.find()
    //Check to confirm if there is a post in the db.
    if (posts.length === 0) {return res.status(200).json({mess: 'No post has been created. Please create a new post!'})}
    res.status(200).json(posts)
    
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}

//Handles methods requiring id's but missing ids
const noId = async (req, res) => {
  return res.status(404).json({mess: 'ID path can not be empty'})
}


//Get post by ID
const getPostById = async (req, res) => {
  //This finds the actual post based on the unique mongo generated ID
  const id = req.params.id
  console.log(req.params.id)
  try {
    //Check in the db and assign finding to post
    const post = await Userpost.findById({ _id: id });

    //Check to confirm if there is a post in the db.
    if (!post) {
      return res.status(200).json({
        mess: `Post with ID: ${id} cannot be found/ has been deleted`,
      });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


const createPost = async (req, res) => {
  //Checking if client is logged in before creating a post
  const user = req.verifiedUser
  //Get all fieldds from req body.
  const {content, title} = req.body
  try {
    //Check that all fields are entered.
    if(!content || !title) {
      return res.status(400).json({mess: 'Blog post cannot be empty.'})
    } else {
      const newPost = new Userpost({content, title, userId: user._id})
      await newPost.save()
      res
        .status(200)
        .json(newPost)
    }    
  } catch (error) {
    res.status(500).json({mess: error.message})
  }
}


//Update Post
const updatePost = async (req, res) => {

  const {post} = req.body

  //Getting user details from token
  const user = req.verifiedUser

  //Getting post ID from path variable
  const { id } = req.params
  try {
    if (!post) {
      return res.status(400).json({ mess: "All fields must be entered." });
    }
    const fetchPost = await Userpost.findById(id)
      if (!fetchPost) {
        return res
          .status(404)
          .json({ mess: `${id} not found/has been deleted.` });
      } 
      const postUserId = fetchPost.userId.toString()
      const tokenUserId = user._id.toString()
      //Check if user owns post and update or bounce out
      if(postUserId === tokenUserId ){
        fetchPost.name = user.username
        fetchPost.email = user.email
        fetchPost.blogPost = post

        await fetchPost.save()
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


//Delete A Post
const deletePost = async (req, res) => {
  //Getting user details from token
  const user = req.verifiedUser
  
  //Getting post ID from path variable
  const { id } = req.params
try {
    const fetchPost = await Userpost.findById(id)
      if (!fetchPost) {
        return res
          .status(404)
          .json({ mess: `${id} not found/has been deleted.` });
      } 
      const postUserId = fetchPost.userId.toString()
      const tokenUserId = user._id.toString()
      //Check if user owns post and delete or bounce out
      if(postUserId === tokenUserId || user.admin){
        await fetchPost.deleteOne()
      }else {
        return res
          .status(404)
          .json({ mess: `You do not have permission to Delete this post` });
      }
      res.status(200).json({ mess: `Post with ID: ${id} is now Deleted` });
    } catch (error) {
    res.status(500).json({ mess: error.message });
  }
}


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  noId,
  updatePost,
  deletePost
}
