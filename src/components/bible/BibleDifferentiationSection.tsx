import React from 'react';
import { motion } from 'motion/react';

interface BibleDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const BibleDifferentiationSection: React.FC<BibleDifferentiationSectionProps> = ({
  onOpenKakao,
}) => {
  return (
    <section
      id="bible-differentiation"
      className="w-full bg-[#080B11] text-white relative overflow-hidden border-y border-slate-800/90 shadow-2xl"
    >
      {/* Glow ambient background */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#006948]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Inner Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
        {/* Contrast Callout (Left Column) */}
        <motion.div
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center gap-4 lg:col-span-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-[#85f8c4] text-[12px] font-bold w-max border border-slate-800 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>NATIONS BIBLE DIFFERENTIATION</span>
          </div>

          <p className="text-[14px] sm:text-[16px] text-slate-400 font-medium">
            단순한 성경 읽기 앱은 많습니다.
          </p>

          <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-black text-white leading-snug tracking-tight">
            하지만 우리는 <span className="text-[#85f8c4] underline decoration-[#006948] decoration-4 underline-offset-4">설교자의 고뇌를 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
            매주 강단에 오르기 전 말씀을 연구하고 씨름하는 목회자의 심정으로,{' '}
            <strong className="text-[#85f8c4] font-semibold">설교 준비의 모든 번잡함을 걷어내고 말씀의 본질에 집중</strong>할 수 있도록 돕습니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[13px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>초경량 1초 실행 & 클라우드 연동</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>다중 역본 실시간 병렬 대조</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>평생 축적되는 절별 설교 라이브러리</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Box (Right Column) */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121826]/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-4 relative z-10 backdrop-blur-md shadow-2xl border border-slate-800/90 lg:col-span-6 justify-center"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
              Q
            </span>
            <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
              기존에 사용하던 무거운 PC 성경 프로그램에 비해 어떤 실질적 장점이 있나요?
            </h3>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
              A
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[14px] sm:text-[15px] text-[#85f8c4] font-bold leading-snug">
                네이션스 성경은 무겁지 않으며 언제 어디서나 즉시 이어집니다.
              </p>
              <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                복잡하고 난해한 메뉴 대신 목회자가 가장 자주 쓰는 역본 대조와 절별 메모를 직관적으로 배치했습니다. 서재의 PC, 이동 중 스마트폰, 강단 위의 태블릿까지 실시간 클라우드로 완벽 동기화됩니다.
              </p>
            </div>
          </div>

          {/* Warm Reassurance Note */}
          <div className="p-3.5 rounded-xl bg-[#006948]/20 text-[#85f8c4] text-[13px] sm:text-[14px] leading-relaxed border border-[#006948]/40 mt-1">
            📖 말씀 연구에 들이는 깊은 시간과 노력이 흩어지지 않도록,{' '}
            <strong className="text-white font-semibold">목회자님만의 영구한 성경 신학 자산으로 축적</strong>해 드립니다.
          </div>

          <button
            type="button"
            onClick={onOpenKakao}
            className="mt-2 w-full py-3.5 px-4 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg border border-[#85f8c4]/30"
          >
            <span>성경 도구 카카오톡으로 자세히 문의하기</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
