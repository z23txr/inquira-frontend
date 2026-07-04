import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import SolidBackgroundShapes from "../components/SolidBackgroundShapes";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Home = () => {
  const { user } = useAuth();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoReady, setVideoReady] = useState(false);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    if (!user) {
      setHistoryList([]);
      return;
    }
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/history`);
        setHistoryList(res.data || []);
      } catch (err) {
        const local = JSON.parse(localStorage.getItem(`yt_rag_history_${user.id}`) || "[]");
        setHistoryList(local);
      }
    };
    fetchHistory();
  }, [user]);

  useEffect(() => {
    if (currentChat?.videoId && user) {
      const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      const entry = {
        videoId: currentChat.videoId,
        title: currentChat.title || currentChat.videoId,
        date: dateStr,
        chat
      };

      setHistoryList((prev) => {
        const idx = prev.findIndex((h) => h.videoId === currentChat.videoId);
        const copy = [...prev];
        if (idx !== -1) {
          copy[idx] = { ...copy[idx], ...entry };
          return copy;
        } else {
          return [entry, ...prev];
        }
      });

      const storageKey = `yt_rag_history_${user.id}`;
      try {
        const currentStorage = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const idx = currentStorage.findIndex((h) => h.videoId === currentChat.videoId);
        if (idx !== -1) {
          currentStorage[idx] = entry;
        } else {
          currentStorage.unshift(entry);
        }
        localStorage.setItem(storageKey, JSON.stringify(currentStorage));
      } catch (e) {
        console.error("Storage error:", e);
      }

      axios.post(`${BASE_URL}/history`, entry).catch((err) => {
        console.error("Failed to save history to cloud:", err);
      });
    }
  }, [chat, currentChat, user]);

  return (
    <div className="flex w-full min-h-screen bg-[#021f18] overflow-hidden relative selection:bg-[#22c55e] selection:text-black font-sans">
      <SolidBackgroundShapes />
      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        />
      )}

      <div className={`fixed md:relative inset-y-0 left-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out shrink-0`}>
        <Sidebar
          videoTitle={videoTitle}
          setVideoTitle={setVideoTitle}
          setVideoReady={setVideoReady}
          setChat={setChat}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          closeMobileSidebar={() => setSidebarOpen(false)}
          historyList={historyList}
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
