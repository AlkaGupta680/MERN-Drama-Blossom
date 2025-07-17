@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

* {
  font-family: 'Noto Sans KR', sans-serif;
}

.hero-bg {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.8) 50%, rgba(0, 0, 0, 0.9) 100%), 
              url("/hero1.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Netflix-like styling */
.netflix-red {
  background: #e50914;
}

.netflix-dark {
  background: #141414;
}

.netflix-card {
  background: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #2c2c2c 4%, #444 25%, #2c2c2c 36%);
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

                                    {/* Korean-style info overlay */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transform transition-all duration-500 ${
                                        hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                    }`}>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-pink-300 text-sm mb-2">
                                                <Calendar size={14} />
                                                <span>{item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'TBA'}</span>
                                            </div>
                                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-4 py-1 text-white text-xs font-medium inline-block">
                                                🔒 로그인하여 시청하기
                                            </div>
  background: radial-gradient(circle, #ffc2e0 0%, #ff9ec7 50%, transparent 70%);
  border-radius: 50% 0 50% 0;
  animation: fall linear infinite;
  opacity: 0.7;
}

                                <h3 className='text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-500 drama-title line-clamp-2'>
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2 group-hover:text-pink-200 transition-colors duration-500">
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.korean-card {
  background: rgba(20, 20, 20, 0.9);
                            className='min-w-[280px] relative group hover-lift drama-blossom-card' 
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

                            <div className='korean-drama-card rounded-3xl overflow-hidden relative border-2 border-transparent group-hover:border-pink-400/50 transition-all duration-500'>
                                <div className="relative overflow-hidden rounded-3xl">
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
                                        className='w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110'
}

                                    {/* Korean-style gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  border-color: rgba(255, 255, 255, 0.3);
                                    {/* Elegant play button on hover */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-pink-400/30 text-center">
                                            <Lock className="text-pink-400 mx-auto mb-2" size={32} />
                                        <div className="bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-xl rounded-full p-6 cursor-pointer transition-all duration-500 hover:scale-110 border border-white/30 shadow-2xl">
                                            <Play className="text-white fill-white" size={36} />
                                        </div>
}

                                    {/* Floating heart icon */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 border border-pink-400/30">
                                            <Heart className="text-pink-400 hover:text-pink-300 cursor-pointer hover:scale-125 transition-transform duration-300 hover:fill-current" size={20} />
                                        </div>

.hover-lift:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 107, 157, 0.3);
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">

.korean-text {
  font-family: 'Playfair Display', serif;
  background: linear-gradient(135deg, #ff6b9d 0%, #f8b500 50%, #c44569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
                                    {/* Korean-style info overlay */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transform transition-all duration-500 ${
.glow-effect {
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.5), 0 0 40px rgba(255, 107, 157, 0.3);
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-pink-300 text-sm mb-2">
                                                <Calendar size={14} />
                                                <span>{item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'TBA'}</span>
                                            </div>
                                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-4 py-1 text-white text-xs font-medium inline-block">
                                                ▶️ 지금 시청하기
                                            </div>

@keyframes pulseGlow {
  from {
    box-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
  }
  to {
                                <h3 className='text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-500 drama-title line-clamp-2'>
  }
}

                                    <p className="text-gray-400 text-sm mt-2 line-clamp-2 group-hover:text-pink-200 transition-colors duration-500">
  background: radial-gradient(
    ellipse at center,
    rgba(255, 107, 157, 0.3) 0,
    rgba(196, 69, 105, 0.2) 45%,
    rgba(139, 69, 19, 0.1) 55%,
                    )
  );
  bottom: -10vw;
  content: "";
  left: 10vw;
  position: absolute;
  right: 10vw;
  top: -10vw;
                        size-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                        text-white z-10 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-pink-500/50 border border-white/20 backdrop-blur-sm'

::-webkit-scrollbar {
                        <ChevronLeft size={32} />
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
                        size-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                        text-white z-10 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-pink-500/50 border border-white/20 backdrop-blur-sm'
}

                        <ChevronRight size={32} />
  background: #1a1a1a;
  border-radius: 6px;
}

.search-glow {
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 157, 0.4);
}

.korean-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(196, 69, 105, 0.1) 0%, transparent 50%);
  background-size: 100px 100px;
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.heart-beat {
  animation: heartBeat 1.5s ease-in-out infinite;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.1); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
}

.text-shadow-korean {
  text-shadow: 2px 2px 4px rgba(255, 107, 157, 0.3);
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.drama-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* New animations for the modern cinema experience */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
  }
  to {
    box-shadow: 0 0 40px rgba(255, 107, 157, 0.8), 0 0 60px rgba(255, 107, 157, 0.4);
  }
}

/* Cinema screen effect */
.cinema-screen {
  position: relative;
  overflow: hidden;
}

.cinema-screen::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: screenReflection 3s ease-in-out infinite;
}

@keyframes screenReflection {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}