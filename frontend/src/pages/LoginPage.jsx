import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Eye, EyeOff, Heart, Mail, Lock, UserCheck } from "lucide-react";
import FloatingPetals from "../components/FloatingPetals";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loginAsGuest, isLoggingIn } = useAuthStore();
    
    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    const handleGuestLogin = () => {
        loginAsGuest();
    };

    return (
        <div className='min-h-screen w-full hero-bg relative'>
            <FloatingPetals />
            
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 relative z-10'>
                <Link to={"/"} className="group">
                    <div className="flex items-center gap-3">
                        <img src="/DramaBlossom-logo1.png" alt="logo" className='w-52 hover:scale-105 transition-transform duration-300'/>
                        <Heart className="text-pink-400 heart-beat hidden md:block" size={24} />
                    </div>
                </Link>
            </header>
            
            <div className='flex justify-center items-center min-h-[calc(100vh-120px)] mx-3 relative z-10'>
                <div className='w-full max-w-md p-8 space-y-6 korean-card rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20'>
                    <div className="text-center fade-in-up">
                        <h1 className='text-white text-3xl font-bold mb-2 korean-text drama-title'>
                            환영합니다! 👋
                        </h1>
                        <p className="text-pink-200 text-lg">Welcome Back to Drama Blossom</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                    </div>
                    
                    <form className='space-y-6' onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor='email' className='text-sm font-medium text-pink-200 block mb-2 flex items-center gap-2'>
                                    <Mail size={16} />
                                    이메일 (Email)
                                </label>
                                <input 
                                    type="email" 
                                    className='w-full px-4 py-4 pl-12 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300 backdrop-blur-sm'
                                    placeholder='your@email.com'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-4 top-[52px] text-pink-400" size={18} />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor='password' className='text-sm font-medium text-pink-200 block mb-2 flex items-center gap-2'>
                                    <Lock size={16} />
                                    비밀번호 (Password)
                                </label>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className='w-full px-4 py-4 pl-12 pr-12 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300 backdrop-blur-sm'
                                    placeholder='••••••••'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-4 top-[52px] text-pink-400" size={18} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[52px] text-pink-400 hover:text-pink-300 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoggingIn}
                            className='w-full py-4 btn-primary text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                        >
                            {isLoggingIn ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    로그인 중...
                                </div>
                            ) : (
                                "로그인 (Login)"
                            )}
                        </button>
                    </form>

                    {/* Guest Login Option */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black/40 text-gray-400">또는 (or)</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleGuestLogin}
                        disabled={isLoggingIn}
                        className='w-full py-4 glass-morphism hover:bg-white/20 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3'
                    >
                        <UserCheck size={20} />
                        게스트로 계속하기 (Continue as Guest)
                    </button>
                    
                    <div className='text-center text-gray-300'>
                        <p className="mb-4">계정이 없으신가요?</p>
                        <Link 
                            to={"/signup"} 
                            className='text-pink-400 hover:text-pink-300 font-medium hover:underline transition-all duration-300 text-lg'
                        >
                            회원가입 (Sign Up) →
                        </Link>
                    </div>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20">
                        <p className="text-blue-200 text-sm font-medium mb-2">🎭 Demo Account:</p>
                        <p className="text-blue-100 text-xs">Email: Guest@gmail.com</p>
                        <p className="text-blue-100 text-xs">Password: User@123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;