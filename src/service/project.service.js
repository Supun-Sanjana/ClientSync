import pool from "../config/db.js";
import { selectClientById } from "../model/client.model.js";
import {
  allProjectQuery,
  createProjectQuery,
  deleteProjectQuery,
  projectByIdQuery,
  updateProjectQuery,
} from "../model/project.model.js";

export const createProjectService = async (project) => {
  try {
    const { client_id, title, description, status, start_date, end_date } =
      project;

    if (!client_id || !title) {
      throw new Error("Some fileds are required !");
    }

    // const isClientExist =await pool.query(selectClientById , [client_id])
    // if (!isClientExist) {
    //    return new Error("Client not found !");
    // }

    const row = await pool.query(createProjectQuery, [
      client_id,
      title,
      description,
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
