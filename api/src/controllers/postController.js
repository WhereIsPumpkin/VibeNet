import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
  try {
    const { content, author } = req.body;
    const postImage = req.files.postImage;

    let postImageUrl;
    if (postImage) {
      postImageUrl = postImage[0].path.replace(/^public[\\/]/, "");
      postImageUrl = "/" + postImageUrl.replace(/\\/g, "/");
    }

    // create a new post
    const newPost = new Post({
      content,
      author,
      postImage: postImageUrl,
    });

    // save the post to the database
    await newPost.save();

    // fetch the updated post with likes information
    const updatedPost = await Post.findById(newPost._id).populate("author");

    // send the updated post as a response
    res.status(201).json({ post: updatedPost, message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the post" });
  }
};


export const getPosts = async (req, res) => {
  try {
    // query the database for all posts
    const posts = await Post.find().populate("author");

    // send a success response with the posts
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the posts" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.deleteOne({ _id: postId });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ err, message: "Error deleting post" });
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      // User has not liked the post, so add the user's ID to the likes array
      post.likes.push(userId);
    } else {
      // User has already liked the post, so remove the user's ID from the likes array
      post.likes.splice(userIndex, 1);
    }

    await post.save();

    // Send a success response with updated like status
    const message = userIndex === -1 ? "Post liked successfully" : "Post unliked successfully";
    res.status(200).json({ message, likes: post.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while handling the post like" });
  }
};


export const unlikePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((id) => id !== userId);
    await post.save();

    // Send a success response
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while unliking the post" });
  }
};
