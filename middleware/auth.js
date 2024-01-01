import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";

export const isAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Saale Login Kr phle"
            })
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRATE);
        req.user = await User.findById(decoded); 
        next()
    } catch (error) {
        console.log(error);
    }
}