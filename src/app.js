import express from "express";
import dotenv from "dotenv";
import clientRouter from "./router/client.route.js";
import projectRouter from "./router/project.route.js";
import cors from "cors";
import userRouter from "./router/user.route.js";
dotenv.config();

const app = express();
app.use(express.json());

// Use CORS globally
const corsOptions = {
  origin: ['http://localhost:5173','https://client-sync-sig.vercel.app', "https://clientsync-production.up.railway.app"], // remove trailing slash
  optionsSuccessStatus: 200 // legacy browsers
};
app.use(cors(corsOptions))

app.get("/", (_, res) => {
  res.send("API is alive!");
});

app.use("/api/client", clientRouter);
app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);

export default app;
