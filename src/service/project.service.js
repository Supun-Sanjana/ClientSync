import pool from "../config/db.js";
import {
  allProjectQuery,
  createProjectQuery,
  deleteProjectQuery,
  getActiveProjectQuery,
  getRevenueQuery,
  projectByIdQuery,
  updateProjectQuery,
} from "../model/project.model.js";

export const createProjectService = async (project) => {
  try {
    const { client_id, title, description, cost, end_date, start_date, status } = project;

    if (!client_id || !title) {
      throw new Error("Some fileds are required !");
    }

    const row = await pool.query(createProjectQuery, [
      client_id,
      title,
      description,
      cost,
      status,
      start_date,
      end_date,

    ]);

    return row.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateProjectService = async (project, id) => {
  const { client_id, title, description, status, start_date, end_date } =
    project;

  try {
    const row = await pool.query(updateProjectQuery, [
      client_id,
      title,
      description,
      status || "pending",
      start_date,
      end_date,
      id,
    ]);
    return row.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectService = async () => {
  try {
    const row = await pool.query(allProjectQuery);
    return row.rows;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectByIdService = async (id) => {
  try {
    const conId = parseInt(id);
    const project = await pool.query(projectByIdQuery, [conId]);
    return project.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectService = async (id) => {
  try {
    const row = await pool.query(deleteProjectQuery, [id]);
    return row.rowCount;
  } catch (error) {
    console.log(error);
  }
};


export const getRevenueService = async () => {
  try {
    const result = await pool.query(getRevenueQuery);
    return result.rows[0].sum;  // only return the numeric SUM
  } catch (error) {
    console.log(error.message || error);
    throw new Error(error.message || "Server error");
  }
};

export const getActiveCountService = async ()=>{
  try {
    const result = await pool.query(getActiveProjectQuery);
    const complete = result.rows[0].completed_count
    const active = result.rows[0].active_count
    return {complete, active}
  } catch (error) {
    console.log(error.message || error);
    throw new Error(error.message || "Server error");
  }
}

