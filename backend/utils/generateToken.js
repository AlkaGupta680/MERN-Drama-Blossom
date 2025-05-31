import jwt from "jsonwebtoken" ;
import { ENV_VARS } from "../config/envVars.js";
export const generateTokenAndSetCookie =(UserId, res)=>{
    const token = jwt.sign({UserId} ,ENV_VARS.JWT_SECRET,{expiresIn:'15d'}) ;
    res.cookie("jwt-DramaBlossom" , token,{
        maxAge: 15*24*60*60*1000 ,//15day =  in miliseconds
        httpOnly:true, // prevent xss attack cross-site scripting attack , it not be accessed using js
        sameSite:"strict" ,//CSRF attack
        secure:ENV_VARS.NODE_ENV !== "development" ,
    })
     return token ;
};