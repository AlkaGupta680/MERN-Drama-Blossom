import {User} from '../models/user_model.js';
import bcryptjs from 'bcryptjs' ;
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
//signup function
export async function signup(req,res) {
    try {
        const {email,password,username} = req.body ;
        if(!email || !password || !username){
             return  res.status(400).json({success:false , message:"All fields are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        if(!emailRegex.test(email)){
          return  res.status(400).json({success:false , message:"Invalid email"})  
        }
         if(password.length < 6){
          return  res.status(400).json({success:false , message:"Password  must be at least 6 characters"})  
        }

        const existingUserByEmail = await  User.findOne({email:email})
         if(existingUserByEmail){
          return  res.status(400).json({success:false , message:"Email already exists "})  
        }

         const existingUserByUsername = await  User.findOne({username:username})
         if(existingUserByUsername){
          return  res.status(400).json({success:false , message:"Username already exists "})  
        }
      // we are doing hashing of password
     const salt = await bcryptjs.genSalt(10) ;
     const hashedPassword = await bcryptjs.hash(password,salt) ;
      const  Profile_pics = ["/avatar2.png"] // option of default image for profile pic
      const image = Profile_pics[Math.floor(Math.random()*Profile_pics.length)] ;
        const  newUser =  new User({
            email:email,
            password:hashedPassword,
            username:username,
            image:image
        })

       
          generateTokenAndSetCookie(newUser._id,res) ;
           await newUser.save() ;
        //we should return something
        res.status(201).json({
          success:true ,
          user:{
          ...newUser._doc ,
           password:""
        },
       });
        
    } catch (error) {
        console.log("error in signup controller" , error.message)
        res.status(500).json({success:false , message:"Internal server error "})
    }
}

//login 
export async function login(req,res) {
    try {
       const {email,password} = req.body ;
        if(!email || !password){
             return  res.status(400).json({success:false , message:"All fields are required"})
        }
         const user = await  User.findOne({email:email})
         if(!user){
          return  res.status(400).json({success:false , message:"Invalid credentials"})  ;
        }
       const isPasswordCorrect = await bcryptjs.compare(password,user.password) ;
       if(!isPasswordCorrect){
        return  res.status(400).json({success:false , message:"Invalid credentials"})  ;
       }

       generateTokenAndSetCookie(user._id,res) ;
        res.status(200).json({
          sucess:true ,
          user:{
           ...user._doc,
          password: ""
        },
       });

    } catch (error) {
       console.log("error in login controller" , error.message)
        res.status(500).json({success:false , message:"Internal server error "})
    }
}

//logout 
export async function logout(req,res) {
    try {
      res.clearCookie("jwt-DramaBlossom") ;
      res.status(200).json({success:true , message:"Logged out successfully"}) ;
    } catch (error) {
      console.log("error in logout controller" , error.message)
        res.status(500).json({success:false , message:"Internal server error "})
    }
}
//authCheck
export async function authCheck(req,res){
  try {
   
    res.status(200).json({success:true ,user:req.user }) ;
  } catch (error) {
    console.log("error in authheck controller" , error.message) ;
    res.status(500).json({success:false , message:"Internal server error"}) ;
  }
}