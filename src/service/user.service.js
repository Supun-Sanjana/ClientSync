import pool from "../config/db.js";
import { registerUser } from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const createUserService = async ({full_name, user_name, email, password}) => {

  try {
    if (!user_name && !email && !password) {
            return res.status(401).json({message:"some filed are required"})
        }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    
        
    const {rows} = await pool.query(registerUser, [
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
