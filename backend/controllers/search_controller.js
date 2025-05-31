import {User} from "../models/user_model.js"
import {fetchFromTMDB} from "../services/tmdb_service.js"

//person search
export async function searchPerson(req,res){
     const { query } = req.params ;
   try {
     const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
     if(response.results.length == 0){
        return res.status(404).send(null) ;
     }
    await User.findByIdAndUpdate(req.user._id,{
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].profile_path,
                title:response.results[0].name,
                searchType:"person",
                createdAt:new Date()
            },
        },
    });
     res.status(200).json({success:true,content:response.results})

    } catch (error) {
    console.log("Error in searchPerson controller", error.message) ;
    res.status(500).json({success:false,message:"Internal Server Error"})
 }
}

// movie search
export async function searchMovie(req,res){
    const { query } = req.params ;
try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&with_original_language=ko&api_key=YOUR_API_KEY`);
    if(response.results.length == 0){
        return res.status(404).send(null) ;
     }
     await User.findByIdAndUpdate(req.user._id,{
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].title,
                searchType:"movie",
                createdAt:new Date()
            },
        },
    });
      res.status(200).json({success:true,content:response.results}) 
} catch (error) {
     console.log("Error in searchMovie controller", error.message) ;
    res.status(500).json({success:false,message:"Internal Server Error"})
}
}
//tv search
export async function searchTvShow(req,res){
     const { query } = req.params ;
try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1&with_original_language=ko&api_key=YOUR_API_KEY`);
    if(response.results.length == 0){
        return res.status(404).send(null) ;
     }
     await User.findByIdAndUpdate(req.user._id,{
        $push:{
            searchHistory:{
                id:response.results[0].id,
                image:response.results[0].poster_path,
                title:response.results[0].tittle,
                searchType:"tv",
                createdAt:new Date()
            },
        },
  });
     res.status(200).json({success:true,content:response.results}) 
} catch (error) {
     console.log("Error in searchTvShow controller", error.message) ;
    res.status(500).json({success:false,message:"Internal Server Error"})
}
}

// to see search history
export async function getSearchHistory(req,res){
 try {
     res.status(200).json({success:true,content: req.user.searchHistory})
 } catch (error) {
    res.status(500).json({success:false,message:"Internal Server Error"})
 }
}
//delete item from search history
export async function removeItemFromSearchHistory(req,res){
    try {
         let { id } = req.params ;
         id = parseInt(id) ;
         const response = await User.findByIdAndUpdate(req.user._id ,{
            $pull:{
                searchHistory:{id: id },
            },
         });
       res.status(200).json({success:true,message: "Item removed from search history"})  
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller", error.message) ; 
    res.status(500).json({success:false,message:"Internal Server Error"}) 
    }
}