import CreateRoom from "../Components/CreateRoom";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50" data-theme="light">
            <div className="hero min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-6xl font-light text-slate-800 mb-6">
                            Video meetings with
                            <br />
                            <span className="text-blue-600 font-medium">VideoConnect</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 font-light leading-relaxed">
                            Connect, collaborate and celebrate from anywhere with secure video conferencing
                        </p>
                        <CreateRoom />
                        
                        {/* Feature cards with better colors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl">
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-lg hover:bg-white/80 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-slate-800 mb-2">Secure and reliable</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Built with security and privacy in mind, keeping your conversations protected</p>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 p-6 hover:shadow-lg hover:bg-white/80 transition-all duration-300">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-slate-800 mb-2">Fast and easy</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Start a meeting in seconds, no downloads or complicated setup required</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
