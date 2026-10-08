import React from 'react';
import { motion } from 'motion/react';

export const InstagramFeedVisual: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C120B] via-[#241710] to-[#120B06] border border-amber-800/60 shadow-2xl p-4 sm:p-5 flex flex-col justify-between">
      {/* Instagram Post Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/80 mb-3">
        <div className="flex items-center gap-2">
          {/* Church Avatar */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-amber-300 font-bold">
              ✝
            </div>
          </div>
          <span className="text-[11.5px] font-bold text-white tracking-tight">
            nations_church
          </span>
          <span className="text-[10px] text-amber-400 font-semibold">• 팔로잉</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10.5px] font-semibold font-mono">
          카드뉴스 7장 자동생성
        </span>
      </div>

      {/* Multiple Overlapping Instagram Feed Cards Display */}
      <div className="relative flex items-center justify-center py-2 min-h-[220px]">
        {/* Background Card 3 (화요 묵상카드) */}
        <div className="absolute right-1 sm:right-6 w-36 sm:w-44 h-48 sm:h-52 rounded-xl bg-gradient-to-b from-[#2E1E14] to-[#1A0E08] border border-amber-700/40 p-3 shadow-lg transform rotate-8 scale-90 opacity-60 pointer-events-none flex flex-col justify-between">
          <span className="text-[9px] text-amber-400 font-bold">화요 묵상 카드</span>
          <p className="text-[9.5px] text-amber-100/90 font-medium text-center">
            "내 영혼아 평안할지어다"
          </p>
          <span className="text-[8px] text-amber-300/70 text-right">03/07</span>
        </div>

        {/* Background Card 2 (월요 묵상카드) */}
        <div className="absolute left-1 sm:left-6 w-36 sm:w-44 h-48 sm:h-52 rounded-xl bg-gradient-to-b from-[#382317] to-[#1C100A] border border-amber-600/40 p-3 shadow-lg transform -rotate-8 scale-90 opacity-60 pointer-events-none flex flex-col justify-between">
          <span className="text-[9px] text-amber-400 font-bold">월요 묵상 카드</span>
          <p className="text-[9.5px] text-amber-100/90 font-medium text-center">
            "새 아침을 여는 주의 인자하심"
          </p>
          <span className="text-[8px] text-amber-300/70 text-right">02/07</span>
        </div>

        {/* Center Main Instagram Card (주일설교 요약카드) */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-52 sm:w-60 h-56 sm:h-60 rounded-2xl bg-gradient-to-br from-[#452718] via-[#2F1A0F] to-[#1F1109] border-2 border-amber-500/70 shadow-2xl p-4 flex flex-col justify-between overflow-hidden"
        >
          {/* Card Category Tag */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/30 text-amber-200 text-[10px] font-bold">
              주일설교 핵심요약
            </span>
            <span className="text-[10px] text-amber-300/80 font-mono">1 / 7</span>
          </div>

          {/* Card Message Body */}
          <div className="flex flex-col items-center justify-center text-center gap-1.5 my-auto px-1">
            <span className="text-amber-400 text-[18px]">❝</span>
            <h4 className="text-[13px] sm:text-[14px] font-extrabold text-white leading-snug break-keep-all">
              보이지 않아도<br />
              <span className="text-amber-300 underline underline-offset-4 decoration-amber-400">일하시는 하나님</span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-amber-200/90 mt-1 font-serif">
              "믿음은 바라는 것들의 실상이요<br />보이지 않는 것들의 증거니"
            </p>
            <span className="text-[9px] text-amber-400/80 font-mono">히브리서 11:1</span>
          </div>

          {/* Social Carousel Dots Indicator */}
          <div className="flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1 h-1 rounded-full bg-amber-700" />
            <div className="w-1 h-1 rounded-full bg-amber-700" />
            <div className="w-1 h-1 rounded-full bg-amber-700" />
          </div>
        </motion.div>
      </div>

      {/* Instagram Engagement Bar */}
      <div className="flex items-center justify-between text-[11px] text-amber-200/90 pt-2 border-t border-amber-900/80">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-rose-400 font-bold">
            <span className="material-symbols-outlined text-[15px]">favorite</span>
            1.2K
          </span>
          <span className="flex items-center gap-1 text-amber-200">
            <span className="material-symbols-outlined text-[15px]">chat_bubble</span>
            142
          </span>
          <span className="flex items-center gap-1 text-amber-200">
            <span className="material-symbols-outlined text-[15px]">send</span>
            공유
          </span>
        </div>
        <span className="text-amber-400 font-semibold flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[15px]">bookmark</span>
          카톡 발송 지원
        </span>
      </div>
    </div>
  );
};
