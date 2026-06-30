import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const titles = ["Junior .NET Developer", "Full Stack Enthusiast", "React Developer"];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // 🛠️ PERFECTED TYPEWRITER ANIMATION LOGIC (FIXES ESLINT ERROR)
    useEffect(() => {
        const currentFullText = titles[currentTitleIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                // টাইপিং অ্যানিমেশন লজিক
                if (displayedText.length < currentFullText.length) {
                    setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
                } else {
                    // টাইপিং শেষ হলে ১.৫ সেকেন্ড হোল্ড করবে, তারপর কাটা শুরু করবে
                    setIsDeleting(true);
                }
            } else {
                // ডিলিটিং বা কাটার অ্যানিমেশন লজিক
                if (displayedText.length > 0) {
                    setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
                } else {
                    // কাটা শেষ হলে সুরক্ষিতভাবে স্টেট পরিবর্তন হবে (টাইমআউটের ভেতরে)
                    setIsDeleting(false);
                    setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, isDeleting ? 50 : 100); // টাইপ হওয়ার স্পিড ১০০ms, কাটার স্পিড ৫০ms

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentTitleIndex]);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 text-white font-sans flex flex-col justify-between overflow-x-hidden selection:bg-blue-500/30">

            {/* 1. MODERN NAVBAR */}
            <nav className="w-full backdrop-blur-md bg-slate-900/40 border-b border-slate-800/60 sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    {/* Logo with Glow */}
                    <div className="flex items-center gap-2 group">
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                            S<span className="text-white text-2xl font-light">R</span>
                        </span>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>

                    {/* Nav Links & CTA */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors hidden sm:block">Home</Link>
                        <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">Sign In</Link>
                        <Link
                            to="/signup"
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Join Network 🚀
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 2. HERO SECTION / HEADER */}
            <main className="max-w-7xl w-full mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 flex-grow">

                {/* Left Side Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider animate-bounce">
                        ⚡ Welcome to my portfolio hub
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                        Hi, I'm <br className="hidden lg:block" />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Sakib Raihan
                        </span>
                    </h1>

                    {/* Typewriter text wrapper */}
                    <div className="text-xl sm:text-2xl font-bold text-slate-300 min-h-[40px] flex items-center justify-center lg:justify-start">
                        <span className="border-r-2 border-blue-500 pr-1 animate-pulse text-blue-400">
                            {displayedText}
                        </span>
                    </div>

                    <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Crafting robust backend architectures with .NET Core and blending them with fluid, user-centric interfaces in React. Let's manage connections beautifully.
                    </p>

                    {/* Buttons with Modern Shadow */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                        <Link
                            to="/login"
                            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            Explore Dashboard 🖥️
                        </Link>
                        <a
                            href=""
                            rel="noreferrer"
                            className="px-8 py-3.5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                        >
                            Test API Endpoint 🔗
                        </a>
                    </div>
                </div>

                {/* Right Side Image Block with Glow & Floating Animation */}
                <div className="flex-1 flex justify-center relative group">
                    {/* Decorative Background Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>

                    {/* Image Container with Floating Animation */}
                    <div className="relative border-4 border-slate-800/80 rounded-3xl p-3 bg-slate-900/60 backdrop-blur-md shadow-2xl overflow-hidden max-w-[320px] sm:max-w-[360px] transform hover:scale-[1.02] transition-all duration-500 animate-[float_6s_ease-in-out_infinite]">
                        <img
                            src="/src/assets/file.jpg"
                            alt="Sakib Raihan"
                            className="w-full h-auto rounded-2xl object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            onError={(e) => {
                                e.target.src = "https://scontent.fdac191-1.fna.fbcdn.net/v/t39.30808-6/631228280_122248924454088472_6166347434179062907_n.jpg?stp=dst-jpg_tt6&cstp=mx1194x1184&ctp=s1194x1184&_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHBZ-9KtyoU0yvvJKQA0fWFinFZZEj55rKKcVlkSPnmshMihsKL6m7ILd599cZfYvjlDuOWkfuGxNdlF5AU1pVH&_nc_ohc=M0ND9-rU4nYQ7kNvwGk7AeJ&_nc_oc=AdqfH_F18TnSii_zrhasESzk4jxZCAzIbyQc2tfk3y8KR9prhriF6ZOZOrv67kMAwMw&_nc_zt=23&_nc_ht=scontent.fdac191-1.fna&_nc_gid=6C6vzkLHlgE9s4pT9xTRGw&_nc_ss=7b2a8&oh=00_AQD6wMboP_oVxzRerw3DMlAWxIY0u7Rst5Ul1oit74i2CA&oe=6A497FB3";
                            }}
                        />

                        {/* Tech Stack Floating Badge */}
                        <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex justify-around text-center">
                            <div>
                                <span className="text-xs text-slate-400 block">Backend</span>
                                <span className="text-xs font-bold text-blue-400">.NET Core</span>
                            </div>
                            <div className="border-r border-slate-800"></div>
                            <div>
                                <span className="text-xs text-slate-400 block">Frontend</span>
                                <span className="text-xs font-bold text-indigo-400">React & TW</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. SHUNDOR FOOTER */}
            <footer className="w-full bg-slate-950/80 border-t border-slate-900 px-6 py-6 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="text-xs text-slate-500">
                        © 2026 <span className="text-slate-400 font-medium">Sakib Raihan</span>. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-slate-400">
                        <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
                        <span>•</span>
                        <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </footer>

            {/* Tailwind Float Custom Keyframe Insertion using JSX Style block */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
            `}</style>
        </div>
    );
}