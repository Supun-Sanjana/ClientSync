// routes/client.routes.js
import express from "express";
import { createClient, getAllClients, updateClient , getClientByName, deleteClientById} from "../controller/client.controller.js";


const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.put("/:id", updateClient);
clientRouter.get("/", getAllClients);
clientRouter.get("/search/:first_name", getClientByName);
clientRouter.delete("/:id", deleteClientById);


export default clientRouter;
