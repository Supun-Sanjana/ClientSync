import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
dotenv.config();

const app = express();

pool.connect()

app.use("/", (req, res) => res.sendStatus(200));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
