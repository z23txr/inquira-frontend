import { useState } from "react";
import { Plus, Loader, LogOut, Clock, X } from "lucide-react";
import Youtube from "./YoutubeIcon";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Sidebar = ({ videoTitle, setVideoTitle, setVideoReady, setChat, currentChat, setCurrentChat, closeMobileSidebar, historyList }) => {
  const { user, logout } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    setSigningOut(true);
    setTimeout(() => {
      logout();
    }, 1200);
  };

  const extractVideoId = (input) => {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : input.trim();
  };

  const getHistory = () => {
    return historyList || [];
  };

  const handleLoad = async () => {
    if (!url.trim()) return;
    setError("");
    setLoading(true);
    setVideoReady(false);
    const videoId = extractVideoId(url);
    try {
      const res = await axios.post(`${BASE_URL}/load`, { video_id: videoId });
      const title = res.data.title || videoId;
      setVideoTitle(title);
      setVideoReady(true);
      setChat([]);
      setCurrentChat({ videoId, title });
      if (closeMobileSidebar) closeMobileSidebar();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load video. Please check the URL or your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (entry) => {
    setVideoTitle(entry.title);
    setChat(entry.chat);
    setVideoReady(true);
    setCurrentChat({ videoId: entry.videoId, title: entry.title });
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (
    <div className="w-[280px] sm:w-[300px] min-h-screen bg-[#041a14] border-r-2 border-[#22c55e]/30 flex flex-col justify-between shrink-0 z-10 font-sans shadow-2xl md:shadow-none relative">
      {/* ── Upper-Mid Solid Signout Toast Popup ── */}
      {signingOut && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none px-4 animate-fadeIn">
          <div className="bg-[#f59e0b] text-black px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md pointer-events-auto border-0">
            <LogOut size={20} className="shrink-0 text-black animate-pulse" />
            <p className="text-xs sm:text-sm font-black tracking-wide">Signed out successfully. Goodbye!</p>
          </div>
        </div>
      )}
      <div>
        {/* Header Logo & Mobile Close */}
        <div className="px-6 py-5 border-b-2 border-[#22c55e]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#22c55e] rounded-xl flex items-center justify-center text-black font-bold shadow-sm">
              <Youtube size={20} />
            </div>
            <span className="text-white font-black text-lg uppercase tracking-wider">
              Inquira
            </span>
          </div>
          {closeMobileSidebar && (
            <button onClick={closeMobileSidebar} className="md:hidden text-[#a7f3d0] hover:text-white p-1 rounded-lg">
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Info & Loader Box */}
        <div className="bg-[#052e22] border-2 border-[#22c55e]/35 rounded-3xl mx-4 mt-5 p-4 space-y-3.5 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#f59e0b] rounded-full flex items-center justify-center text-black font-extrabold text-sm shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || "I"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{user?.name || "Inquira User"}</p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLoad()}
              placeholder="Paste here"
              className="w-full bg-[#021f18] border-2 border-[#22c55e]/40 rounded-2xl text-white text-xs px-3.5 py-2.5 outline-none focus:border-[#f59e0b] placeholder:text-gray-500 font-mono transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-[11px] font-semibold">{error}</p>}

          <button
            onClick={handleLoad}
            disabled={loading}
            className="w-full bg-[#22c55e] hover:bg-[#4ade80] text-black font-black text-xs py-2.5 rounded-full uppercase tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
          >
            {loading && <Loader size={13} className="animate-spin" />}
            <span>{loading ? "Indexing..." : "Connect Video"}</span>
          </button>
        </div>

        {/* Current Active Video */}
        {videoTitle && (
          <div className="mx-4 mt-4 p-3.5 bg-[#021f18] border-2 border-[#f59e0b]/50 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono font-bold text-[#f59e0b] uppercase block mb-1">Active Index</span>
            <p className="text-white text-xs font-semibold break-words leading-snug">{videoTitle}</p>
          </div>
        )}

        {/* History Toggle Button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 mx-4 mt-5 px-4 py-2 rounded-full border border-[#22c55e]/30 bg-[#021f18] text-[#a7f3d0] hover:text-[#f59e0b] hover:border-[#f59e0b] text-xs font-bold transition-all w-[calc(100%-2rem)] justify-center"
        >
          <Clock size={14} />
          <span>Chat History Buffer</span>
        </button>

        {/* History List */}
        {showHistory && (
          <div className="mx-4 mt-2 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {getHistory().length === 0 ? (
              <p className="text-gray-500 text-xs px-2 py-1">No past sessions</p>
            ) : (
              getHistory().map((entry, i) => (
                <div
                  key={i}
                  onClick={() => loadFromHistory(entry)}
                  className="px-3.5 py-2.5 bg-[#021f18] hover:bg-[#052e22] cursor-pointer border-2 border-[#22c55e]/30 rounded-2xl transition-all"
                >
                  <p className="text-white text-xs font-semibold truncate">{entry.title}</p>
                  <p className="text-[#a7f3d0]/60 text-[10px] font-mono mt-0.5">{entry.date}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t-2 border-[#22c55e]/20 space-y-2.5">
        <button
          onClick={() => { setChat([]); setVideoTitle(""); setVideoReady(false); setUrl(""); setCurrentChat(null); if (closeMobileSidebar) closeMobileSidebar(); }}
          className="w-full bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-black text-xs py-3 rounded-full uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Plus size={16} strokeWidth={3} /> New Chat Session
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#021f18] text-[#a7f3d0] hover:text-white hover:bg-[#052e22] transition-all text-xs font-bold border-2 border-[#22c55e]/30"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;