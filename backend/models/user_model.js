import mongoose from'mongoose' ;
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unqiue:true,
    },
    email:{
        type:String,
        required:true,
        unqiue:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }
})

//user model create 
const User = mongoose.model('User',userSchema) ;
export { User };