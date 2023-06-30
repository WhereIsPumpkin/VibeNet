import mongoose from "mongoose";

const connect = () => {
  const url = process.env.MONGO_URL;
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log("Could not connect to MongoDB ", err);
  }
};

export default connect;
