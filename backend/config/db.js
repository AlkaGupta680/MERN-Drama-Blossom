import mongoose from'mongoose' ;
import {ENV_VARS} from './envVars.js'
    export  const  connectDB = async () =>{
            try {
                const conn= await mongoose.connect(ENV_VARS.MONGO_URL) ;
         console.log("mongoDB connected : "+ conn.connection.host)
            } catch (error) {
                console.log("error in connecting with DataBase : "+ error.message)
                process.exit(1) ; // 1 means error , 0 means sucess
            }
    }