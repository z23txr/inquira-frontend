export const TechBadge = ({ icon, label }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#041a14] border-2 border-[#22c55e]/50 rounded-full text-[11px] sm:text-xs font-semibold text-[#a7f3d0] shadow-md hover:border-[#f59e0b] transition-all">
    <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
    {icon && <span>{icon}</span>}
    <span className="font-mono uppercase tracking-wider">{label}</span>
  </div>
);

export const PipelineStage = ({ step, title, tech, desc }) => (
  <div className="p-4 bg-[#03140f] border-2 border-[#22c55e]/30 hover:border-[#22c55e] rounded-2xl transition-all shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono font-black text-[#22c55e] bg-[#041a14] px-2 py-0.5 rounded-full border border-[#22c55e]/40">
          STAGE {step}
        </span>
        <h4 className="text-white text-xs sm:text-sm font-bold tracking-wide">{title}</h4>
      </div>
      <span className="text-[10px] font-mono text-[#f59e0b] font-bold">{tech}</span>
    </div>
    <p className="text-[#a7f3d0]/80 text-[11px] sm:text-xs leading-relaxed font-normal pl-1">{desc}</p>
  </div>
);

export const FeatureCard = ({ icon, title, badge, desc }) => (
  <div className="bg-[#041a14] border-2 border-[#22c55e]/35 rounded-3xl p-6 hover:border-[#22c55e] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-md">
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#052e22] border-2 border-[#22c55e]/50 rounded-2xl flex items-center justify-center text-[#22c55e] shadow-inner">
          {icon}
        </div>
        {badge && <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 bg-[#021f18] text-[#f59e0b] border-2 border-[#f59e0b]/40 rounded-full">{badge}</span>}
      </div>
      <h3 className="text-white font-bold text-base sm:text-lg mb-2 tracking-wide">{title}</h3>
      <p className="text-[#a7f3d0]/80 text-xs sm:text-sm leading-relaxed font-normal">{desc}</p>
    </div>
  </div>
);
