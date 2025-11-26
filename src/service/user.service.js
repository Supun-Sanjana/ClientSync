import pool from "../config/db.js";
import { loginUserQuery, registerUserQuery } from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const createUserService = async ({
  full_name,
  user_name,
  email,
  password,
}) => {
  try {
    if (!user_name && !email && !password) {
      return res.status(401).json({ message: "some filed are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);

    const { rows } = await pool.query(registerUserQuery, [
      full_name,
      user_name,
      email,
      hash,
    ]);
    return rows[0];
  } catch (e) {
    console.log(e || e.message);
    throw new Error(e);
  }
};

export const loginUserService = async (email, password) => {
  try {
    const { rows } = await pool.query(loginUserQuery, [email]);

    if (!rows || rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user;

  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
