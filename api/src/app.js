import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import multer from "multer";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import {
  createUser,
  verifyUser,
  loginUser,
  getProfile,
  updateProfile,
  getUsersProfile,
  toggleFollow,
} from "./controllers/user-controller.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { uploadFields } from "./config/multerConfig.js";
import {
  createPost,
  getPosts,
  deletePost,
  likePost,
  addComment,
  savePost,
} from "./controllers/post-controller.js";

const app = express();

dotenv.config();
connect();

let corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://vibenetapi.up.railway.app",
    "https://vibenett.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.json());

app.post("/api/register", createUser);
app.post("/api/verify", verifyUser);
app.post("/api/login", loginUser);
app.post("/api/update", uploadFields, authMiddleware, updateProfile);
app.post("/api/posts/upload", uploadFields, createPost);
app.post("/api/toggleFollow/:userId/:followId", toggleFollow);

app.get("/api/profile", getProfile);
app.get("/api/posts/getPosts", getPosts);

app.delete("/api/posts/delete/:id", deletePost);

app.post("/api/profile/user", getUsersProfile);
app.post("/api/posts/like/:postId/:userId", authMiddleware, likePost);
app.post("/api/posts/comment/:postId/:userId", authMiddleware, addComment);
app.post("/api/posts/save/:postId/:userId", authMiddleware, savePost);

app.use("/", express.static("./public"));
app.use("/", ...swaggerMiddleware);

const port = process.env.PORT || 6060;
app.listen(port, "0.0.0.0", function () {
  console.log(`Server is running on ${port}`);
});
