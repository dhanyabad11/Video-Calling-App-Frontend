import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        // emitting this event so that either creator of room or joinee in the room
        // anyone is added the server knows that new people have been added\
        // to this room
        if (user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", { roomId: id, peerId: user._id });
        }
    }, [id, user, socket]);

    return (
        <div className="min-h-screen bg-slate-900" data-theme="light">
            {/* Modern header */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-slate-700 font-medium text-sm">{id}</span>
                        </div>
                        <div className="text-slate-500 text-sm">
                            {Object.keys(peers).length + 1} participant
                            {Object.keys(peers).length !== 0 ? "s" : ""}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <svg
                                className="w-5 h-5 text-slate-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Leave call
                        </button>
                    </div>
                </div>
            </div>

            {/* Main video area */}
            <div className="flex-1 bg-slate-900 p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main grid layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4 min-h-[calc(100vh-120px)]">
                        {/* Primary video */}
                        <div className="lg:col-span-3 xl:col-span-4">
                            <div className="bg-slate-800 rounded-xl overflow-hidden h-full relative shadow-lg">
                                <UserFeedPlayer stream={stream} />
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                    You
                                </div>
                            </div>
                        </div>

                        {/* Participants sidebar */}
                        <div className="lg:col-span-1 xl:col-span-2 space-y-3">
                            {Object.keys(peers).map((peerId) => (
                                <div
                                    key={peerId}
                                    className="aspect-video bg-slate-800 rounded-xl overflow-hidden relative shadow-lg"
                                >
                                    <UserFeedPlayer stream={peers[peerId].stream} />
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                                        User {peerId.slice(-4)}
                                    </div>
                                </div>
                            ))}

                            {Object.keys(peers).length === 0 && (
                                <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                                    <div className="text-center text-slate-400">
                                        <svg
                                            className="w-8 h-8 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <p className="text-sm font-medium">
                                            Waiting for others to join
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern bottom controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 px-6 py-4 flex items-center space-x-4">
                    <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors group">
                        <svg
                            className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors group">
                        <svg
                            className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                    </button>
                    <button className="p-3 hover:bg-slate-100 rounded-xl transition-colors group">
                        <svg
                            className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                        </svg>
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 001.414 1.414L10 12.414l3.293 3.293a1 1 0 001.414-1.414L11.414 11l3.293-3.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
