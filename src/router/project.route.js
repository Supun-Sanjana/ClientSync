import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjetById, updateProject } from "../controller/project.controller.js";

const projectRouter = Router();

projectRouter.post('/', createProject)
projectRouter.put('/:id', updateProject)
projectRouter.get('/', getAllProjects)
projectRouter.get('/:id', getProjetById)
projectRouter.delete('/:id', deleteProject)

export default projectRouter