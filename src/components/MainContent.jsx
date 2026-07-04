import { useRef, useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const MainContent = ({ videoReady, chat, setChat, currentChat, setSidebarOpen }) => {
  const [query, setQuery] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || !videoReady) return;
    const currentQuery = query;
    setChat((prev) => [...prev, { query: currentQuery, answer: null }]);
    setQuery("");
    try {
      const res = await axios.post(`${BASE_URL}/ask`, {
        question: currentQuery,
        video_id: currentChat?.videoId,
        session_id: "default_session"
      });
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = res.data.answer;
        return updated;
      });
    } catch (err) {
      const detail = err.response?.data?.detail;
      const errorMsg = typeof detail === "string" ? detail
        : Array.isArray(detail) ? detail.map(d => d.msg || JSON.stringify(d)).join(", ")
        : typeof detail === "object" && detail !== null ? (detail.msg || detail.message || JSON.stringify(detail))
        : err.message || "Something went wrong while processing your question. Please try again.";
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = "Error: " + errorMsg;
        return updated;
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#021f18] px-4 sm:px-8 py-4 sm:py-6 z-10 relative font-sans w-full min-w-0">
      <div className="flex items-center justify-between border-b-2 border-[#22c55e]/20 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2">
        <div className="flex items-center gap-3">
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#041a14] border-2 border-[#22c55e]/40 rounded-full text-white text-xs font-bold shrink-0"
            >
              <Menu size={14} className="text-[#22c55e]" />
              <span>Panel</span>
            </button>
          )}
          <span className="text-xs sm:text-sm font-mono font-bold uppercase text-white tracking-wider truncate">
            Active RAG Engine Session
          </span>
        </div>

        {videoReady && (
          <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1 bg-[#041a14] border-2 border-[#22c55e]/40 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#a7f3d0]">
              INDEX ONLINE
            </span>
          </div>
        )}
      </div>

      {chat.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto px-2">
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3 uppercase tracking-tight">
            Ask Anything About <span className="text-[#22c55e]">Your Video</span>
          </h1>
          <p className="text-[#a7f3d0]/80 text-xs sm:text-sm leading-relaxed mb-6">
            {videoReady
              ? "Video is ready! Ask any question about this video below."
              : "Paste a YouTube link in the sidebar to ask questions about the video."}
          </p>
        </div>
      )}

      {chat.length > 0 && (
        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 custom-scrollbar pr-1 sm:pr-2 mb-4 sm:mb-6">
          {chat.map((item, index) => (
            <ChatMessage key={index} query={item.query} answer={item.answer} />
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[#041a14] border-2 border-[#22c55e]/50 rounded-full p-1.5 sm:p-2 focus-within:border-[#f59e0b] transition-colors shadow-2xl gap-1"
      >
        <textarea
          rows={1}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
          }}
          placeholder={videoReady ? "Ask any question..." : "Connect a video first..."}
          disabled={!videoReady}
          className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-500 text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 outline-none disabled:opacity-40 font-sans min-w-0"
        />
        <button
          type="submit"
          disabled={!videoReady || !query.trim()}
          className="bg-[#22c55e] hover:bg-[#4ade80] text-black font-black px-5 sm:px-7 py-3 sm:py-3.5 rounded-full uppercase tracking-wider text-[11px] sm:text-xs transition-all disabled:opacity-40 flex items-center gap-1.5 sm:gap-2 shadow-md shrink-0"
        >
          <span>SEND</span>
          <ArrowRight size={15} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
};

export default MainContent;