import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Eye, EyeOff, Heart, Mail, Lock, User } from "lucide-react";
import FloatingPetals from "../components/FloatingPetals";

const SignUpPage = () => {
    const { searchParams } = new URL(window.location.href);
    const emailValue = searchParams.get("email");

    const [email, setEmail] = useState(emailValue || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const { signup, isSigningUp } = useAuthStore();
    
    const handleSignUp = (e) => {
        e.preventDefault();
        signup({ email, username, password });
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
                            드라마 세계로! 🌸
                        </h1>
                        <p className="text-pink-200 text-lg">Join the Drama Blossom Family</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                    </div>
                    
                    <form className='space-y-6' onSubmit={handleSignUp}>
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
                                <label htmlFor='username' className='text-sm font-medium text-pink-200 block mb-2 flex items-center gap-2'>
                                    <User size={16} />
                                    사용자명 (Username)
                                </label>
                                <input 
                                    type="text" 
                                    className='w-full px-4 py-4 pl-12 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300 backdrop-blur-sm'
                                    placeholder='드라마러버 (DramaLover)'
                                    id='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <User className="absolute left-4 top-[52px] text-pink-400" size={18} />
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
                            disabled={isSigningUp}
                            className='w-full py-4 btn-primary text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                        >
                            {isSigningUp ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    가입 중...
                                </div>
                            ) : (
                                "회원가입 (Sign Up)"
                            )}
                        </button>
                    </form>
                    
                    <div className='text-center text-gray-300'>
                        <p className="mb-4">이미 계정이 있으신가요?</p>
                        <Link 
                            to={"/login"} 
                            className='text-pink-400 hover:text-pink-300 font-medium hover:underline transition-all duration-300 text-lg'
                        >
                            로그인 (Sign In) →
                        </Link>
                    </div>

                    {/* Terms */}
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            회원가입 시 <span className="text-pink-400">이용약관</span> 및 <span className="text-pink-400">개인정보처리방침</span>에 동의하게 됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;