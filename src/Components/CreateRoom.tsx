import { useContext, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { useNavigate } from "react-router-dom";

const CreateRoom: React.FC = () => {
    const socketData = useContext(SocketContext);
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    if (!socketData) {
        return <div>Loading...</div>;
    }

    const { socket } = socketData;

    const initRoom = () => {
        setIsCreating(true);
        socket.emit("create-room");

        socket.once("room-created", (data: { roomId: string }) => {
            setIsCreating(false);
            if (data.roomId) {
                navigate(`/room/${data.roomId}`);
            }
        });
    };

    const handleJoinMeeting = () => {
        if (meetingCode.trim()) {
            navigate(`/room/${meetingCode.trim()}`);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-normal text-white mb-3">Limgrave</h1>
                <p className="text-slate-400 text-base">
                    Premium video meetings. Now free for everyone.
                </p>
            </div>

            {/* Main Actions */}
            <div className="space-y-6">
                {/* New Meeting */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">New meeting</h3>
                            <p className="text-slate-400 text-sm mb-4">Start an instant meeting</p>
                            <button
                                onClick={initRoom}
                                disabled={isCreating}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2"
                            >
                                {isCreating ? (
                                    <>
                                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span>Start meeting</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Join Meeting */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-slate-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-1">Join a meeting</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                By meeting link or meeting ID
                            </p>
                            <div className="flex space-x-3">
                                <input
                                    type="text"
                                    value={meetingCode}
                                    onChange={(e) => setMeetingCode(e.target.value)}
                                    placeholder="Enter a code or link"
                                    className="flex-1 bg-slate-700 border border-slate-600 rounded-md px-3 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyPress={(e) => e.key === "Enter" && handleJoinMeeting()}
                                />
                                <button
                                    onClick={handleJoinMeeting}
                                    disabled={!meetingCode.trim()}
                                    className="bg-transparent border border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 px-4 py-2.5 rounded-md font-medium transition-colors duration-200"
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center">
                    <div className="flex-1 border-t border-slate-700"></div>
                    <span className="px-4 text-slate-500 text-sm">or</span>
                    <div className="flex-1 border-t border-slate-700"></div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                    <button className="w-full text-left bg-slate-800 hover:bg-slate-750 rounded-lg p-4 border border-slate-700 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-slate-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Schedule a meeting</h4>
                                <p className="text-slate-400 text-sm">
                                    Plan your meeting for later
                                </p>
                            </div>
                        </div>
                    </button>

                    <button className="w-full text-left bg-slate-800 hover:bg-slate-750 rounded-lg p-4 border border-slate-700 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-slate-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Settings</h4>
                                <p className="text-slate-400 text-sm">Configure audio and video</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
