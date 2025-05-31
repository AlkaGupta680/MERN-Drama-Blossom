import express from "express" ;
import {getTrendingTvShow,getTvShowTrailers,getTvShowDetails,getSimilarTvShow,getTvShowByCategory} from '../controllers/tv_controller.js' 
const router = express.Router() ;
router.get("/trending",getTrendingTvShow) ;
router.get("/:id/trailers",getTvShowTrailers) ;
router.get("/:id/details",getTvShowDetails) ;
router.get("/:id/similar",getSimilarTvShow) ;
router.get("/:category",getTvShowByCategory) ;


export default router ;
