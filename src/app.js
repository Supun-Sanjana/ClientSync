import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import clientRouter from "./router/client.route.js";
dotenv.config();

const app = express();
app.use(express.json());

pool.connect();

// app.use("/", (_, res) => res.sendStatus(200));

app.use("/api/client", clientRouter);


export default app;