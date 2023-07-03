import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import swaggerMiddleware from "./swagger-middleware.js";
import { createUser, verifyUser } from "./controllers/UserController.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

dotenv.config();
connect();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.post("/api/register", createUser);
app.post("/api/verify", verifyUser);
app.use("/", ...swaggerMiddleware);

app.listen(6060, () => {
  console.log("Server is running on port 6060");
});
