import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import Youtube from "../components/YoutubeIcon";
import SolidBackgroundShapes from "../components/SolidBackgroundShapes";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") === "register" ? "register" : "login");
  const { login, register, forgotPassword, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName]                 = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast]               = useState(null);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);

  // Only redirect if already logged in on page mount
  useEffect(() => {
    if (user && !toast && !loading) {
      navigate("/app");
    }
  }, []);

  const showToastMsg = (msg) => {
    setToast(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToast(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        showToastMsg("Login successful! Welcome back.");
        setTimeout(() => navigate("/app"), 1400);
      } else if (mode === "register") {
        await register(name || "Inquira User", email, password);
        showToastMsg("Account created successfully!");
        setTimeout(() => navigate("/app"), 1400);
      } else if (mode === "forgot") {
        const msg = await forgotPassword(email, password);
        showToastMsg(msg || "Password reset successfully!");
        setTimeout(() => {
          setToast(null);
          setMode("login");
        }, 2200);
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setShowPassword(false);
    setError(""); setToast(null);
  };

  return (
    <div className="min-h-screen bg-[#021f18] flex items-center justify-center px-4 py-12 relative overflow-hidden selection:bg-[#22c55e] selection:text-black font-sans">
      <SolidBackgroundShapes />

      {/* ── Upper-Mid Solid Toast Popup ── */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none px-4 animate-fadeIn">
          <div className="bg-[#22c55e] text-black px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md pointer-events-auto border-0">
            <CheckCircle2 size={20} className="shrink-0 text-black animate-pulse" />
            <p className="text-xs sm:text-sm font-black tracking-wide">{toast}</p>
          </div>
        </div>
      )}

      {/* Back to home */}
      <Link to="/" className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 px-4 py-2 bg-[#041a14] border-2 border-[#22c55e]/40 rounded-full text-[#a7f3d0] hover:text-[#f59e0b] hover:border-[#f59e0b] font-bold text-xs sm:text-sm transition-all z-20 shadow-sm">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {/* Auth card container */}
      <div className="w-full max-w-4xl bg-[#041a14] rounded-3xl border-2 border-[#22c55e]/45 overflow-hidden flex flex-col md:block relative shadow-2xl z-10 min-h-[520px]">

        {/* Mobile Header Tabs */}
        <div className="flex md:hidden border-b-2 border-[#22c55e]/30 bg-[#052e22]">
          <button
            onClick={() => switchMode("login")}
            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider transition-colors ${mode === "login" ? "text-[#f59e0b] border-b-2 border-[#f59e0b]" : "text-[#a7f3d0]/60"}`}
          >
            Login
          </button>
          <button
            onClick={() => switchMode("register")}
            className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider transition-colors ${mode === "register" ? "text-[#f59e0b] border-b-2 border-[#f59e0b]" : "text-[#a7f3d0]/60"}`}
          >
            Register
          </button>
        </div>

        {/* ── Sliding Branding Panel (Hidden on mobile) ── */}
        <div
          className="hidden md:flex absolute top-0 bottom-0 w-1/2 bg-[#052e22] border-x-2 border-[#22c55e]/35 flex-col items-center justify-center text-center p-10 z-20 transition-all duration-700 ease-in-out"
          style={{ left: mode === "login" ? "50%" : "0%" }}
        >
          <div className="w-16 h-16 bg-[#22c55e] rounded-2xl flex items-center justify-center text-black font-bold mb-5 shadow-sm">
            <Youtube size={32} />
          </div>
          <h2 className="text-white text-3xl font-black mb-3 uppercase tracking-wide">
            {mode === "login" ? "Welcome Back!" : mode === "forgot" ? "Reset Password" : "Join Inquira"}
          </h2>
          <p className="text-[#a7f3d0]/80 text-sm leading-relaxed mb-8 max-w-xs font-normal">
            {mode === "login"
              ? "Log in to access your video RAG workspace & chat memory."
              : "Create an account to save your AI RAG video sessions."}
          </p>
          <button
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
            className="border-2 border-[#f59e0b] text-[#f59e0b] rounded-full px-7 py-3 font-bold text-xs sm:text-sm hover:bg-[#f59e0b] hover:text-black transition-all tracking-wider uppercase shadow-sm"
          >
            {mode === "login" ? "Create New Account" : "Back to Login"}
          </button>
        </div>

        {/* ── Form Panel ── */}
        <div
          className="w-full md:absolute md:top-0 md:bottom-0 md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-700 ease-in-out z-10 bg-[#041a14] min-h-[440px] md:min-h-full"
          style={{ left: typeof window !== "undefined" && window.innerWidth >= 768 ? (mode === "login" ? "0%" : "50%") : "0%" }}
        >
          <div className="w-full max-w-sm">
            <span className="text-xs font-mono font-bold text-[#f59e0b] tracking-wider uppercase block mb-1.5">
              {mode === "login" ? "AUTHENTICATION" : mode === "forgot" ? "ACCOUNT RECOVERY" : "GET STARTED"}
            </span>
            <h2 className="text-white text-xl sm:text-2xl font-black mb-6 uppercase tracking-tight">
              {mode === "login" ? "Account Login" : mode === "forgot" ? "Reset Password" : "Register Now"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "register" && (
                <div>
                  <label className="text-[#a7f3d0] text-xs font-semibold mb-1.5 block">Your Name</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#021f18] border-2 border-[#22c55e]/40 rounded-xl text-white text-sm px-4 py-2.5 outline-none focus:border-[#f59e0b] transition-colors placeholder:text-gray-600"
                  />
                </div>
              )}
              <div>
                <label className="text-[#a7f3d0] text-xs font-semibold mb-1.5 block">Email Address</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#021f18] border-2 border-[#22c55e]/40 rounded-xl text-white text-sm px-4 py-2.5 outline-none focus:border-[#f59e0b] transition-colors placeholder:text-gray-600"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#a7f3d0] text-xs font-semibold">
                    {mode === "forgot" ? "New Password" : "Password"}
                  </label>
                  {mode === "login" && (
                    <button
                      type="button" onClick={() => switchMode("forgot")}
                      className="text-xs font-semibold text-[#f59e0b] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === "forgot" ? "Enter new password" : "Enter your password"}
                    className="w-full bg-[#021f18] border-2 border-[#22c55e]/40 rounded-xl text-white text-sm pl-4 pr-11 py-2.5 outline-none focus:border-[#f59e0b] transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a7f3d0]/60 hover:text-[#f59e0b] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 text-white text-xs sm:text-sm font-bold bg-red-600 p-3.5 rounded-2xl border-0 shadow-md">
                  <AlertCircle size={18} className="shrink-0 text-white" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#22c55e] hover:bg-[#4ade80] text-black font-black py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider mt-3 disabled:opacity-50 transition-all shadow-md"
              >
                {loading ? "Processing..." : mode === "login" ? "Login" : mode === "forgot" ? "Update Password" : "Register"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;