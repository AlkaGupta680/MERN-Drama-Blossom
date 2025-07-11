import { Link } from 'react-router-dom';
import { useState } from "react";
import { LogOut, Search, Menu, Heart, User } from 'lucide-react';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout, isGuest } = useAuthStore();
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const { setContentType } = useContentStore();
    
    return (
        <header className='max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 relative z-50'>
            <div className='flex items-center gap-10 z-50'>
                <Link to="/" className="group">
                    <div className="flex items-center gap-2">
                        <img 
                            src="/DramaBlossom-logo1.png" 
                            alt="DramaBlossom logo" 
                            className='w-32 sm:w-40 transition-transform duration-300 group-hover:scale-105' 
                        />
                        <Heart className="text-pink-400 heart-beat hidden sm:block" size={20} />
                    </div>
                </Link>

                {/* Desktop navbar items */}
                <div className='hidden sm:flex gap-6 items-center'>
                    <Link 
                        to="/" 
                        className='relative px-4 py-2 text-white hover:text-pink-300 transition-all duration-300 group'
                        onClick={() => setContentType("movie")}
                    >
                        <span className="relative z-10 font-medium">영화 (Movies)</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Link>
                    <Link 
                        to="/" 
                        className='relative px-4 py-2 text-white hover:text-pink-300 transition-all duration-300 group'
                        onClick={() => setContentType("tv")}
                    >
                        <span className="relative z-10 font-medium">드라마 (TV Shows)</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Link>
                    <Link 
                        to="/history" 
                        className='relative px-4 py-2 text-white hover:text-pink-300 transition-all duration-300 group'
                    >
                        <span className="relative z-10 font-medium">검색 기록 (History)</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Link>
                </div>
            </div>

            <div className='flex gap-4 items-center z-50'>
                <Link to={"/search"} className="group">
                    <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 group-hover:scale-110">
                        <Search className='size-5 text-white' />
                    </div>
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                    <button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="relative group"
                    >
                        <img 
                            src={user.image} 
                            alt="Avatar" 
                            className='h-10 w-10 rounded-full cursor-pointer border-2 border-pink-400 hover:border-pink-300 transition-all duration-300 hover:scale-110 object-cover'
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                            isGuest ? 'bg-blue-400' : 'bg-green-400'
                        }`}></div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-64 korean-card rounded-2xl p-4 backdrop-blur-xl border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                                <img 
                                    src={user.image} 
                                    alt="Avatar" 
                                    className='h-12 w-12 rounded-full object-cover border-2 border-pink-400'
                                />
                                <div>
                                    <h3 className="font-bold text-white korean-text">{user.username}</h3>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        isGuest 
                                            ? 'bg-blue-500/20 text-blue-300' 
                                            : 'bg-green-500/20 text-green-300'
                                    }`}>
                                        {isGuest ? '게스트' : '회원'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Link 
                                    to="/dashboard" 
                                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white hover:text-pink-300"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <User size={18} />
                                    <span>대시보드 (Dashboard)</span>
                                </Link>
                                
                                <Link 
                                    to="/history" 
                                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white hover:text-pink-300"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <Search size={18} />
                                    <span>검색 기록 (History)</span>
                                </Link>
                                
                                <button 
                                    onClick={() => {
                                        logout();
                                        setShowUserMenu(false);
                                    }}
                                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 text-white hover:text-red-300"
                                >
                                    <LogOut size={18} />
                                    <span>{isGuest ? '게스트 종료' : '로그아웃'} (Logout)</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className='sm:hidden'>
                    <button 
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                    >
                        <Menu className='size-5 text-white' />
                    </button>
                </div>
            </div>

            {/* Mobile navbar items */}
            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 korean-card rounded-xl p-4 backdrop-blur-xl'>
                    <Link 
                        to={"/"} 
                        className='block hover:text-pink-300 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-white font-medium' 
                        onClick={() => {
                            toggleMobileMenu();
                            setContentType("movie");
                        }}
                    >
                        🎬 영화 (Movies)
                    </Link>
                    <Link 
                        to={"/"} 
                        className='block hover:text-pink-300 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-white font-medium' 
                        onClick={() => {
                            toggleMobileMenu();
                            setContentType("tv");
                        }}
                    >
                        📺 드라마 (TV Shows)
                    </Link>
                    <Link 
                        to={"/history"} 
                        className='block hover:text-pink-300 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-white font-medium' 
                        onClick={toggleMobileMenu}
                    >
                        🔍 검색 기록 (History)
                    </Link>
                    <Link 
                        to={"/dashboard"} 
                        className='block hover:text-pink-300 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-white font-medium' 
                        onClick={toggleMobileMenu}
                    >
                        👤 대시보드 (Dashboard)
                    </Link>
                </div>
            )}

            {/* Click outside to close user menu */}
            {showUserMenu && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                ></div>
            )}
        </header>
    );
};

export default Navbar;