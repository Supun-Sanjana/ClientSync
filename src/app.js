import express from "express";
import dotenv from "dotenv";
import clientRouter from "./router/client.route.js";
dotenv.config();

const app = express();
app.use(express.json());

// inside app.js
app.get("/", (req, res) => {
  res.send("API is alive!");
});


app.use("/api/client", clientRouter);


export default app;