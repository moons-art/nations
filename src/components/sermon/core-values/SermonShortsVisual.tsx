import React, { useState } from 'react';
import { motion } from 'motion/react';

export const SermonShortsVisual: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-[#13111C] to-slate-900 border border-slate-700/60 shadow-2xl p-3 sm:p-4 flex flex-col items-center justify-center">
      {/* Top Section Header Tag */}
      <div className="w-full flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-pulse" />
          <span className="text-[11.5px] font-bold tracking-wider text-slate-300 font-mono">
            YOUTUBE SHORTS
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          설교 숏폼 자동 생성
        </span>
      </div>

      {/* Main Photographic Smartphone Screen Mockup without Watermark */}
      <motion.div
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-[285px] sm:max-w-[305px] aspect-[9/16] max-h-[530px] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-black flex items-center justify-center select-none group"
      >
        {/* Real Pastor Sermon Shorts Photo (Grayscale monochrome styling) */}
        {!imageError ? (
          <img
            src="/sermon-shorts.png"
            alt="목사님 유튜브 설교 숏폼 스마트폰 화면"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center select-none filter grayscale contrast-105"
            loading="eager"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col justify-between p-3 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black filter grayscale">
            <div className="pt-2 text-center">
              <h3 className="text-[16px] font-black text-white">열심히 해도 목마른 이유</h3>
              <h4 className="text-[16px] font-black text-neutral-300">종교적 열심 vs 영적 채움</h4>
            </div>
            <div className="my-auto w-full aspect-[16/10] bg-neutral-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-3xl">▶</span>
            </div>
            <div className="pb-2 text-center text-xs text-white/80">
              서울장로교회
            </div>
          </div>
        )}

        {/* Subtle Bottom-Right Corner Soft Gradient (Ensures complete removal of any remaining watermark) */}
        <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-black/80 via-black/30 to-transparent pointer-events-none rounded-br-[36px]" />

        {/* Hover Highlight Glow */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
      </motion.div>

      {/* Bottom Features Description */}
      <div className="w-full flex items-center justify-between text-[11px] text-slate-300 pt-3 mt-2 border-t border-slate-800/80">
        <span className="flex items-center gap-1 font-medium text-slate-300">
          <span className="material-symbols-outlined text-orange-400 text-[15px]">verified</span>
          목사님 설교 영상 숏폼 자동 클립 추출 및 업로드
        </span>
        <span className="text-emerald-400 font-bold font-mono">워터마크 제거 완료</span>
      </div>
    </div>
  );
};
