import {fetchFromTMDB } from '../services/tmdb_service.js'

//trending show
export async function getTrendingTvShow(req,res){
try {
        const url = "https://api.themoviedb.org/3/discover/tv?with_original_language=ko&sort_by=popularity.desc";
        const data = await fetchFromTMDB(url);
        const randomTv = data.results[Math.floor(Math.random()*data.results?.length)] ;
        res.json({success:true, content:randomTv}) ;
    } catch (error) {
          console.error("Error fetching from TMDB:", error.message); 
        res.status(500).json({success:false , message:"Internal Server Error"})
    }
}

//getTvShowTrailers
export async function getTvShowTrailers(req,res){
 const { id } = req.params ;
try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=YOUR_API_KEY`);
    res.json({success:true ,trailers:data.results})
} catch (error) {
       if(error.message.includes("404")){
        return res.status(404).send(null);
       }
        res.status(500).json({success:false , message:"Internal Server Error"})
}
}

//getTvShowDetails
export async function getTvShowDetails(req,res){
const { id } = req.params ;
   try {
     const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?api_key=YOUR_API_KEY`)

     res.status(200).json({success:true,content:data})
   } catch (error) {
     if(error.message.includes("404")){
        return res.status(404).send(null);
       }
        res.status(500).json({success:false , message:"Internal Server Error"})
   }
}

//getSimilarTvShow
export async function getSimilarTvShow(req,res){
 const { id } = req.params ;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar`)

     res.status(200).json({success:true,similar:data.results}) ;
    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server Error"})
    }
}


//getTvShowByCategory
export async function getTvShowByCategory(req,res){
 const { category } = req.params ;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=ko-KR&region=KR&page=1
`)

     res.status(200).json({success:true,content:data.results}) ;
        
    } catch (error) {
         res.status(500).json({success:false , message:"Internal Server Error"})
    }
}