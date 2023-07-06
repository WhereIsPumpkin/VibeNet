import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import swaggerMiddleware from "./swagger-middleware.js";
import {
  createUser,
  verifyUser,
  loginUser,
  getProfile,
} from "./controllers/UserController.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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

app.get("/api/profile", getProfile);

app.use("/", ...swaggerMiddleware);

app.listen(6060, () => {
  console.log("Server is running on port 6060");
});
