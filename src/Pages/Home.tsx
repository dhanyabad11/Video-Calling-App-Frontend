import CreateRoom from "../Components/CreateRoom";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900" data-theme="dark">
            <div className="hero min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-6xl font-light text-white mb-6">
                            Video meetings with
                            <br />
                            <span className="text-blue-400 font-medium">Limgrave</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                            Connect, collaborate and celebrate from anywhere with secure video
                            conferencing
                        </p>
                        <CreateRoom />

                        {/* Feature cards with dark theme */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl">
                            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:bg-slate-800/80 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        className="w-6 h-6 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    Secure and reliable
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Built with security and privacy in mind, keeping your
                                    conversations protected
                                </p>
                            </div>
                            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:bg-slate-800/80 transition-all duration-300">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        className="w-6 h-6 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    Fast and easy
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Start a meeting in seconds, no downloads or complicated setup
                                    required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
