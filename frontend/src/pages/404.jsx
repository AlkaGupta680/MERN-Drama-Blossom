import { Link } from "react-router-dom";
import { Home, Search, Heart } from "lucide-react";
import FloatingPetals from "../components/FloatingPetals";

const NotFoundPage = () => {
    return (
        <div className='min-h-screen bg-black text-white relative overflow-hidden'>
            <FloatingPetals />
            
            {/* Background pattern */}
            <div className="absolute inset-0 korean-pattern opacity-30"></div>
            
            <header className='absolute top-0 left-0 p-6 w-full z-10'>
                <Link to={"/"} className="group">
                    <div className="flex items-center gap-3">
                        <img src='/DramaBlossom-logo1.png' alt='Drama Blossom' className='h-16 hover:scale-105 transition-transform duration-300' />
                        <Heart className="text-pink-400 heart-beat" size={24} />
                    </div>
                </Link>
            </header>
            
            <main className='flex flex-col items-center justify-center min-h-screen text-center error-page--content z-10 px-4'>
                <div className="fade-in-up">
                    {/* 404 Number */}
                    <div className="text-8xl md:text-9xl font-bold korean-text mb-8 relative">
                        4<span className="text-pink-400">0</span>4
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-20 blur-3xl"></div>
                    </div>
                    
                    {/* Korean Title */}
                    <h1 className='text-4xl md:text-6xl font-bold mb-4 korean-text drama-title'>
                        길을 잃으셨나요? 🌸
                    </h1>
                    
                    {/* English Title */}
                    <h2 className='text-2xl md:text-3xl font-semibold mb-6 text-pink-200'>
                        Lost in the Drama Universe?
                    </h2>
                    
                    {/* Description */}
                    <p className='mb-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
                        죄송합니다. 찾으시는 페이지를 찾을 수 없습니다.<br />
                        홈페이지에서 다양한 드라마를 탐험해보세요!
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            to={"/"} 
                            className='btn-primary py-4 px-8 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 text-lg'
                        >
                            <Home size={24} />
                            드라마 홈으로 (Drama Home)
                        </Link>
                        
                        <Link 
                            to={"/search"} 
                            className='glass-morphism hover:bg-white/20 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-white/30 flex items-center gap-3 text-lg'
                        >
                            <Search size={24} />
                            드라마 검색 (Search)
                        </Link>
                    </div>
                    
                    {/* Fun fact */}
                    <div className="mt-12 p-6 korean-card rounded-2xl max-w-md mx-auto">
                        <div className="text-3xl mb-2">💡</div>
                        <p className="text-sm text-gray-300">
                            <strong className="text-pink-400">재미있는 사실:</strong><br />
                            404 오류는 1990년대부터 사용되기 시작했어요!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFoundPage;