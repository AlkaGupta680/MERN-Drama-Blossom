import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash, Calendar, Star, Film, Tv, User } from "lucide-react";
import toast from "react-hot-toast";
import FloatingPetals from "../components/FloatingPetals";

function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${year}년 ${month} ${day}일`;
}

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const res = await axios.get(`/api/v1/search/history`);
                setSearchHistory(res.data.content);
            } catch (error) {
                setSearchHistory([]);
            } finally {
                setIsLoading(false);
            }
        };
        getSearchHistory();
    }, []);

    const handleDelete = async (entry) => {
        try {
            await axios.delete(`/api/v1/search/history/${entry.id}`);
            setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
            toast.success("검색 기록이 삭제되었습니다.");
        } catch (error) {
            toast.error("삭제에 실패했습니다.");
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'movie': return <Film size={16} className="text-red-400" />;
            case 'tv': return <Tv size={16} className="text-blue-400" />;
            case 'person': return <User size={16} className="text-green-400" />;
            default: return <Star size={16} />;
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'movie': return '영화';
            case 'tv': return '드라마';
            case 'person': return '인물';
            default: return type;
        }
    };

    if (isLoading) {
        return (
            <div className='bg-black min-h-screen text-white relative'>
                <FloatingPetals />
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <div className="flex justify-center items-center h-96">
                        <div className="w-12 h-12 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (searchHistory?.length === 0) {
        return (
            <div className='bg-black min-h-screen text-white relative'>
                <FloatingPetals />
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <div className="text-center mb-12 fade-in-up">
                        <h1 className='text-4xl md:text-6xl font-bold korean-text drama-title mb-4'>
                            🔍 검색 기록
                        </h1>
                        <p className="text-xl text-gray-300">Search History</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                    </div>
                    
                    <div className='flex flex-col justify-center items-center h-96 fade-in-up'>
                        <div className="text-8xl mb-6">📝</div>
                        <h2 className='text-3xl font-bold korean-text mb-4'>검색 기록이 없습니다</h2>
                        <p className='text-xl text-gray-400 mb-8'>아직 검색한 내용이 없어요. 드라마를 검색해보세요!</p>
                        <a 
                            href="/search" 
                            className="btn-primary px-8 py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            지금 검색하기 →
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-black text-white min-h-screen relative'>
            <FloatingPetals />
            <Navbar />

            <div className='max-w-6xl mx-auto px-4 py-8'>
                <div className="text-center mb-12 fade-in-up">
                    <h1 className='text-4xl md:text-6xl font-bold korean-text drama-title mb-4'>
                        🔍 검색 기록
                    </h1>
                    <p className="text-xl text-gray-300">Your Search History</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {searchHistory?.map((entry, index) => (
                        <div 
                            key={entry.id} 
                            className={`drama-card p-6 rounded-2xl hover-lift group ${
                                index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={SMALL_IMG_BASE_URL + entry.image}
                                        alt='History image'
                                        className='w-16 h-20 rounded-xl object-cover border-2 border-pink-400/30 group-hover:border-pink-400/60 transition-all duration-300'
                                    />
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1">
                                        {getTypeIcon(entry.searchType)}
                                    </div>
                                </div>
                                
                                <div className='flex flex-col flex-1 min-w-0'>
                                    <h3 className='text-white text-lg font-bold korean-text group-hover:text-pink-300 transition-colors duration-300 line-clamp-2'>
                                        {entry.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                        <Calendar size={14} />
                                        <span>{formatDate(entry.createdAt)}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className={`py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 ${
                                            entry.searchType === "movie"
                                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                                : entry.searchType === "tv"
                                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                                : "bg-green-500/20 text-green-300 border border-green-500/30"
                                        }`}>
                                            {getTypeIcon(entry.searchType)}
                                            {getTypeLabel(entry.searchType)}
                                        </span>
                                        
                                        <button
                                            onClick={() => handleDelete(entry)}
                                            className='p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 group/delete'
                                            title="삭제"
                                        >
                                            <Trash className='size-4 group-hover/delete:scale-110 transition-transform duration-200' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Clear all button */}
                {searchHistory.length > 0 && (
                    <div className="text-center mt-12 fade-in-up">
                        <button 
                            onClick={() => {
                                // You could implement a clear all function here
                                toast.info("전체 삭제 기능은 곧 추가될 예정입니다.");
                            }}
                            className="glass-morphism hover:bg-red-500/20 text-red-400 hover:text-red-300 py-3 px-6 rounded-2xl transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                        >
                            전체 기록 삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchHistoryPage;