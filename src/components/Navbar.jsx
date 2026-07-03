import Youtube from "./YoutubeIcon";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#021f18] border-b-2 border-[#22c55e]/30 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-2">
      <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#22c55e] rounded-xl flex items-center justify-center text-black font-bold shadow-sm">
          <Youtube size={18} />
        </div>
        <span className="text-white font-black text-xl sm:text-2xl tracking-wider uppercase">
          Inquira
        </span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <Link to="/auth" className="text-[#a7f3d0] hover:text-[#f59e0b] font-bold text-xs sm:text-sm transition-colors px-2 py-1">
          Login
        </Link>
        <Link to="/auth?mode=register" className="bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-md shrink-0">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;