export const createProjectQuery = `
  INSERT INTO projects 
  (client_id, title, description, cost, status, start_date, end_date, user_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  RETURNING *;
`;

export const updateProjectQuery = `
  UPDATE projects SET
    client_id=$1,
    title=$2,
    description=$3,
    status=$4,
    start_date=$5,
    end_date=$6
  WHERE id=$7 AND user_id=$8
  RETURNING *;
`;

export const allProjectQuery = `
  SELECT * FROM projects 
  WHERE user_id = $1
  ORDER BY id DESC;
`;

export const projectByIdQuery = `
  SELECT * FROM projects 
  WHERE id = $1 AND user_id = $2;
`;

export const deleteProjectQuery = `
  DELETE FROM projects 
  WHERE id=$1 AND user_id=$2;
`;

export const getRevenueQuery = `
  SELECT SUM(cost)
  FROM projects 
  WHERE user_id=$1;
`;

export const getActiveProjectQuery = `
  SELECT
    SUM(CASE WHEN status IN ('in progress','pending') THEN 1 ELSE 0 END) AS active_count,
    SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed_count
  FROM projects
  WHERE user_id=$1;
`;
