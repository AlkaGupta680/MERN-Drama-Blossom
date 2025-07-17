import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import FloatingPetals from "../components/FloatingPetals";
import { Navigate } from "react-router-dom";

const WatchPage = () => {
    const { id } = useParams();
    const { user, isGuest } = useAuthStore();
    const { contentType } = useContentStore();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);

    // Redirect guests to login
    if (isGuest) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers);
            } catch (error) {
                if (error.response?.status === 404) {
                    setTrailers([]);
                }
            }
        };

        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if (error.response?.status === 404) {
                    setSimilarContent([]);
                }
            }
        };

        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content);
            } catch (error) {
                if (error.response?.status === 404) {
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };

        getContentDetails();
    }, [contentType, id]);

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1);
        }
    };
    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen bg-black p-10'>
                <FloatingPetals />
                <WatchPageSkeleton />
            </div>
        );
    }

    if (!content) {
        return (
            <div className='bg-black text-white h-screen'>
                <FloatingPetals />
                <div className='max-w-6xl mx-auto'>
                    <Navbar />
                    <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance korean-text'>
                            Content not found 😥
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-black min-h-screen text-white'>
            <FloatingPetals />
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />

                {trailers.length > 0 && (
                    <div className='flex justify-between items-center mb-4 mt-8'>
                        <button
                            className={`
                                bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                    currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            disabled={currentTrailerIdx === 0}
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className={`
                                bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                    currentTrailerIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            disabled={currentTrailerIdx === trailers.length - 1}
                            onClick={handleNext}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {trailers?.length > 0 && (
                    <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                        <ReactPlayer
                            controls={true}
                            width={"100%"}
                            height={"70vh"}
                            className='mx-auto overflow-hidden rounded-lg'
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                        />

                        {trailers?.length > 1 && (
                            <div className='flex justify-center gap-2 mt-4'>
                                {trailers?.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`
                                            w-3 h-3 rounded-full mx-1 ${
                                                index === currentTrailerIdx ? "bg-red-600" : "bg-gray-600"
                                            }
                                        `}
                                        onClick={() => setCurrentTrailerIdx(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* movie details */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                    <div className='mb-4 md:mb-0'>
                        <h2 className='text-5xl font-bold text-balance korean-text drama-title'>
                            {content?.title || content?.name}
                        </h2>

                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                            {content?.adult ? (
                                <span className='text-red-600'>18+</span>
                            ) : (
                                <span className='text-green-600'>PG-13</span>
                            )}{" "}
                        </p>
                        <p className='mt-4 text-lg'>{content?.overview}</p>
                    </div>
                    <img
                        src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
                        alt='Poster image'
                        className='max-h-[600px] rounded-md'
                    />
                </div>

                {similarContent.length > 0 && (
                    <div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4 korean-text'>Similar Movies/TV Show</h3>
                        <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4'>
                            {similarContent.map((content) => {
                                if (content.poster_path === null) return null;
                                return (
                                    <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
                                        <img
                                            src={SMALL_IMG_BASE_URL + content.poster_path}
                                            alt='Poster path'
                                            className='w-full h-auto rounded-md hover:scale-105 transition-transform duration-300'
                                        />
                                        <h4 className='mt-2 text-lg font-semibold korean-text'>
                                            {content.title || content.name}
                                        </h4>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchPage;