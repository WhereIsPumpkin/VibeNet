import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = () => {
  const url = process.env.MONGO_URL;
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log("Could not connect to MongoDB ", err);
  }
};

export default connect;
