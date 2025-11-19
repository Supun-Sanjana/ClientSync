import express from "express";
import dotenv from "dotenv";
import clientRouter from "./router/client.route.js";
import projectRouter from "./router/project.route.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

// Use CORS globally
const corsOptions = {
  origin: ['http://localhost:5173', "https://clientsync-production.up.railway.app"], // remove trailing slash
  optionsSuccessStatus: 200 // legacy browsers
};
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("API is alive!");
});

app.use("/api/client", clientRouter);
app.use("/api/project", projectRouter);

export default app;
