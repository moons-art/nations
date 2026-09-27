import React from 'react';
import { motion } from 'motion/react';

interface ScoreDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const ScoreDifferentiationSection: React.FC<ScoreDifferentiationSectionProps> = ({
  onOpenKakao,
}) => {
  return (
    <section
      id="score-differentiation"
      className="w-full bg-[#080B11] text-white relative overflow-hidden border-y border-slate-800/90 shadow-2xl"
    >
      {/* Glow ambient background */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#006948]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-[#85f8c4]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Inner Content: Max width 6xl, centered */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
        {/* Contrast Callout (Left Column on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center gap-4 lg:col-span-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-[#85f8c4] text-[12px] font-bold w-max border border-slate-800 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>DIFFERENTIATION</span>
          </div>

          <p className="text-[14px] sm:text-[16px] text-slate-400 font-medium">
            단순한 PDF 앱은 많습니다.
          </p>

          <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-black text-white leading-snug tracking-tight">
            하지만 우리는 <span className="text-[#85f8c4] underline decoration-[#006948] decoration-4 underline-offset-4">예배 현장을 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] sm:text-[16px] text-slate-300 leading-relaxed max-w-xl">
            찬양 사역자와 반주자의 호흡, 기도의 사모함과 잔잔한 긴장감까지 속속들이 이해하는 전문가 그룹이{' '}
            <strong className="text-[#85f8c4] font-semibold">예배의 언어로 시스템을 구축</strong>합니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[13px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>찬양인도자 맞춤 설계</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>찬양팀 실시간 악보, 송품, 카피곡 유튜브 연동</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#85f8c4]" />
              <span>회중용 악보 뷰어 제공</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Box (Right Column on large screens) */}
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
              악보와 콘티는 어디서나 볼수 있나요?
            </h3>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
              A
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[14px] sm:text-[15px] text-[#85f8c4] font-bold leading-snug">
                네이션스의 모든 솔루션은 &apos;현장 중심&apos;으로 설계됩니다.
              </p>
              <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed">
                네이션스 악보의 모든 데이터는 안전하게 클라우드에 저장되어 전세계 어디에서든 접속이 가능합니다. 또한 찬양팀 플랫폼, 회중용 플랫폼이 따로 제공되어 모든 기기에서 접속이 가능합니다.
              </p>
            </div>
          </div>

          {/* Warm Reassurance Note */}
          <div className="p-3.5 rounded-xl bg-[#006948]/20 text-[#85f8c4] text-[13px] sm:text-[14px] leading-relaxed border border-[#006948]/40 mt-1">
            💡 <strong className="text-white font-semibold">악보준비를 위한 번거로움을 내려놓고 오직 기도와 찬양의 영성에만 집중할 수 있는 단순함</strong>이 네이션스의 원칙입니다.
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

