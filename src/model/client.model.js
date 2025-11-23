export const createClientQuery = `
  INSERT INTO clients (first_name, last_name, email, phone, company)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

export const existingClientQuery = `SELECT * FROM clients WHERE email = $1`;

export const updateClientQuery = `
  UPDATE clients
  SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5
  WHERE id = $6
  RETURNING *;
`;

export const getallClients = `SELECT * FROM clients ORDER BY created_at DESC LIMIT 20`;

export const selectClientByName = `
  SELECT * FROM clients 
  WHERE first_name ILIKE '%' || $1 || '%'
  ORDER BY created_at DESC;
`;

export const selectClientById = `SELECT * FROM clients WHERE id=$1`;

export const deleteClient = `DELETE FROM clients WHERE id = $1`;

export const clientCountQuery = `SELECT COUNT(*) FROM clients`;