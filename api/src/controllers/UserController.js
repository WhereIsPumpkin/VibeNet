import User from "../models/UserModel.js";
import EmailToken from "../models/EmailToken.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, gender } = req.body;

    if (!name || !lastName || !email || !password || !gender) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

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
      verified: false,
    });

    await newUser.save();

    const token = Math.floor(100000 + Math.random() * 900000);

    console.log(token);

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
                              style="padding: 12px 24px; border-radius: 4px; color: black; display: inline-block;margin: 0.5rem 0; width: 100%; border: 1px solid rgba(82,82,128,0.18); text-align:center; font-size: 60px; font-weight: 600;">
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
