import axios from 'axios' ;
import toast from 'react-hot-toast'
 import {create} from 'zustand';
 
 //  Add this line right after importing axios!
axios.defaults.withCredentials = true;
 export const useAuthStore = create((set) =>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingOut:false,
    isLoggingIn:false,
    isGuest:false,
    signup: async (credentials)=>{
        set({isSigningUp:true})
        try {
            const response=await axios.post("/api/v1/auth/signup", credentials);
            set({user:response.data.user , isSigningUp:false, isGuest:false});
            toast.success("Account created sucessfully");
        } catch (error) {
            toast.error(error.response.data.message || "signup failed");
          set({isSigningUp:false,user:null}) ;  
        }
    } ,
    login: async (credentials)=>{
         set({isLoggingIn : true}) ;
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user:response.data.user,isLoggingIn:false, isGuest:false});
             toast.success("Login successfully");
        } catch (error) {
            set({isLoggingIn:false, user:null});
             toast.error(error.response.data.message || "Login failed");
        }
    } ,
    loginAsGuest: () => {
        const guestUser = {
            _id: 'guest',
            username: 'Guest User',
            email: 'guest@dramablossom.com',
            image: '/avatar2.png'
        };
        set({user: guestUser, isGuest: true, isLoggingIn: false});
        toast.success("Welcome as Guest! 🌸");
    },
    logout: async ()=>{
        set({isLoggingOut : true}) ;
        try {
            if (useAuthStore.getState().isGuest) {
                set({user:null, isLoggingOut:false, isGuest:false});
                toast.success("Guest session ended");
                return;
            }
            await axios.post("/api/v1/auth/logout");
            set({user:null,isLoggingOut:false, isGuest:false});
             toast.success("Logout successfully");
        } catch (error) {
            set({isLoggingOut:false});
             toast.error(error.response.data.message || "Logout failed");
        }
    } ,
    authCheck: async ()=>{
        set({isCheckingAuth:true});
        try {
           const response = await axios.get("/api/v1/auth/authCheck") ;
           set({user:response.data.user , isCheckingAuth:false, isGuest:false}) ;
           
        } catch (error) {
             set({isCheckingAuth:false,user:null, isGuest:false}) ; 
            //  toast.error(error.response.data.message || "An error occured");
        }
    } ,
 }))