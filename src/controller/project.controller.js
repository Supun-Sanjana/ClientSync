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


export const getAllProjects = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const projects = await getAllProjectService(user_id);
    res.json({ projects });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server Error" });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    const project = await getProjectByIdService(id, user_id);

    if (!project)
      return res.status(404).json({ message: "Not found" });

    res.json({ project });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};


export const updateProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    console.log(user_id);
    console.log(id);
    

    const updated = await updateProjectService(req.body, id, user_id);
    console.log(updated);
    

    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json({ updated });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);

    const deleted = await deleteProjectService(id, user_id);

    if (!deleted)
      return res.status(404).json({ message: "Not found" });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getActiveCount = async (req, res) => {
  const { user_id } = req.params;

  try {
    const counts = await getActiveCountService(user_id);
    return res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRevenue = async (req, res) => {
  const { user_id } = req.params;
  const id = parseInt(user_id)

  try {
    const revenue = await getRevenueService(id);
    return res.status(200).json({ revenue });
  } catch (error) {
    console.log(error.message || error);
    res.status(500).json({ message: error.message });
  }
};
