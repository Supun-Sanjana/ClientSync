// routes/client.routes.js
import express from "express";
import { createClient, getAllClients, updateClient , getClientByName, deleteClientById, getClientCount} from "../controller/client.controller.js";


const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getAllClients);
clientRouter.get("/count", getClientCount);

clientRouter.put("/:id", updateClient);
clientRouter.get("/search/:first_name", getClientByName);
clientRouter.delete("/:id", deleteClientById);


export default clientRouter;
