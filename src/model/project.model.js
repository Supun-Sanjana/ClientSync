export const createProjectQuery = `
    INSERT INTO projects (client_id, title, description, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
`;

export const updateProjectQuery = `
  UPDATE projects
  SET 
    client_id = $1,
    title = $2,
    description = $3,
    status = $4,
    start_date = $5,
    end_date = $6
  WHERE id = $7
  RETURNING *;
`;

export const allProjectQuery = `SELECT * FROM projects`;

export const projectByIdQuery = `SELECT * FROM projects WHERE id=$1`;

export const deleteProjectQuery = `DELETE FROM projects WHERE id=$1`;