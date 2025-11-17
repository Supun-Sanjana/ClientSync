// routes/client.routes.js
import express from "express";
import { createClient, getAllClients, updateClient } from "../controller/client.controller.js";

const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.put("/:id", updateClient);
clientRouter.get("/", getAllClients);


export default clientRouter;
