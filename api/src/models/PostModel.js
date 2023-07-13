import { Schema, model } from "mongoose";

const postSchema = new Schema({
  content: {
    type: Schema.Types.String,
  },
  postImage: {
    type: Schema.Types.String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

export default Post;
