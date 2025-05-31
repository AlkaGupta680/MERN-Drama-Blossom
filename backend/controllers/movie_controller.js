import {fetchFromTMDB } from '../services/tmdb_service.js'
export async function getTrendingMovie(req,res){
    try {
        const url = "https://api.themoviedb.org/3/discover/movie?with_original_language=ko&sort_by=popularity.desc&include_adult=false&certification_country=KR&certification.lte=15";
        const data = await fetchFromTMDB(url);
        
        // List of banned keywords (add more as needed)
        const bannedKeywords = [
            "lover",
            "pervert",
            "sister",
            "stepmom's Desire",
            "affair",
            "sex",
            "nude",
            "seduce",
            "hot",
            "temptation",
            "adult"
        ];

        // Filter out movies with banned keywords in the title (case-insensitive)
        const filteredResults = data.results.filter(movie => {
            const title = (movie.title || movie.name || "").toLowerCase();
            return !bannedKeywords.some(keyword => title.includes(keyword));
        });

        // If no movies left after filtering, fallback to original results
        const finalResults = filteredResults.length > 0 ? filteredResults : data.results;

        // Pick a random movie from the filtered list
        const randomMovie = finalResults[Math.floor(Math.random() * finalResults.length)]
        //this is not change
        res.json({success:true, content:randomMovie}) ;
    } catch (error) {
          console.error("Error fetching from TMDB:", error.message); 
        res.status(500).json({success:false , message:"Internal Server Error"})
    }
}
//trailer
export async function getMovieTrailers(req,res){
    const { id } = req.params ;
try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=YOUR_API_KEY`);
//    console.log("TMDB video data:", data); // Add this line
    res.json({success:true ,trailers:data.results})
} catch (error) {
       if(error.message.includes("404")){
        return res.status(404).send(null);
       }
        res.status(500).json({success:false , message:"Internal Server Error"})
}

}

//details
export async function getMovieDetails(req,res){
    const { id } = req.params ;
   try {
     const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`)

     res.status(200).json({success:true,content:data})
   } catch (error) {
     if(error.message.includes("404")){
        return res.status(404).send(null);
       }
        res.status(500).json({success:false , message:"Internal Server Error"})
   }
}

//similar movies 
export async function getSimilarMovies(req,res){
    const { id } = req.params ;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar`)

     res.status(200).json({success:true,similar:data.results}) ;
    } catch (error) {
        res.status(500).json({success:false , message:"Internal Server Error"})
    }
}

//get movies by category
export async function getMoviesByCategory(req,res){
     const { category } = req.params ;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&region=KR&page=1
`)

     res.status(200).json({success:true,content:data.results}) ;
        
    } catch (error) {
         res.status(500).json({success:false , message:"Internal Server Error"})
    }
}
