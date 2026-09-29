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
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#C15F3C]/25 rounded-full blur-3xl pointer-events-none" />
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
          <p className="text-[14px] sm:text-[16px] text-white/80 font-medium">
            단순한 성경 읽기 앱은 많습니다.
          </p>

          <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-black text-white leading-snug tracking-tight">
            하지만 우리는 <span className="text-white underline decoration-[#C15F3C] decoration-4 underline-offset-4">설교자의 고뇌를 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] sm:text-[16px] text-white/80 leading-relaxed max-w-xl">
            매주 강단에 오르기 전 말씀을 연구하고 씨름하는 목회자의 심정으로,{' '}
            <strong className="text-white font-semibold">설교 준비의 모든 번잡함을 걷어내고 말씀의 본질에 집중</strong>할 수 있도록 돕습니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[13px] text-white/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>주석 클라우드 실시간 연동</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>다중 역본 병렬 대조</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>절별 주석 설교 라이브러리</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Box (Right Column) */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121826]/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 relative z-10 backdrop-blur-md shadow-2xl border border-slate-800/90 lg:col-span-6 justify-center"
        >
          {/* Q&A 1: PC 프로그램 대비 장점 */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C15F3C] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
                Q
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
                기존에 사용하던 무거운 PC 성경 프로그램에 비해 어떤 실질적 장점이 있나요?
              </h3>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#FFEDD5] text-[#C15F3C] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
                A
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] sm:text-[15px] text-[#FB923C] font-bold leading-snug">
                  네이션스 성경은 무겁지 않으며 언제 어디서나 즉시 이어집니다.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed break-keep-all">
                  복잡하고 난해한 메뉴 대신 목회자가 가장 자주 쓰는 역본 대조와 절별 메모를 직관적으로 배치했습니다. 서재의 PC, 이동 중 스마트폰, 강단 위의 태블릿까지 실시간 클라우드로 완벽 동기화됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          {/* Q&A 2: AI 원어 주석과 개인 주석 활용 */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C15F3C] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
                Q
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
                AI 원어 주석과 개인 주석기능은 어떻게 활용하나요?
              </h3>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#FFEDD5] text-[#C15F3C] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
                A
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] sm:text-[15px] text-[#FB923C] font-bold leading-snug">
                  네이션스 성경은 완벽한 나만의 주석을 추구합니다.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed break-keep-all">
                  AI원어 주석을 통해 구절별, 단어별, 심층 주석을 제공받고, 사용자가 메모해둔 주석과 관주, 설교등이 모두 성경텍스트 안에 구절마다 담겨져 있습니다. 기존의 흩어져 있던 자료들을 찾느라 시간낭비 없이 나만의 주석이 완성됩니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
