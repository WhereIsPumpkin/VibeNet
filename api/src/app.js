import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import swaggerMiddleware from "./swagger-middleware.js";
import { createUser } from "./controllers/UserController.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

dotenv.config();
connect();

app.use(bodyParser.json());
app.use(express.json());

app.post("/api/register", createUser);
app.use("/", ...swaggerMiddleware);

app.listen(6060);
