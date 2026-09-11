import React from 'react';
import { motion } from 'motion/react';

interface DifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const DifferentiationSection: React.FC<DifferentiationSectionProps> = ({
  onOpenKakao,
}) => {
  return (
    <section className="w-full bg-[#080B11] text-white relative overflow-hidden border-y border-slate-800/90 shadow-2xl">
      {/* Glow ambient background */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#006948]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-[#85f8c4]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Inner Content: Max width 6xl, centered */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
        {/* Contrast Callout (Left Column on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center gap-4 lg:col-span-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-[#85f8c4] text-[12px] font-bold w-max border border-slate-800 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>DIFFERENTIATION</span>
          </div>

          <p className="text-[14px] sm:text-[16px] text-slate-400 font-medium">
            단순한 앱 개발 회사는 많습니다.
          </p>

          <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-black text-white leading-snug tracking-tight">
            하지만 우리는 <span className="text-[#85f8c4] underline decoration-[#006948] decoration-4 underline-offset-4">교회를 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
            교회 현장의 질서와 정서, 예배의 거룩함을 완벽히 이해하는 전문가 그룹이{' '}
            <strong className="text-[#85f8c4] font-semibold">사역의 언어로 시스템을 구축</strong>합니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[13px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>목회 현장 맞춤 설계</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>전 연령 배려 UI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>철저한 교인 보안</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Box (Right Column on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#121826]/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-4 relative z-10 backdrop-blur-md shadow-2xl border border-slate-800/90 lg:col-span-6 justify-center"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
              Q
            </span>
            <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
              스마트 시스템 도입 시 어르신들이 어려워하지 않을까요?
            </h3>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
              A
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[14px] sm:text-[15px] text-[#85f8c4] font-bold leading-snug">
                네이션스의 모든 솔루션은 '현장 중심'으로 설계됩니다.
              </p>
              <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                직관적인 화면 구성은 물론, 대리 인증 및 종이 투표 병행 가이드 등 현장 맞춤형 매뉴얼을 함께 제공하여 단 한 명의 성도도 소외되지 않도록 돕습니다.
              </p>
            </div>
          </div>

          {/* Warm Reassurance Note */}
          <div className="p-3.5 rounded-xl bg-[#006948]/20 text-[#85f8c4] text-[13px] sm:text-[14px] leading-relaxed border border-[#006948]/40 mt-1">
            💡 IT 전문 지식이 없는 목회자와 성도님도{' '}
            <strong className="text-white font-semibold">별도의 교육 없이 바로 쓸 수 있는 단순함</strong>이 네이션스의 원칙입니다.
          </div>

          <button
            type="button"
            onClick={onOpenKakao}
            className="mt-2 w-full py-3.5 px-4 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg border border-[#85f8c4]/30"
          >
            <span>카카오톡으로 자세히 문의하기</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
