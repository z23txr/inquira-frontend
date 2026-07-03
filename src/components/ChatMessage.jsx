import { useState, useEffect } from "react";
import { Copy, Check, Volume2 } from "lucide-react";

const ChatMessage = ({ query, answer }) => {
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (answer !== null) return;
    const t1 = setTimeout(() => setStep(1), 1400);
    const t2 = setTimeout(() => setStep(2), 2900);
    const t3 = setTimeout(() => setStep(3), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [answer]);

  const thinkingSteps = [
    "Resolving follow-up references & rewriting query...",
    "Hybrid Similarity Search (Pinecone Vector + BM25 Keywords)...",
    "Smart Reranking & Compressing (Retrieved 15 -> Top 5 exact chunks)...",
    "Verifying video timestamps & synthesizing grounded response..."
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(answer);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4 border-b-2 border-[#22c55e]/20 pb-6 font-sans">
      <div className="flex justify-end">
        <span className="bg-[#22c55e] text-black font-bold px-6 py-3.5 rounded-3xl rounded-tr-sm text-sm leading-relaxed max-w-[70%] shadow-lg">
          {query}
        </span>
      </div>

      <div className="flex justify-start">
        {answer === null ? (
          <div className="bg-[#041a14] border-2 border-[#22c55e]/50 rounded-2xl flex items-center gap-3 px-5 py-3.5 shadow-md">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-ping" />
              <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-ping" style={{ animationDelay: "150ms" }} />
            </div>
            <span className="text-xs font-mono font-bold text-[#a7f3d0] transition-all">
              {thinkingSteps[step] || thinkingSteps[0]}
            </span>
          </div>
        ) : (
          <div className="max-w-[85%]">
            <div className="bg-[#041a14] border-2 border-[#22c55e]/40 text-gray-100 px-7 py-5 rounded-3xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-wrap shadow-xl">
              {answer}
            </div>
            <div className="flex gap-5 mt-3 ml-3">
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-mono text-[#a7f3d0] hover:text-[#f59e0b] transition-colors">
                {copied ? <Check size={14} className="text-[#22c55e]" /> : <Copy size={14} />}
                <span>{copied ? "COPIED" : "COPY TEXT"}</span>
              </button>
              <button onClick={handleSpeak} className="flex items-center gap-1.5 text-xs font-mono text-[#a7f3d0] hover:text-[#f59e0b] transition-colors">
                <Volume2 size={14} />
                <span>LISTEN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
