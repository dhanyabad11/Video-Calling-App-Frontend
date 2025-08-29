import { useEffect, useRef } from "react";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={true}
                autoPlay
                playsInline
            />
            {!stream && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                            <svg
                                className="w-8 h-8 text-slate-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-sm font-medium">Camera off</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFeedPlayer;
