import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import SolidBackgroundShapes from "../components/SolidBackgroundShapes";

const Home = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoReady, setVideoReady] = useState(false);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (currentChat?.videoId) {
      const history = JSON.parse(localStorage.getItem("yt_rag_history") || "[]");
      const idx = history.findIndex((h) => h.videoId === currentChat.videoId);
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      if (idx !== -1) {
        history[idx].chat = chat;
        history[idx].title = currentChat.title || history[idx].title;
        history[idx].date = dateStr;
      } else {
        history.unshift({
          videoId: currentChat.videoId,
          title: currentChat.title || currentChat.videoId,
          date: dateStr,
          chat
        });
      }
      localStorage.setItem("yt_rag_history", JSON.stringify(history));
    }
  }, [chat, currentChat]);

  return (
    <div className="flex w-full min-h-screen bg-[#021f18] overflow-hidden relative selection:bg-[#22c55e] selection:text-black font-sans">
      <SolidBackgroundShapes />
      
      {/* Mobile Backdrop Overlay when drawer is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar (Responsive Drawer on Mobile, Fixed Panel on Desktop) */}
      <div className={`fixed md:relative inset-y-0 left-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out shrink-0`}>
        <Sidebar
          videoTitle={videoTitle}
          setVideoTitle={setVideoTitle}
          setVideoReady={setVideoReady}
          setChat={setChat}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          closeMobileSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <MainContent
        videoReady={videoReady}
        chat={chat}
        setChat={setChat}
        currentChat={currentChat}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

export default Home;
