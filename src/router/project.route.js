import { Router } from "express";
import {
  createProject,
  deleteProject,
  getActiveCount,
  getAllProjects,
  getProjectById,
  getRevenue,
  updateProject,
} from "../controller/project.controller.js";

const projectRouter = Router();
projectRouter.get('/user/:user_id', getAllProjects);
projectRouter.get('/user/:user_id/:id', getProjectById);
projectRouter.put('/:user_id/:id', updateProject);
projectRouter.delete('/:user_id/:id', deleteProject);

// Stats
projectRouter.get('/revenue/:user_id', getRevenue);
projectRouter.get('/active-count/:user_id', getActiveCount);

// Create
projectRouter.post('/', createProject);


export default projectRouter;
