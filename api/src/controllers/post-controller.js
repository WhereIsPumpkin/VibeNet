import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

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
      commentCount: 0,
    });

    // save the post to the database
    await newPost.save();

    // Add the new post to the posts array of the author
    await User.findByIdAndUpdate(author, { $push: { posts: newPost._id } });

    // fetch the updated post with likes information
    const updatedPost = await Post.findById(newPost._id).populate("author");

    // send the updated post as a response
    res
      .status(201)
      .json({ post: updatedPost, message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    // query the database for all posts and populate the author and comments.user fields
    const posts = await Post.find()
      .populate("author")
      .populate("comments.user");

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
    await User.updateMany({ posts: postId }, { $pull: { posts: postId } });
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

    post.likeCount = post.likes.length;

    await post.save();

    // Send a success response with updated like status
    const message =
      userIndex === -1
        ? "Post liked successfully"
        : "Post unliked successfully";
    res.status(200).json({ message, likes: post.likes });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while handling the post like" });
  }
};

export const addComment = async (req, res) => {
  const { postId, userId } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(404).json({ message: "Empty Comment" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      content: content,
    };

    post.comments.push(newComment);
    post.commentCount = post.comments.length;

    await post.save();

    // Populate the comments.user field after saving the post
    const populatedPost = await Post.findById(postId).populate(
      "comments.user",
      "profilePic username"
    );

    const addedComment = populatedPost.comments.find(
      (c) => c.content === content
    );

    res
      .status(200)
      .json({ message: "Comment added successfully", comment: addedComment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while handling the post comment" });
  }
};

export const savePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = user.savedPosts.indexOf(postId);

    if (postIndex === -1) {
      // User has not saved the post, so add the post's ID to the savedPosts array
      user.savedPosts.push(postId);
    } else {
      // User has already saved the post, so remove the post's ID from the savedPosts array
      user.savedPosts.splice(postIndex, 1);
    }

    await user.save();

    // Populate the savedPosts field of the updated user document
    user = await User.findById(userId).populate("savedPosts");

    const userIndex = post.saves.indexOf(userId);

    if (userIndex === -1) {
      post.saves.push(userId);
    } else {
      post.saves.splice(userIndex, 1);
    }

    post.saveCount = post.saves.length;

    await post.save();

    const payload = {
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      gender: user.gender,
      bio: user.bio,
      location: user.location,
      website: user.website,
      registrationDate: user.registrationDate,
      coverPic: user.coverPic,
      profilePic: user.profilePic,
      saved: user.savedPosts.map((post) => post._id),
    };
    const newToken = jwt.sign(payload, jwtSecret);

    // Send the new token back to the client in a cookie
    res.cookie("token", newToken, { sameSite: "none", secure: true });

    const message =
      userIndex === -1
        ? "Post saved successfully"
        : "Post unsaved successfully";
    res.status(200).json({ message, saves: post.saves });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while handling the post save" });
  }
};
