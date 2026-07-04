import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Play, Database, RefreshCw, ShieldCheck, Cpu } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import SolidBackgroundShapes from "../components/SolidBackgroundShapes";
import { TechBadge, FeatureCard } from "../components/LandingCards";

const features = [
  { icon: <Database size={22} />, badge: "HYBRID RAG", title: "Pinecone + BM25 Search", desc: "Combines AI vector search with exact keyword matching for surgical precision." },
  { icon: <RefreshCw size={22} />, badge: "RESILIENT POOL", title: "Failover LLM Rotator", desc: "Automatically rotates Llama and Mixtral models to prevent rate limit errors." },
  { icon: <ShieldCheck size={22} />, badge: "FACT CHECKED", title: "Anti-Hallucination Guard", desc: "Strict verification loop double-checks every answer against exact timestamps." }
];

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

const LandingPage = () => (
  <div className="min-h-screen bg-[#021f18] text-[#f1f5f9] relative overflow-hidden flex flex-col justify-between selection:bg-[#22c55e] selection:text-black font-sans">
    <SolidBackgroundShapes />
    
    <Navbar />

    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-28 md:pt-36 pb-12 w-full">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        <div className="lg:col-span-7 text-left space-y-6">
          <RevealOnScroll delay={50}>
            <div className="flex flex-wrap gap-2.5 mb-2">
              <TechBadge label="Instant AI Video Chat" />
              <TechBadge label="100% Fact Verified" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Stop Watching Hours of Video. <br />
              <span className="text-[#22c55e] block mt-1.5">
                Get Instant Answers.
              </span>
            </h1>

            <p className="text-[#a7f3d0]/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal mt-4">
              Don&apos;t waste time skipping forward and backward. Paste any YouTube link to ask questions, summarize key topics, and get exact video timestamps.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center w-full sm:w-auto">
              <Link to="/auth?mode=register" className="bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold px-7 py-3.5 text-xs sm:text-sm transition-all flex items-center justify-center gap-2 rounded-full border-2 border-[#22c55e] shadow-lg">
                LAUNCH RAG ENGINE <ChevronRight size={16} strokeWidth={3} />
              </Link>
              <Link to="/auth" className="bg-[#041a14] hover:bg-[#052e22] text-white font-bold px-7 py-3.5 text-xs sm:text-sm border-2 border-[#22c55e]/50 transition-all flex items-center justify-center gap-2 rounded-full shadow-md">
                <Play size={13} className="text-[#f59e0b]" fill="currentColor" /> ACCESS WORKSPACE
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        <div className="lg:col-span-5 w-full mt-6 lg:mt-0">
          <RevealOnScroll delay={200}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              <div className="p-5 rounded-3xl bg-[#041a14] border-2 border-[#22c55e]/40 shadow-xl flex items-center gap-4 hover:border-[#22c55e] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#22c55e] flex items-center justify-center text-black shrink-0 shadow-sm">
                  <Database size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-white font-black text-base sm:text-lg leading-snug">Hybrid Vector Index</h3>
                  <p className="text-[#a7f3d0]/80 text-xs font-normal mt-0.5">Pinecone similarity + BM25 keyword search.</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#041a14] border-2 border-[#f59e0b]/50 shadow-xl flex items-center gap-4 hover:border-[#f59e0b] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] flex items-center justify-center text-black shrink-0 shadow-sm">
                  <Cpu size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-white font-black text-base sm:text-lg leading-snug">Smart Reranking</h3>
                  <p className="text-[#a7f3d0]/80 text-xs font-normal mt-0.5">FlashRank removes noise for exact top answers.</p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#041a14] border-2 border-[#22c55e]/40 shadow-xl flex items-center gap-4 sm:col-span-2 lg:col-span-1 hover:border-[#22c55e] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-[#021f18] border-2 border-[#22c55e] flex items-center justify-center text-[#22c55e] shrink-0 shadow-sm">
                  <ShieldCheck size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-white font-black text-base sm:text-lg leading-snug">Fact Verification</h3>
                  <p className="text-[#a7f3d0]/80 text-xs font-normal mt-0.5">Checked against actual video timestamps.</p>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>

    <section className="relative z-10 pt-4 pb-16 px-6 sm:px-8 max-w-7xl mx-auto w-full">
      <RevealOnScroll delay={100}>
        <div className="mb-8 border-b border-[#22c55e]/20 pb-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Engineered for Precision.</h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {features.map((f, idx) => (
          <RevealOnScroll key={idx} delay={idx * 150}>
            <FeatureCard {...f} />
          </RevealOnScroll>
        ))}
      </div>
    </section>

    <section className="relative z-10 pt-4 pb-20 px-6 sm:px-8 max-w-7xl mx-auto w-full">
      <RevealOnScroll delay={150}>
        <div className="bg-[#041a14] border-2 border-[#22c55e] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Ready to Unlock Video Knowledge?
          </h2>
          <p className="text-[#a7f3d0]/90 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            Start indexing and chatting with your favorite YouTube videos right now with zero rate limits.
          </p>
          <div className="flex justify-center">
            <Link to="/auth?mode=register" className="bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold px-8 py-4 text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2">
              Get Started Now <ChevronRight size={16} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>

    <Footer />
  </div>
);

export default LandingPage;