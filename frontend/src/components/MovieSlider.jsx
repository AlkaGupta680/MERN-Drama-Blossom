import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight, Star, Calendar, Heart, Lock, Play } from "lucide-react";
import { useAuthStore } from "../store/authUser";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const { isGuest } = useAuthStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const sliderRef = useRef(null);

    const formattedCategoryName =
        category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === "movie" ? "영화" : "드라마";

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };

        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };
    
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'popular': return '🔥';
            case 'top_rated': return '⭐';
            case 'now_playing': return '🎬';
            case 'upcoming': return '🚀';
            case 'airing_today': return '📺';
            case 'on_the_air': return '📡';
            default: return '🎭';
        }
    };

    return (
        <div
            className='text-white relative px-5 md:px-20 py-8 korean-pattern'
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            {/* Slide title */}
            <div className="mb-6 slide-in-left">
                <h2 className='text-3xl md:text-4xl font-bold korean-text drama-title mb-2'>
                    {getCategoryIcon(category)} {formattedCategoryName} {formattedContentType}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            </div>

            <div className='flex space-x-6 overflow-x-scroll scrollbar-hide pb-4' ref={sliderRef}>
                {content.map((item, index) => (
                    {isGuest ? (
                        <Link 
                            to="/login"
                            className='min-w-[280px] relative group hover-lift' 
                            key={item.id}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className='drama-card rounded-2xl overflow-hidden relative'>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                        alt='Drama image'
                                        className='w-full h-48 object-cover transition-all duration-500 group-hover:scale-110'
                                    />
                                    
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Lock icon for guest users */}
                                    <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm rounded-full p-2">
                                        <Lock className="text-white" size={20} />
                                    </div>

                                    {/* Rating badge */}
                                    {item.vote_average && (
                                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                            <Star className="text-yellow-400 fill-current" size={14} />
                                            <span className="text-white text-sm font-medium">
                                                {item.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover content */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
                                        hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <Calendar size={14} />
                                                <span>
                                                    {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'TBA'}
                                                </span>
                                            </div>
                                            <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                                                로그인 필요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 px-2">
                                <h3 className='text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-300 drama-title line-clamp-2'>
                                    {item.title || item.name}
                                </h3>
                                {item.overview && (
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                                        {item.overview.slice(0, 100)}...
                                    </p>
                                )}
                            </div>
                        </Link>
                    ) : (
                        <Link 
                            to={`/watch/${item.id}`} 
                            className='min-w-[280px] relative group hover-lift' 
                            key={item.id}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className='drama-card rounded-2xl overflow-hidden relative'>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                        alt='Drama image'
                                        className='w-full h-48 object-cover transition-all duration-500 group-hover:scale-110'
                                    />
                                    
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Play button on hover */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                                        hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-white/30">
                                            <Play className="text-white fill-white" size={32} />
                                        </div>
                                    </div>

                                    {/* Heart icon */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <Heart className="text-pink-400 hover:text-pink-300 cursor-pointer hover:scale-125 transition-transform duration-200" size={24} />
                                    </div>

                                    {/* Rating badge */}
                                    {item.vote_average && (
                                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                            <Star className="text-yellow-400 fill-current" size={14} />
                                            <span className="text-white text-sm font-medium">
                                                {item.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover content */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
                                        hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                    }`}>
                                        <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                                            <Calendar size={14} />
                                            <span>
                                                {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'TBA'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 px-2">
                                <h3 className='text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-300 drama-title line-clamp-2'>
                                    {item.title || item.name}
                                </h3>
                                {item.overview && (
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                                        {item.overview.slice(0, 100)}...
                                    </p>
                                )}
                            </div>
                        </Link>
                    )}
                ))}
            </div>

            {showArrows && content.length > 0 && (
                <>
                    <button
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                        text-white z-10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/25'
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                        text-white z-10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-pink-500/25'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={28} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;