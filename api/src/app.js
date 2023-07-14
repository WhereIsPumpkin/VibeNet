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
} from "./controllers/userController.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { uploadFields } from "./config/multerConfig.js";
import { createPost, getPosts } from "./controllers/postController.js";

const app = express();

dotenv.config();
connect();

let corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:6060"],
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

app.get("/api/profile", getProfile);
app.get("/api/posts/getPosts", getPosts);

app.use("/", express.static("./public"));
app.use("/", ...swaggerMiddleware);

app.listen(6060, () => {
  console.log("Server is running on port 6060");
});
