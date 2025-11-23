import { Router } from "express";
import {
  createProject,
  deleteProject,
  getActiveCount,
  getAllProjects,
  getProjetById,
  getRevenue,
  updateProject,
} from "../controller/project.controller.js";

const projectRouter = Router();

// Static or specific routes FIRST
projectRouter.get('/revenue', getRevenue);
projectRouter.get('/active-count', getActiveCount);

// Normal CRUD routes
projectRouter.post('/', createProject);
projectRouter.get('/', getAllProjects);

// Dynamic routes LAST
projectRouter.get('/:id', getProjetById);
projectRouter.put('/:id', updateProject);
projectRouter.delete('/:id', deleteProject);

export default projectRouter;
