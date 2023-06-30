import express from "express";
import connect from "./database/mongo.js";
import { createUser } from "./controllers/UserController.js";

const app = express();

connect();

app.get("/api/register", createUser);

app.listen(6060);
