import Post from "../models/postModel.js";

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

    // send a success response
    res.status(201).json({ message: "Post created successfully" });
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
