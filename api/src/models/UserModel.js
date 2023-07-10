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
});

const User = model("User", userSchema);

export default User;
