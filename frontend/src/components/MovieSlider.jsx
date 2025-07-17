import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight, Lock, Play } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const { isGuest } = useAuthStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

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
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    const handleContentClick = (item) => {
        if (isGuest) {
            toast.error("로그인이 필요합니다! Please login to watch content", {
                duration: 4000,
                style: {
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '16px',
                },
            });
            return false;
        }
        return true;
    };

    return (
        <div
            className='bg-black text-white relative px-5 md:px-20'
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className='mb-4 text-2xl font-bold korean-text'>
                {formattedCategoryName} {formattedContentType}
            </h2>

            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                {content.map((item) => (
                    <div key={item.id} className='min-w-[250px] relative group'>
                        {isGuest ? (
                            <div 
                                className='cursor-pointer'
                                onClick={() => handleContentClick(item)}
                            >
                                <div className="relative">
                                    <img
                                        src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                        alt='Movie image'
                                        className='w-full h-auto rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110'
                                    />
                                    
                                    {/* Guest Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                                        <div className="text-center">
                                            <Lock className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                                            <p className="text-white font-bold text-sm">로그인 필요</p>
                                            <p className="text-pink-300 text-xs">Login Required</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className='mt-2 text-center korean-text font-medium'>
                                    {item.title || item.name}
                                </p>
                            </div>
                        ) : (
                            <Link
                                to={`/watch/${item.id}`}
                                className='cursor-pointer'
                                onClick={() => {
                                    useContentStore.setState({ contentType });
                                }}
                            >
                                <div className="relative">
                                    <img
                                        src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                        alt='Movie image'
                                        className='w-full h-auto rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110'
                                    />
                                    
                                    {/* Play Overlay for Logged Users */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                                        <div className="text-center">
                                            <Play className="w-12 h-12 text-white mx-auto mb-2 fill-white" />
                                            <p className="text-white font-bold text-sm">재생</p>
                                            <p className="text-gray-300 text-xs">Play</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className='mt-2 text-center korean-text font-medium'>
                                    {item.title || item.name}
                                </p>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;