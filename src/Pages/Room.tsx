import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers, joinRoom } = useContext(SocketContext);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [meetingTime, setMeetingTime] = useState(0);

    useEffect(() => {
        if (user && id) {
            console.log("New user with id", user._id, "has joined room", id);
            if (joinRoom) {
                joinRoom(id, user._id);
            } else {
                socket.emit("join-room", { roomId: id, userId: user._id });
            }
        }
    }, [id, user, socket, joinRoom]);

    // Meeting timer
    useEffect(() => {
        const timer = setInterval(() => {
            setMeetingTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const peerCount = Object.keys(peers).length;
    const totalParticipants = peerCount + 1;

    return (
        <div className="h-screen bg-gray-900 flex flex-col">
            {/* Google Meet Style Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                {/* Left side - Meeting info */}
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                            <h1 className="text-white text-lg font-medium">Limgrave Meeting</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>{formatTime(meetingTime)}</span>
                                <span>•</span>
                                <span>
                                    {totalParticipants} participant
                                    {totalParticipants !== 1 ? "s" : ""}
                                </span>
                                <span>•</span>
                                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                                    {id?.slice(0, 8)}...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Header controls */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowParticipants(!showParticipants)}
                        className={`p-2 rounded-lg transition-colors ${
                            showParticipants
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                        }`}
                        title="Show participants"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`p-2 rounded-lg transition-colors ${
                            showChat
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                        }`}
                        title="Show chat"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Grid */}
                <div className="flex-1 p-6">
                    {peerCount === 0 ? (
                        /* Single participant view */
                        <div className="h-full flex items-center justify-center">
                            <div className="relative w-full max-w-4xl aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                                <UserFeedPlayer stream={stream} />
                                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                                    <span className="text-sm font-medium">You</span>
                                </div>
                                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                                    <span className="text-sm">Waiting for others to join...</span>
                                </div>
                            </div>
                        </div>
                    ) : peerCount === 1 ? (
                        /* Two participants view */
                        <div className="h-full grid grid-cols-2 gap-6">
                            <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                                <UserFeedPlayer stream={stream} />
                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                                    <span className="text-sm font-medium">You</span>
                                </div>
                            </div>
                            {Object.entries(peers).map(([peerId, peer]: [string, any]) => (
                                <div
                                    key={peerId}
                                    className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <UserFeedPlayer stream={peer.stream} />
                                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                                        <span className="text-sm font-medium">
                                            User {peerId.slice(-4)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Multiple participants grid */
                        <div className="h-full grid grid-cols-3 gap-4">
                            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                                <UserFeedPlayer stream={stream} />
                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                                    <span className="text-sm font-medium">You</span>
                                </div>
                            </div>
                            {Object.entries(peers).map(([peerId, peer]: [string, any]) => (
                                <div
                                    key={peerId}
                                    className="relative bg-gray-800 rounded-xl overflow-hidden shadow-xl"
                                >
                                    <UserFeedPlayer stream={peer.stream} />
                                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                                        <span className="text-sm font-medium">
                                            User {peerId.slice(-4)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Participants Panel */}
                {showParticipants && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white font-semibold">
                                Participants ({totalParticipants})
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">You</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-white text-sm font-medium">You</div>
                                    <div className="text-gray-400 text-xs">Host</div>
                                </div>
                                <div className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                    Host
                                </div>
                            </div>
                            {Object.keys(peers).map((peerId, index) => (
                                <div
                                    key={peerId}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {(index + 1).toString()}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white text-sm font-medium">
                                            User {peerId.slice(-4)}
                                        </div>
                                        <div className="text-gray-400 text-xs">Participant</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Panel */}
                {showChat && (
                    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white font-semibold">Chat</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="text-center py-12">
                                <svg
                                    className="w-12 h-12 text-gray-600 mx-auto mb-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-gray-400 text-sm">No messages yet</p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Send a message to start the conversation
                                </p>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls Bar - Google Meet Style */}
            <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
                <div className="flex items-center justify-center space-x-6">
                    {/* Microphone */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-4 rounded-full transition-all duration-200 ${
                            isMuted
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                                : "bg-gray-600 hover:bg-gray-500 text-white"
                        }`}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            {isMuted ? (
                                <path
                                    fillRule="evenodd"
                                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0L18.485 7.757a1 1 0 010 1.414L16.071 10.585a1 1 0 11-1.414-1.414L15.243 8.586l-.586-.586a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                    clipRule="evenodd"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Camera */}
                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-4 rounded-full transition-all duration-200 ${
                            isVideoOff
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                                : "bg-gray-600 hover:bg-gray-500 text-white"
                        }`}
                        title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            {isVideoOff ? (
                                <path
                                    fillRule="evenodd"
                                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A2 2 0 0018 13V7a2 2 0 00-3.53-1.235L12 8.236V6a2 2 0 00-2-2H7.414l-4.121-4.121A1 1 0 002 2zm9.586 5L8 12.586V10a2 2 0 012-2h2.586z"
                                    clipRule="evenodd"
                                />
                            ) : (
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            )}
                        </svg>
                    </button>

                    {/* Share Screen */}
                    <button
                        className="p-4 bg-gray-600 hover:bg-gray-500 text-white rounded-full transition-all duration-200 hover:shadow-lg"
                        title="Share screen"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v4a1 1 0 01-2 0V6H5v8h4a1 1 0 110 2H4a1 1 0 01-1-1V4zm9.707 4.293a1 1 0 00-1.414 1.414L13.586 12H10a1 1 0 100 2h6a1 1 0 001-1V7a1 1 0 10-2 0v2.586l-2.293-2.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* More Options */}
                    <button
                        className="p-4 bg-gray-600 hover:bg-gray-500 text-white rounded-full transition-all duration-200 hover:shadow-lg"
                        title="More options"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>

                    {/* End Call */}
                    <button
                        className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 hover:shadow-lg ml-4"
                        title="End call"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
