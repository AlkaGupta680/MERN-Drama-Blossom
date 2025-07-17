import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Play, Info, Star, Calendar, Heart, Lock } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import { useState } from "react";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import FloatingPetals from "../../components/FloatingPetals";
import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
    const { trendingContent } = useGetTrendingContent();
    const { contentType } = useContentStore();
    const { isGuest } = useAuthStore();
    const [imgLoading, setImgLoading] = useState(true);

    if (!trendingContent)
        return (
            <div className='h-screen text-white relative bg-black'>
                <FloatingPetals />
                <Navbar />
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-900/20 to-purple-900/20 flex items-center justify-center -z-10 shimmer' />
            </div>
        );

    return (
        <>
            <FloatingPetals />
            <div className='relative h-screen text-white overflow-hidden'>
                <Navbar />
                
                {/* Loading shimmer */}
                {imgLoading && (
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-900/30 to-purple-900/30 flex items-center justify-center shimmer -z-10' />
                )}

                {/* Hero background image */}
                <img
                    src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
                    alt='Hero img'
                    className='absolute top-0 left-0 w-full h-full object-cover -z-50'
                    onLoad={() => setImgLoading(false)}
                />

                {/* Gradient overlays */}
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent -z-40' />
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-transparent to-black/50 -z-30' />

                {/* Hero content */}
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
                    <div className='max-w-3xl slide-in-left'>
                        {/* Content type badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Star className="size-4 fill-current" />
                            <span>{contentType === "movie" ? "🎬 영화" : "📺 드라마"}</span>
                        </div>

                        {/* Title */}
                        <h1 className='text-4xl md:text-7xl font-extrabold text-balance mb-4 korean-text drama-title text-shadow-korean'>
                            {trendingContent?.title || trendingContent?.name}
                        </h1>

                        {/* Meta info */}
                        <div className="flex items-center gap-6 mb-6 text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-5 text-pink-400" />
                                <span className="text-gray-200">
                                    {trendingContent?.release_date?.split("-")[0] ||
                                        trendingContent?.first_air_date?.split("-")[0]}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Star className="size-5 text-yellow-400 fill-current" />
                                <span className="text-gray-200">
                                    {trendingContent?.vote_average?.toFixed(1) || "N/A"}
                                </span>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                trendingContent?.adult 
                                    ? "bg-red-500/20 text-red-300 border border-red-500/30" 
                                    : "bg-green-500/20 text-green-300 border border-green-500/30"
                            }`}>
                                {trendingContent?.adult ? "18+" : "전체관람가"}
                            </div>
                        </div>

                        {/* Overview */}
                        <p className='text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl'>
                            {trendingContent?.overview?.length > 200
                                ? trendingContent?.overview.slice(0, 200) + "..."
                                : trendingContent?.overview}
                        </p>

                        {/* Action buttons */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            {isGuest ? (
                                <Link 
                                    to="/login"
                                    className='btn-primary font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 transition-all duration-300 shadow-xl'
                                >
                                    <Lock className='size-6' />
                                    <span>로그인하여 시청하기</span>
                                </Link>
                            ) : (
                                <Link 
                                    to={`/watch/${trendingContent?.id}`}
                                    className='btn-primary font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 transition-all duration-300 shadow-xl'
                                >
                                    <Play className='size-6 fill-white' />
                                    <span>지금 시청하기</span>
                                </Link>
                            )}
                            
                            {isGuest ? (
                                <Link 
                                    to="/login"
                                    className='glass-morphism hover:bg-white/20 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 border border-white/30'
                                >
                                    <Info className='size-6' />
                                    <span>로그인하여 자세히 보기</span>
                                </Link>
                            ) : (
                                <Link 
                                    to={`/watch/${trendingContent?.id}`}
                                    className='glass-morphism hover:bg-white/20 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 border border-white/30'
                                >
                                    <Info className='size-6' />
                                    <span>자세히 보기</span>
                                </Link>
                            )}
                            
                            <button className='glass-morphism hover:bg-white/20 text-white py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 border border-white/30 group'>
                                <Heart className='size-6 text-pink-400 group-hover:fill-current transition-all duration-300' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content sliders */}
            <div className='flex flex-col gap-12 bg-black py-16'>
                {contentType === "movie"
                    ? MOVIE_CATEGORIES.map((category, index) => (
                        <div key={category} className={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                            <MovieSlider category={category} />
                        </div>
                    ))
                    : TV_CATEGORIES.map((category, index) => (
                        <div key={category} className={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                            <MovieSlider category={category} />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default HomeScreen;