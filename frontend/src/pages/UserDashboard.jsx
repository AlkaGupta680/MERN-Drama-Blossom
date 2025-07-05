import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import Navbar from "../components/Navbar";
import { User, Mail, Calendar, Shield, Edit3, Save, X, Eye, EyeOff, Heart, Star, Film, Tv } from "lucide-react";
import FloatingPetals from "../components/FloatingPetals";
import toast from "react-hot-toast";

const UserDashboard = () => {
    const { user, isGuest } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [editData, setEditData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({
            username: user?.username || '',
            email: user?.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            username: user?.username || '',
            email: user?.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleSave = () => {
        if (isGuest) {
            toast.error("게스트 사용자는 프로필을 수정할 수 없습니다.");
            return;
        }

        if (editData.newPassword && editData.newPassword !== editData.confirmPassword) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        // Here you would typically make an API call to update the user profile
        toast.success("프로필이 업데이트되었습니다!");
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "정보 없음";
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='bg-black min-h-screen text-white relative'>
            <FloatingPetals />
            <Navbar />

            <div className='max-w-4xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className="text-center mb-12 fade-in-up">
                    <h1 className='text-4xl md:text-6xl font-bold korean-text drama-title mb-4'>
                        👤 사용자 대시보드
                    </h1>
                    <p className="text-xl text-gray-300">User Dashboard</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="drama-card p-6 rounded-2xl text-center fade-in-up">
                            <div className="relative inline-block mb-6">
                                <img 
                                    src={user?.image || '/avatar2.png'} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 mx-auto"
                                />
                                {isGuest && (
                                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                                        <User className="text-white" size={16} />
                                    </div>
                                )}
                            </div>
                            
                            <h2 className="text-2xl font-bold korean-text mb-2">
                                {user?.username}
                            </h2>
                            
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                                isGuest 
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : "bg-green-500/20 text-green-300 border border-green-500/30"
                            }`}>
                                <Shield size={16} />
                                {isGuest ? "게스트 사용자" : "등록된 사용자"}
                            </div>

                            {!isGuest && (
                                <button
                                    onClick={isEditing ? handleCancel : handleEdit}
                                    className={`mt-6 w-full py-3 px-6 rounded-2xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                                        isEditing 
                                            ? "glass-morphism hover:bg-red-500/20 text-red-400 border border-red-500/30"
                                            : "btn-primary"
                                    }`}
                                >
                                    {isEditing ? (
                                        <>
                                            <X size={18} />
                                            취소
                                        </>
                                    ) : (
                                        <>
                                            <Edit3 size={18} />
                                            프로필 수정
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="drama-card p-6 rounded-2xl slide-in-right">
                            <h3 className="text-2xl font-bold korean-text mb-6 flex items-center gap-3">
                                <User className="text-pink-400" size={24} />
                                프로필 정보
                            </h3>

                            <div className="space-y-6">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center gap-2">
                                        <User size={16} />
                                        사용자명 (Username)
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.username}
                                            onChange={(e) => setEditData({...editData, username: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-800/50 rounded-2xl text-white">
                                            {user?.username}
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center gap-2">
                                        <Mail size={16} />
                                        이메일 (Email)
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-800/50 rounded-2xl text-white">
                                            {user?.email}
                                        </div>
                                    )}
                                </div>

                                {/* Password Section - Only for editing */}
                                {isEditing && !isGuest && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-pink-200 mb-2">
                                                현재 비밀번호 (Current Password)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={editData.currentPassword}
                                                    onChange={(e) => setEditData({...editData, currentPassword: e.target.value})}
                                                    className="w-full px-4 py-3 pr-12 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300"
                                                    placeholder="현재 비밀번호를 입력하세요"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-300"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-pink-200 mb-2">
                                                새 비밀번호 (New Password)
                                            </label>
                                            <input
                                                type="password"
                                                value={editData.newPassword}
                                                onChange={(e) => setEditData({...editData, newPassword: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300"
                                                placeholder="새 비밀번호 (선택사항)"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-pink-200 mb-2">
                                                비밀번호 확인 (Confirm Password)
                                            </label>
                                            <input
                                                type="password"
                                                value={editData.confirmPassword}
                                                onChange={(e) => setEditData({...editData, confirmPassword: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-pink-400/30 rounded-2xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:search-glow transition-all duration-300"
                                                placeholder="새 비밀번호 확인"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Join Date */}
                                <div>
                                    <label className="block text-sm font-medium text-pink-200 mb-2 flex items-center gap-2">
                                        <Calendar size={16} />
                                        가입일 (Join Date)
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-800/50 rounded-2xl text-white">
                                        {isGuest ? "게스트 사용자" : formatDate(user?.createdAt)}
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <button
                                        onClick={handleSave}
                                        className="w-full py-3 btn-primary font-medium rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        변경사항 저장
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="drama-card p-6 rounded-2xl text-center fade-in-up">
                        <div className="text-4xl mb-4">❤️</div>
                        <h3 className="text-xl font-bold korean-text mb-2">찜한 드라마</h3>
                        <p className="text-3xl font-bold text-pink-400">0</p>
                        <p className="text-gray-400 text-sm">Favorite Dramas</p>
                    </div>

                    <div className="drama-card p-6 rounded-2xl text-center fade-in-up">
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="text-xl font-bold korean-text mb-2">평가한 작품</h3>
                        <p className="text-3xl font-bold text-yellow-400">0</p>
                        <p className="text-gray-400 text-sm">Rated Content</p>
                    </div>

                    <div className="drama-card p-6 rounded-2xl text-center fade-in-up">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold korean-text mb-2">검색 기록</h3>
                        <p className="text-3xl font-bold text-blue-400">{user?.searchHistory?.length || 0}</p>
                        <p className="text-gray-400 text-sm">Search History</p>
                    </div>
                </div>

                {/* Guest User Notice */}
                {isGuest && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20 text-center fade-in-up">
                        <div className="text-4xl mb-4">🌸</div>
                        <h3 className="text-xl font-bold korean-text mb-2">게스트 사용자 안내</h3>
                        <p className="text-gray-300 mb-4">
                            현재 게스트로 이용 중입니다. 모든 기능을 이용하려면 회원가입을 해주세요!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a 
                                href="/signup" 
                                className="btn-primary px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-300"
                            >
                                회원가입하기
                            </a>
                            <a 
                                href="/login" 
                                className="glass-morphism hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 border border-white/30"
                            >
                                로그인하기
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;