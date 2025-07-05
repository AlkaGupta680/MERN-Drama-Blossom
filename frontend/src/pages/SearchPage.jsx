import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search, Film, Tv, User, Star, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import FloatingPetals from "../components/FloatingPetals";

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { setContentType } = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setIsSearching(true);
        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(res.data.content);
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("검색 결과가 없습니다. 다른 카테고리에서 검색해보세요.");
            } else {
                toast.error("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const getTabIcon = (tab) => {
        switch(tab) {
            case 'movie': return <Film size={20} />;
            case 'tv': return <Tv size={20} />;
            case 'person': return <User size={20} />;
            default: return <Search size={20} />;
        }
    };

    const getTabLabel = (tab) => {
        switch(tab) {
            case 'movie': return '🎬 영화 (Movies)';
            case 'tv': return '📺 드라마 (TV Shows)';
            case 'person': return '👤 인물 (Person)';
            default: return tab;
        }
    };

    return (
        <div className='bg-black min-h-screen text-white relative'>
            <FloatingPetals />
            <Navbar />
            
            <div className='container mx-auto px-4 py-8 relative z-10'>
                {/* Header */}
                <div className="text-center mb-12 fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold korean-text drama-title mb-4">
                        🔍 드라마 검색
                    </h1>
                    <p className="text-xl text-gray-300">Find Your Next Favorite K-Drama</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                </div>

                {/* Search tabs */}
                <div className='flex justify-center gap-2 mb-8 slide-in-left'>
                    {['movie', 'tv', 'person'].map((tab) => (
                        <button
                            key={tab}
                            className={`py-3 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                                activeTab === tab 
                                    ? "btn-primary shadow-lg scale-105" 
                                    : "glass-morphism hover:bg-white/10 border border-white/20"
                            }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {getTabIcon(tab)}
                            <span className="hidden sm:inline">{getTabLabel(tab)}</span>
                        </button>
                    ))}
                </div>

                {/* Search form */}
                <form className='flex gap-4 items-stretch mb-12 max-w-3xl mx-auto slide-in-right' onSubmit={handleSearch}>
                    <div className="relative flex-1">
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`${getTabLabel(activeTab)} 검색...`}
                            className='w-full p-4 pl-12 rounded-2xl bg-black/60 border-2 border-pink-400/30 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:search-glow transition-all duration-300 backdrop-blur-sm'
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                    </div>
                    <button 
                        type="submit"
                        disabled={isSearching}
                        className='btn-primary px-8 py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSearching ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Search className='size-6' />
                        )}
                    </button>
                </form>

                {/* Search results */}
                {results.length > 0 && (
                    <div className="fade-in-up">
                        <h2 className="text-2xl font-bold mb-6 text-center korean-text">
                            검색 결과 ({results.length}개)
                        </h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                            {results.map((result) => {
                                if (!result.poster_path && !result.profile_path) return null;

                                return (
                                    <div key={result.id} className='drama-card p-4 rounded-2xl hover-lift group'>
                                        {activeTab === "person" ? (
                                            <div className='flex flex-col items-center text-center'>
                                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                                    <img
                                                        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                                                        alt={result.name}
                                                        className='w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110'
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                <h2 className='text-xl font-bold korean-text text-pink-200 group-hover:text-pink-100 transition-colors duration-300'>
                                                    {result.name}
                                                </h2>
                                                {result.known_for_department && (
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {result.known_for_department}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                to={"/watch/" + result.id}
                                                onClick={() => setContentType(activeTab)}
                                                className="block"
                                            >
                                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                                    <img
                                                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                                                        alt={result.title || result.name}
                                                        className='w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110'
                                                    />
                                                    
                                                    {/* Rating badge */}
                                                    {result.vote_average > 0 && (
                                                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                                            <Star className="text-yellow-400 fill-current" size={14} />
                                                            <span className="text-white text-sm font-medium">
                                                                {result.vote_average.toFixed(1)}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Year badge */}
                                                    {(result.release_date || result.first_air_date) && (
                                                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            <span className="text-white text-sm">
                                                                {(result.release_date || result.first_air_date).split('-')[0]}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                
                                                <h2 className='text-lg font-bold korean-text text-white group-hover:text-pink-300 transition-colors duration-300 line-clamp-2'>
                                                    {result.title || result.name}
                                                </h2>
                                                
                                                {result.overview && (
                                                    <p className="text-gray-400 text-sm mt-2 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                                                        {result.overview.slice(0, 100)}...
                                                    </p>
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* No results message */}
                {searchTerm && results.length === 0 && !isSearching && (
                    <div className="text-center py-20 fade-in-up">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-2xl font-bold korean-text mb-2">검색 결과가 없습니다</h3>
                        <p className="text-gray-400">다른 검색어나 카테고리를 시도해보세요.</p>
                    </div>
                )}

                {/* Initial state */}
                {!searchTerm && results.length === 0 && (
                    <div className="text-center py-20 fade-in-up">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold korean-text mb-2">드라마를 검색해보세요</h3>
                        <p className="text-gray-400">좋아하는 K-드라마나 영화를 찾아보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;