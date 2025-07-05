import { Heart, Github, Mail, Star } from "lucide-react";

const Footer = () => {
    return (
        <footer className='py-12 bg-black text-white border-t border-pink-500/20 korean-pattern relative'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='flex flex-col items-center justify-center gap-6'>
                    {/* Logo and tagline */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <img src="/DramaBlossom-logo1.png" alt="Drama Blossom" className="h-12" />
                            <Heart className="text-pink-400 heart-beat" size={24} />
                        </div>
                        <p className="text-pink-200 font-medium korean-text">
                            드라마의 꽃이 피어나는 곳 🌸
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-2xl font-bold korean-text text-pink-400">1000+</div>
                            <div className="text-sm text-gray-400">K-Dramas</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold korean-text text-purple-400">500+</div>
                            <div className="text-sm text-gray-400">Movies</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold korean-text text-blue-400">24/7</div>
                            <div className="text-sm text-gray-400">Streaming</div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href='https://github.com/AlkaGupta680'
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform'
                        >
                            <Github size={20} />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                        
                        <a
                            href='mailto:Guest@gmail.com'
                            className='flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform'
                        >
                            <Mail size={20} />
                            <span className="hidden sm:inline">Contact</span>
                        </a>
                        
                        <div className='flex items-center gap-2 text-gray-400'>
                            <Star className="text-yellow-400 fill-current" size={20} />
                            <span className="hidden sm:inline">4.9/5 Rating</span>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center border-t border-gray-800 pt-6 w-full">
                        <p className='text-sm text-gray-400 leading-relaxed'>
                            Made with <Heart className="inline text-pink-400 mx-1" size={16} /> by{" "}
                            <a
                                href='https://github.com/AlkaGupta680'
                                target='_blank'
                                rel='noreferrer'
                                className='font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300'
                            >
                                Alka Gupta
                            </a>
                            <br />
                            © 2025 Drama Blossom. All rights reserved.
                        </p>
                        
                        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                            <span>Privacy Policy</span>
                            <span>•</span>
                            <span>Terms of Service</span>
                            <span>•</span>
                            <span>이용약관</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;