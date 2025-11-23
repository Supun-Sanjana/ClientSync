import {
  createProjectService,
  deleteProjectService,
  getActiveCountService,
  getAllProjectService,
  getProjectByIdService,
  getRevenueService,
  updateProjectService,
} from "../service/project.service.js";

export const createProject = async (req, res) => {
  const projects = req.body;

  try {
    //normalize req,body array
    const projectsArray = Array.isArray(projects) ? projects : [projects];

    const insertedProjects = [];
    for (const project of projectsArray) {
      const newProject = await createProjectService(project);
      insertedProjects.push(newProject);
    }

    res.status(200).json({ success: true, project: insertedProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;

  try {
    const newProject = await updateProjectService(req.body, id);
    if (!newProject) {
      return res
        .status(404)
        .json({ success: false, message: `Project with ID ${id} not found` });
    }
    return res.status(200).json({ "updated project": newProject });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectService();

    return res.status(200).json({ projects: projects });
  } catch (error) {
    console.log(error);
  }
};

export const getProjetById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await getProjectByIdService(id);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with thid id ${id} not found` });
    }

    res.status(200).json({ project: project });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProject = await deleteProjectService(id);

    if (deleteProject === 0) {
      return res
        .status(404)
        .json({ success: false, message: `Project with ID ${id} not found` });
    }

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getRevenue = async (_, res) => {
  try {
    const result = await getRevenueService();
    if (result) {
      return res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error.message || error);
    res.status(500).json({ message: error.message || error });
  }
};

export const getActiveCount = async (_, res) => {
  try {
    const {active, complete} = await getActiveCountService();
    return res.status(200).json({ active,complete });
  } catch (error) {
    console.log(error.message || error);
    throw new Error(error.message || "Server error");
  }
};
