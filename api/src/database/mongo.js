import mongoose from "mongoose";

const connect = () => {
  const url = "mongodb+srv://sgogr2021:test123@cluster0.s7nuoh1.mongodb.net/";
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log("Could not connect to MongoDB ", err);
  }
};

export default connect;
