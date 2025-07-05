import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Heart, Star, Play, UserCheck } from "lucide-react";
import FloatingPetals from "../../components/FloatingPetals";
import { useAuthStore } from "../../store/authUser";

const AuthScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { loginAsGuest } = useAuthStore();
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate("/signup?email=" + email);
    };

    const handleGuestAccess = () => {
        loginAsGuest();
        navigate("/");
    };

    return (
        <div className='hero-bg relative min-h-screen'>
            <FloatingPetals />
            
            {/* Navbar */}
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10 relative z-10'>
                <div className="flex items-center gap-3">
                    <img src="/DramaBlossom-logo1.png" alt="Drama Blossom logo" className='w-32 md:w-52 hover:scale-105 transition-transform duration-300'/>
                    <Heart className="text-pink-400 heart-beat hidden md:block" size={24} />
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleGuestAccess}
                        className='glass-morphism hover:bg-white/20 text-white py-3 px-6 rounded-full font-medium hover:scale-105 transition-all duration-300 border border-white/30 flex items-center gap-2'
                    >
                        <UserCheck size={18} />
                        게스트 (Guest)
                    </button>
                    <Link 
                        to={"/login"} 
                        className='btn-primary text-white py-3 px-6 rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-lg'
                    >
                        로그인 (Sign In)
                    </Link>
                </div>
            </header>

            {/* Hero section */}
            <div className='flex flex-col items-center justify-center text-center py-20 md:py-40 text-white max-w-6xl mx-auto relative z-10 px-4'>
                <div className="fade-in-up">
                    <h1 className='text-4xl md:text-7xl font-bold mb-6 korean-text drama-title text-shadow-korean'>
                        무제한 드라마의 세계
                    </h1>
                    <h2 className='text-2xl md:text-4xl font-semibold mb-4 text-pink-200'>
                        Unlimited K-Drama Universe
                    </h2>
                    <p className='text-lg md:text-xl mb-4 text-gray-200 max-w-2xl mx-auto leading-relaxed'>
                        한국 드라마와 영화의 감동을 언제 어디서나 경험하세요
                    </p>
                    <p className='text-base md:text-lg mb-8 text-gray-300 max-w-xl mx-auto'>
                        Watch anywhere. Cancel anytime. Experience the magic of Korean entertainment.
                    </p>
                </div>

                <div className="slide-in-right">
                    <form className='flex flex-col md:flex-row gap-4 w-full max-w-2xl mb-6' onSubmit={handleFormSubmit}>
                        <div className="relative flex-1">
                            <input 
                                type='email'
                                placeholder='이메일 주소 (Email address)'
                                className='w-full p-4 rounded-2xl bg-black/60 border-2 border-pink-400/30 text-white placeholder-gray-300 focus:border-pink-400 focus:outline-none focus:search-glow transition-all duration-300 backdrop-blur-sm'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <button className='btn-primary text-xl lg:text-2xl px-8 lg:px-10 py-4 rounded-2xl flex justify-center items-center gap-3 font-semibold shadow-xl hover:shadow-pink-500/25 transition-all duration-300'>
                            <Play className='size-6' />
                            시작하기 (Get Started)
                            <ChevronRight className='size-6' />
                        </button>
                    </form>

                    {/* Guest Access Button */}
                    <div className="text-center">
                        <p className="text-gray-300 mb-4">또는 (or)</p>
                        <button
                            onClick={handleGuestAccess}
                            className='glass-morphism hover:bg-white/20 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-white/30 flex items-center justify-center gap-3 mx-auto'
                        >
                            <UserCheck size={20} />
                            게스트로 둘러보기 (Browse as Guest)
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-16 fade-in-up">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold korean-text">1000+</div>
                        <div className="text-sm md:text-base text-gray-300">K-Dramas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold korean-text">500+</div>
                        <div className="text-sm md:text-base text-gray-300">Movies</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold korean-text">24/7</div>
                        <div className="text-sm md:text-base text-gray-300">Streaming</div>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className='h-2 w-full bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500' aria-hidden='true'/>

            {/* K-Drama Showcase Section */}
            <div className='py-20 bg-black text-white korean-pattern'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 gap-12'>
                    {/* Left side */}
                    <div className='flex-1 text-center md:text-left slide-in-left'>
                        <h2 className='text-4xl md:text-6xl font-extrabold mb-6 korean-text drama-title'>
                            🌸 K-드라마의 마법
                        </h2>
                        <h3 className='text-2xl md:text-3xl font-semibold mb-4 text-pink-200'>
                            Experience the Magic of K-Drama
                        </h3>
                        <p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-6'>
                            사랑, 우정, 가족의 이야기부터 스릴러, 판타지까지
                            다양한 장르의 한국 드라마를 만나보세요.
                        </p>
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                <span className="text-gray-300">로맨스 (Romance) 💕</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-gray-300">스릴러 (Thriller) 🔥</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-gray-300">판타지 (Fantasy) ✨</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-gray-300">코미디 (Comedy) 😄</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                            <Star className="text-yellow-400 fill-current" />
                            <span className="text-yellow-400 font-semibold">4.9/5 Rating</span>
                        </div>
                    </div>
                    
                    {/* Right side - K-Drama Video Showcase */}
                    <div className='flex-1 relative slide-in-right'>
                        <div className="relative hover-lift">
                            {/* Main video container with Korean drama aesthetic */}
                            <div className="relative bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-3xl p-6 backdrop-blur-sm border border-pink-400/20">
                                {/* Video player mockup */}
                                <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                                    <video
                                        className='w-full h-64 md:h-80 object-cover rounded-2xl'
                                        playsInline
                                        autoPlay={true}
                                        muted
                                        loop                       
                                    >
                                        <source src='/hero-vid.mp4' type='video/mp4'/>
                                    </video>
                                    
                                    {/* Video overlay with K-drama info */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-pink-500/90 hover:bg-pink-500 rounded-full p-4 cursor-pointer transition-all duration-300 hover:scale-110 pulse-glow">
                                            <Play className="text-white fill-white" size={32} />
                                        </div>
                                    </div>
                                    
                                    {/* Drama info overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="korean-card rounded-xl p-4 backdrop-blur-xl">
                                            <h4 className="text-white font-bold korean-text text-lg mb-1">
                                                사내맞선 (Business Proposal)
                                            </h4>
                                            <p className="text-pink-200 text-sm mb-2">
                                                로맨틱 코미디 • 2022 • ⭐ 9.2
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-1">
                                                    <div className="w-6 h-6 bg-pink-400 rounded-full border-2 border-white"></div>
                                                    <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                                                    <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                                                </div>
                                                <span className="text-gray-300 text-xs">+2.5M viewers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Floating elements */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3 animate-bounce">
                                    <Heart className="text-white fill-white" size={20} />
                                </div>
                                
                                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 animate-pulse">
                                    <Star className="text-white fill-white" size={20} />
                                </div>
                            </div>
                            
                            {/* Background glow effect */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
                        </div>
                        
                        {/* Popular dramas showcase */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="korean-card rounded-xl p-3 text-center hover-lift">
                                <div className="text-2xl mb-2">👑</div>
                                <p className="text-xs text-gray-300">사랑의 불시착</p>
                                <p className="text-xs text-pink-400">Crash Landing</p>
                            </div>
                            <div className="korean-card rounded-xl p-3 text-center hover-lift">
                                <div className="text-2xl mb-2">🔥</div>
                                <p className="text-xs text-gray-300">오징어 게임</p>
                                <p className="text-xs text-pink-400">Squid Game</p>
                            </div>
                            <div className="korean-card rounded-xl p-3 text-center hover-lift">
                                <div className="text-2xl mb-2">💎</div>
                                <p className="text-xs text-gray-300">킹덤</p>
                                <p className="text-xs text-pink-400">Kingdom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className='h-2 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600' aria-hidden='true'/>

            {/* Second section */}
            <div className='py-20 bg-black text-white korean-pattern'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2 gap-12'>
                    {/* Left side */}
                    <div className='flex-1 relative slide-in-left'>
                        <div className='relative hover-lift'>
                            <div className='relative'>
                                <img 
                                    src="/business-proposal.png" 
                                    alt="Business Proposal image" 
                                    className='mt-4 w-52 md:w-64 lg:w-80 h-auto mx-auto rounded-2xl shadow-2xl'
                                />

                                <div className='flex items-center gap-3 absolute bottom-5 left-1/2 -translate-x-1/2 korean-card w-3/4 lg:w-1/2 h-24 rounded-2xl px-4 backdrop-blur-xl'>
                                    <img src="/business-proposal-sm.png" alt="image" className='h-16 w-12 rounded-lg object-cover'/>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm lg:text-base font-bold text-white'>사내맞선</span>
                                            <span className='text-xs lg:text-sm text-pink-400 font-medium'>Business Proposal</span>
                                            <span className='text-xs text-blue-400'>다운로드 중...</span>
                                        </div>
                                        <img src="/download-icon.gif" alt="" className='h-10 w-10'/>
                                    </div>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-20 blur-xl"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side */}
                    <div className='flex-1 md:text-left text-center slide-in-right'>
                        <h2 className='text-4xl md:text-6xl font-extrabold mb-6 korean-text drama-title'>
                            📱 오프라인 시청
                        </h2>
                        <h3 className='text-2xl md:text-3xl font-semibold mb-4 text-pink-200'>
                            Download & Watch Offline
                        </h3>
                        <p className='text-lg md:text-xl text-gray-300 leading-relaxed'>
                            좋아하는 드라마를 다운로드해서 언제 어디서나 
                            인터넷 없이도 감상할 수 있습니다.
                        </p>
                        <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white"></div>
                                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                            </div>
                            <span className="text-gray-300">1M+ Happy Viewers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;