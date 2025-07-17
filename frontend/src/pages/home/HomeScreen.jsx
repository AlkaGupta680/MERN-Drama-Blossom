import { useState } from "react";
import { useAuthStore } from "../../store/authUser";
import { useContentStore } from "../../store/content";
import Navbar from "../../components/Navbar";
import { Info, Play, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import MovieSlider from "../../components/MovieSlider";
import { formatReleaseDate } from "../../utils/dateFunction";
import FloatingPetals from "../../components/FloatingPetals";
import toast from "react-hot-toast";

const HomeScreen = () => {
    const { user, isGuest } = useAuthStore();
    const { contentType } = useContentStore();
    const { trendingContent } = useGetTrendingContent();
    const [imgLoading, setImgLoading] = useState(true);

    const handlePlayClick = (id) => {
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
            return;
        }
        // Navigate to watch page for logged-in users
        window.location.href = `/watch/${id}`;
    };

    if (!trendingContent) {
        return (
            <div className='h-screen text-white relative'>
                <FloatingPetals />
                <Navbar />
                <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
            </div>
        );
    }

    return (
        <>
            <div className='relative h-screen text-white'>
                <FloatingPetals />
                <Navbar />

                {imgLoading && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
                )}

                <img
                    src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
                    alt='Hero img'
                    className='absolute top-0 left-0 w-full h-full object-cover -z-50'
                    onLoad={() => {
                        setImgLoading(false);
                    }}
                />

                <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-40' aria-hidden='true' />

                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
                    <div className='bg-gradient-to-r from-black via-black/80 to-transparent absolute top-0 left-0 w-full h-full -z-10' aria-hidden='true' />

                    <div className='max-w-2xl fade-in-up'>
                        <h1 className='mt-4 text-6xl font-extrabold text-balance korean-text drama-title'>
                            {trendingContent?.title || trendingContent?.name}
                        </h1>
                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(trendingContent?.release_date || trendingContent?.first_air_date)} |{" "}
                            {trendingContent?.adult ? (
                                <span className='text-red-600'>18+</span>
                            ) : (
                                <span className='text-green-600'>PG-13</span>
                            )}{" "}
                        </p>

                        <p className='mt-4 text-lg'>
                            {trendingContent?.overview.length > 200
                                ? trendingContent?.overview.slice(0, 200) + "..."
                                : trendingContent?.overview}
                        </p>
                    </div>

                    <div className='flex mt-8 gap-4'>
                        <button
                            className='bg-white hover:bg-white/80 text-black font-bold py-4 px-8 rounded-2xl mr-4 flex items-center hover:scale-105 transition-all duration-300 shadow-xl'
                            onClick={() => handlePlayClick(trendingContent?.id)}
                        >
                            {isGuest ? (
                                <>
                                    <Lock className='size-6 mr-2' />
                                    로그인 필요 (Login Required)
                                </>
                            ) : (
                                <>
                                    <Play className='size-6 mr-2 fill-black' />
                                    재생 (Play)
                                </>
                            )}
                        </button>

                        <button className='glass-morphism hover:bg-white/20 text-white py-4 px-8 rounded-2xl flex items-center hover:scale-105 transition-all duration-300 border border-white/30'>
                            <Info className='size-6 mr-2' />
                            정보 (More Info)
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-10 bg-black py-10 relative'>
                <FloatingPetals />
                
                {/* Guest Welcome Message */}
                {isGuest && (
                    <div className="max-w-6xl mx-auto px-4 mb-8">
                        <div className="korean-card p-6 rounded-2xl text-center">
                            <h2 className="text-2xl font-bold korean-text mb-4">🌸 게스트로 둘러보는 중</h2>
                            <p className="text-gray-300 mb-4">
                                현재 게스트 모드로 이용 중입니다. 드라마를 시청하려면 로그인해주세요!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link 
                                    to="/login" 
                                    className="btn-primary px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-300"
                                >
                                    로그인 (Login)
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="glass-morphism hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 border border-white/30"
                                >
                                    회원가입 (Sign Up)
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {contentType === "movie" ? (
                    MOVIE_CATEGORIES.map((category) => (
                        <MovieSlider key={category} category={category} />
                    ))
                ) : (
                    TV_CATEGORIES.map((category) => (
                        <MovieSlider key={category} category={category} />
                    ))
                )}
            </div>
        </>
    );
};

export default HomeScreen;