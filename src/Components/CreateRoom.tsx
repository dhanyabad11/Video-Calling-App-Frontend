import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log("Initialising a req to create a room", socket);
        socket.emit("create-room");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onClick={initRoom} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    New meeting
                </button>
                
                <div className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="Enter meeting code" 
                        className="border border-slate-300 rounded-l-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-48 bg-white/80 backdrop-blur-sm"
                    />
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-r-xl border border-l-0 border-slate-300 transition-colors font-medium">
                        Join
                    </button>
                </div>
            </div>
            
            <div className="text-center">
                <p className="text-slate-500 text-sm mb-4">
                    Learn more about <span className="text-blue-600 cursor-pointer hover:underline font-medium">VideoConnect</span>
                </p>
            </div>
        </div>
    );
};

export default CreateRoom;
