import { Schema, model } from "mongoose";

const postSchema = new Schema({
  content: {
    type: Schema.Types.String,
  },

  postImage: {
    type: Schema.Types.String,
    required: false,
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

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likeCount: {
    type: Schema.Types.Number,
  },

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: Schema.Types.String,
      },
      createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
      },
    },
  ],
  commentCount: {
    type: Schema.Types.Number,
  },

  saves: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  saveCount: {
    type: Schema.Types.Number,
    default: 0,
  },
});

const Post = model("Post", postSchema);

export default Post;
