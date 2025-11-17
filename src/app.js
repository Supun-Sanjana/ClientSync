import express from "express";
import dotenv from "dotenv";
import clientRouter from "./router/client.route.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/client", clientRouter);


export default app;