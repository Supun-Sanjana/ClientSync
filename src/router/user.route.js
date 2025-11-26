import { Router } from "express";
import { registerUser } from "../controller/user.controll.js";

const userRouter = Router();

userRouter.post("/", registerUser);

export default userRouter