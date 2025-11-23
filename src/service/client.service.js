// services/client.service.js
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
  const { first_name, last_name, email, phone, company } = client;

  if (!first_name || !email ) {
    throw new Error("Some of the fields are missing.");
  }

  //Always pass the query parameters as an array. in pg ( PostgreSQL )
  const existingClient = await pool.query(existingClientQuery, [email]);
  if (existingClient.rows.length > 0) {
    throw new Error("Client already exists.");
  }

  console.log("Values to insert:", [
    client.first_name,
    client.last_name,
    client.email,
    client.phone,
    client.company,
  ]);

  const { rows } = await pool.query(createClientQuery, [
    first_name,
    last_name,
    email,
    phone,
    company,
  ]);
  return rows[0];
};

export const updateClientService = async (data, id) => {
  console.log(id);
  console.log(data);

  try {
    const { first_name, last_name, email, phone, company } = data;

    const { rows } = await pool.query(updateClientQuery, [
      first_name,
      last_name,
      email,
      phone,
      company,
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error.message || error);
  }
};

export const getAllClientsService = async () => {
  try {
    const allClients = await pool.query(getallClients, []);
    return allClients.rows;
  } catch (error) {
    console.log(error.message || error);
  }
};

export const getClientByNameService = async (first_name) => {
  try {
    const result = await pool.query(selectClientByName, [first_name]);
    return result.rows; // return all matching clients
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deleteClientByIdService = async (id) => {
  try {
   const aff =  await pool.query(deleteClient, [id])
   return aff.rowCount

  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getClientCountService = async ()=>{
  try {
    const result = await pool.query(clientCountQuery);
    return result.rows[0].count
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}