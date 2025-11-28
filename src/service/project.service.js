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
    const {
      client_id,
      title,
      description,
      cost,
      status,
      start_date,
      end_date,
      user_id
    } = project;

    const result = await pool.query(createProjectQuery, [
      client_id,
      title,
      description,
      cost,
      status ?? "pending",
      start_date,
      end_date,
      user_id
    ]);

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getAllProjectService = async (user_id) => {
  const result = await pool.query(allProjectQuery, [user_id]);
  return result.rows;
};


export const getProjectByIdService = async (id, user_id) => {
  const result = await pool.query(projectByIdQuery, [id, user_id]);
  return result.rows[0];
};


export const updateProjectService = async (data, id, user_id) => {
  const { client_id, title, description, status,cost, start_date, end_date } = data;

  const result = await pool.query(updateProjectQuery, [
    client_id,
    title,
    description,
    status,
    cost,
    start_date,
    end_date,
    id,
    user_id
  ]);

  return result.rows[0];
};


export const deleteProjectService = async (id, user_id) => {
  const result = await pool.query(deleteProjectQuery, [id, user_id]);
  return result.rowCount;
};


export const getActiveCountService = async (user_id) => {
  try {
    const id = parseInt(user_id);
    if (isNaN(id)) {
      throw new Error("Invalid user_id");
    }

    const result = await pool.query(getActiveProjectQuery, [id]);

    return {
      active: Number(result.rows[0].active_count) || 0,
      complete: Number(result.rows[0].completed_count) || 0,
    };
  } catch (error) {
    console.log(error.message || error);
    throw new Error(error.message || "Server error");
  }
};


export const getRevenueService = async (user_id) => {
  try {
     const result = await pool.query(getRevenueQuery, [user_id]);

    const revenue = Number(result.rows[0].sum) || 0;    

    return revenue;
  } catch (error) {
    console.log(error.message || error);
    throw new Error(error.message || "Server error");
  }
};
