import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    required: true,
  },
  avatar: {
    type: Schema.Types.String,
  },
  verified: {
    type: Schema.Types.Boolean,
  },
  registrationDate: {
    type: Schema.Types.Date,
  },
  bio: {
    type: Schema.Types.String,
  },
  location: {
    type: Schema.Types.String,
  },
  website: {
    type: Schema.Types.String,
  },
  profilePic: {
    type: Schema.Types.String,
  },
  coverPic: {
    type: Schema.Types.String,
  },
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = model("User", userSchema);

export default User;
