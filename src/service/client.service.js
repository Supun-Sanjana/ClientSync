import pool from "../config/db.js";
import {
  clientCountQuery,
  createClientQuery,
  deleteClient,
  existingClientQuery,
  getallClients,
  selectClientByName,
  updateClientQuery,
} from "../model/client.model.js";

export const createClientService = async (client) => {
  const { first_name, last_name, email, phone, company, user_id } = client;
  
  console.log("BACKEND RECEIVED:", client);

  if (!first_name || !email || !user_id) {
    throw new Error("Missing required fields or user_id");
  }

  const uid = parseInt(user_id);
  if (isNaN(uid)) throw new Error("Invalid user_id (NaN)");

  // check duplicate by email
  const existing = await pool.query(existingClientQuery, [email]);
  if (existing.rows.length > 0) throw new Error("Client already exists");

  const { rows } = await pool.query(createClientQuery, [
    first_name,
    last_name,
    email,
    phone,
    company,
    uid
  ]);



  return rows[0];
};

export const updateClientService = async (data, id) => {
  const { first_name, last_name, email, phone, company } = data;
  console.log({ first_name, last_name, email, phone, company });

  const { rows } = await pool.query(updateClientQuery, [
    first_name,
    last_name,
    email,
    phone,
    company,
    id,
  ]);

  

  return rows[0];
};

export const getAllClientsService = async (user_id) => {
  const uid = parseInt(user_id);
  if (isNaN(uid)) throw new Error("User ID is NaN");

  const result = await pool.query(getallClients, [uid]);
  return result.rows;
};

export const getClientByNameService = async (first_name) => {
  const result = await pool.query(selectClientByName, [first_name]);
  return result.rows;
};

export const deleteClientByIdService = async (id) => {
  const result = await pool.query(deleteClient, [id]);
  return result.rowCount;
};

export const getClientCountService = async (user_id) => {
  const uid = parseInt(user_id);
  if (isNaN(uid)) throw new Error("User ID is NaN");

  const result = await pool.query(clientCountQuery, [uid]);
  return result.rows[0].count;
};
