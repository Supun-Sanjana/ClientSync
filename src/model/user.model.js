export const registerUserQuery = "INSERT INTO users (full_name, user_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";

export const loginUserQuery = "SELECT * FROM users WHERE email =$1";
