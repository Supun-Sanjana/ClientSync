import { createUserService } from "../service/user.service.js";

export const registerUser = async (req, res)=>{
    try {
        const {full_name, user_name, email, password } = req.body;

        const user = {full_name, user_name, email, password }

        const data = await createUserService({full_name, user_name, email, password})
        res.status(200).json({data})


    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({message:"Something went wrong !"})
    }
}