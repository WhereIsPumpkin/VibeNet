import User from "../models/UserModel.js";

export const createUser = async (req, res) => {
  try {
    const { email, password, gender, name, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const newUser = new User({
      name,
      lastName,
      email,
      password,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};
