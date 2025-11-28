import express from "express";
import {
  createClient,
  getAllClients,
  updateClient,
  getClientByName,
  deleteClientById,
  getClientCount
} from "../controller/client.controller.js";

const clientRouter = express.Router();

// First: specific routes
clientRouter.get("/count/:user_id", getClientCount);
clientRouter.get("/search/:first_name", getClientByName);

// Then: CRUD
clientRouter.post("/", createClient);
clientRouter.put("/:id", updateClient);
clientRouter.delete("/:id", deleteClientById);

// Last: generic route
clientRouter.get("/:user_id", getAllClients);

export default clientRouter;
