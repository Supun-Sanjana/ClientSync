import express from "express";
import dotenv from "dotenv";
import clientRouter from "./router/client.route.js";
import projectRouter from "./router/project.route.js";
dotenv.config();

const app = express();
app.use(express.json());

// inside app.js
app.get("/", (req, res) => {
  res.send("API is alive!");
});


app.use("/api/client", clientRouter);
app.use("/api/project", projectRouter);


export default app;