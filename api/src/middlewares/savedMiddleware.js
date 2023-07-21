import User from "../models/UserModel";

export const populateSavedPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    req.user.savedPosts = user.savedPosts;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
