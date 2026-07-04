import Youtube from "./YoutubeIcon";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#01140f] border-t-2 border-[#22c55e]/30 pt-14 pb-10 px-8 relative z-10 text-[#a7f3d0] font-sans">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#22c55e]/20">
      
      <div className="lg:col-span-4 space-y-3.5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center text-black font-black shadow-sm">
            <Youtube size={22} />
          </div>
          <span className="text-white font-black text-2xl tracking-wider uppercase">
            Inquira
          </span>
        </Link>
        <p className="text-xs text-[#a7f3d0]/80 leading-relaxed font-normal pr-4">
          Smart video search engine. Easily search inside YouTube videos and chat with them to get fast, accurate answers.
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#041a14] border-2 border-[#22c55e]/40 rounded-full text-[11px] font-mono text-[#22c55e]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          SYSTEMS ONLINE
        </div>
      </div>

      <div className="lg:col-span-3 space-y-3">
        <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-[#22c55e]/20 pb-2">
          Technology
        </h4>
        <ul className="space-y-2 text-xs font-semibold">
          <li className="text-gray-300">Pinecone Vector Index</li>
          <li className="text-gray-300">BM25 Keyword Matcher</li>
          <li className="text-gray-300">FlashRank Reranking</li>
          <li className="text-gray-300">Llama-3.3 AI Pool</li>
        </ul>
      </div>

      <div className="lg:col-span-2 space-y-3">
        <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-[#22c55e]/20 pb-2">
          Platform
        </h4>
        <ul className="space-y-2 text-xs font-semibold">
          <li>
            <Link to="/" className="hover:text-[#f59e0b] transition-colors flex items-center justify-between group">
              <span>Home View</span>
            </Link>
          </li>
          <li>
            <Link to="/auth" className="hover:text-[#f59e0b] transition-colors flex items-center justify-between group">
              <span>AI Workspace</span>
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#f59e0b]" />
            </Link>
          </li>
          <li>
            <Link to="/auth?mode=register" className="hover:text-[#f59e0b] transition-colors flex items-center justify-between group">
              <span>Free Account</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-3 space-y-3">
        <h4 className="text-white font-black text-xs uppercase tracking-wider border-b border-[#22c55e]/20 pb-2">
          Accuracy Guarantee
        </h4>
        <p className="text-xs text-[#a7f3d0]/80 leading-relaxed font-normal">
          Every response is automatically verified against exact video timestamps for 100% truthfulness.
        </p>
        <div className="bg-[#041a14] px-3.5 py-2 border-2 border-[#22c55e]/30 rounded-2xl text-[11px] font-mono text-[#f59e0b]">
          Verified Answers Only
        </div>
      </div>

    </div>

    <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#a7f3d0]/70">
      <p>© 2026 Inquira. Built for intelligent video discovery.</p>
      <div className="flex gap-6">
        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
        <span>•</span>
        <span className="hover:text-white cursor-pointer transition-colors">Security</span>
        <span>•</span>
        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
      </div>
    </div>
  </footer>
);

export default Footer;