import jwt from "jsonwebtoken"
import {ENV_VARS} from '../config/envVars.js'
import {User} from "../models/user_model.js"

export const protectRoute =  async(req,res,next) =>{
    try {
        const token = req.cookies["jwt-DramaBlossom"] ;
        if(!token){
            return res.status(401).json({success:false , message:"Unauthorized - No Token Provided"})
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) ;
         if(!decoded){
            return res.status(401).json({success:false , message:"Unauthorized - Invalid Token"})
        }
        // console.log("Decoded JWT:", decoded);

        const user = await User.findById(decoded.UserId).select("-password")
        if(!user){
            return res.status(404).json({success:false , message:"User not found"}) 
        }
        req.user = user ;
        next() 
    } catch (error) {
        console.log("error in protectRoute middleware: " , error.message) ;
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}