import User from "../models/UserModel.js";
import EmailToken from "../models/EmailToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bycript from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const bycriptSalt = bycript.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, gender, username } = req.body;

    const userEmail = req.body.email.toLowerCase();
    const existingUserEmail = await User.findOne({ email: userEmail });

    if (!name || !lastName || !email || !password || !gender || !username) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    if (existingUserEmail) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ message: "A user with this username already exists." });
    }

    const hashPassword = bycript.hashSync(password, bycriptSalt);

    const newUser = new User({
      name,
      lastName,
      email: email.toLowerCase(),
      password: hashPassword,
      gender,
      username: username.toLowerCase(),
      verified: false,
      registrationDate: new Date(),
      bio: "",
      location: "",
      website: "",
      profilePic: "",
      coverPic: "",
    });

    await newUser.save();

    const token = Math.floor(100000 + Math.random() * 900000);

    await new EmailToken({ token, email }).save();

    const confirmationUrl = `${process.env.WEB_LINK}/confirm-email?token=${token}`;

    await transporter.sendMail({
      from: "youremail@gmail.com",
      to: email,
      subject: "Please confirm your email",
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Please activate your account</title>
        <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
      </head>
      
      <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="text-align: left;">
                          <div style="padding-bottom: 0px;"><img src="https://i.ibb.co/k6xBWK2/Logo.png" alt="Company" style="width: 80px;"></div>
                        </div>
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Verify Your Email..</h1>
                            <p style="padding-bottom: 16px">Enter this code in the next 10 minutes to sign up:</p>
                            <div
                              style="padding: 12px 24px; border-radius: 4px; color: black; display: inline-block;margin: 0.5rem 0; border: 1px solid rgba(82,82,128,0.18); text-align:center; font-size: 60px; font-weight: 600;">
                              ${token}</div>
      
                            <p style="padding-bottom: 16px"> If you didn't request this code, you can safely ignore this email. Someone else might have
                              typed your email address by mistake.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>The VibeNet team</p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      
      </html>
      `,
    });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { token, email } = req.body;

    const existingUser = await EmailToken.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (existingUser.token === token) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { verified: true },
        { new: true }
      );

      await EmailToken.findOneAndDelete({ email });

      return res.status(200).json({
        success: true,
        message: "User verified successfully.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying user.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowercaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowercaseEmail });

    if (existingUser) {
      const passOk = bycript.compareSync(password, existingUser.password);
      if (passOk) {
        const payload = {
          id: existingUser._id,
          name: existingUser.name,
          lastName: existingUser.lastName,
          email: existingUser.email,
          username: existingUser.username,
          gender: existingUser.gender,
          bio: existingUser.bio,
          location: existingUser.location,
          website: existingUser.website,
          registrationDate: existingUser.registrationDate,
          coverPic: existingUser.coverPic,
          profilePic: existingUser.profilePic,
        };
        const token = jwt.sign(payload, jwtSecret);
        res.cookie("token", token, { sameSite: "none", secure: true });
        res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, lastName, bio, website, location } = req.body;

    const userEmail = req.user.email;

    // Get the profile and cover image files from the request
    const profilePic = req.files.profilePic;
    const coverPic = req.files.coverPic;

    // Generate the URLs of the saved profile and cover images
    let profilePicUrl, coverPicUrl;
    if (profilePic) {
      profilePicUrl = profilePic[0].path.replace(/^public[\\/]/, "");
      profilePicUrl = "/" + profilePicUrl.replace(/\\/g, "/");
    }
    if (coverPic) {
      coverPicUrl = coverPic[0].path.replace(/^public[\\/]/, "");
      coverPicUrl = "/" + coverPicUrl.replace(/\\/g, "/");
    }

    await User.findOneAndUpdate(
      { email: userEmail },
      {
        name,
        lastName,
        bio,
        website,
        location,
        ...(profilePicUrl && { profilePic: profilePicUrl }),
        ...(coverPicUrl && { coverPic: coverPicUrl }),
      }
    );

    const updatedUser = await User.findOne({ email: userEmail });
    const payload = {
      id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      username: updatedUser.username,
      gender: updatedUser.gender,
      bio: updatedUser.bio,
      location: updatedUser.location,
      website: updatedUser.website,
      registrationDate: updatedUser.registrationDate,
      coverPic: updatedUser.coverPic,
      profilePic: updatedUser.profilePic,
    };
    const newToken = jwt.sign(payload, jwtSecret);

    // Send the new token back to the client in a cookie
    res.cookie("token", newToken, { sameSite: "none", secure: true });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
