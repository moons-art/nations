import React from 'react';
import { motion } from 'motion/react';

interface BottomCtaSectionProps {
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const BottomCtaSection: React.FC<BottomCtaSectionProps> = ({
  onOpenKakao,
  onOpenDemoModal,
}) => {
  return (
    <section className="w-full bg-white/90 rounded-3xl p-6 sm:p-10 lg:p-14 flex flex-col items-center text-center gap-8 shadow-xs border border-slate-200/90" id="service-guide">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#ECFDF5] text-[#006948] flex items-center justify-center shadow-inner ring-4 ring-[#006948]/10"
      >
        <span className="material-symbols-outlined text-[32px] sm:text-[36px]">church</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2 max-w-xl"
      >
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0F172A] leading-tight">
          교회의 디지털 전환,
          <br />
          <span className="text-[#006948]">어디서부터 시작해야 할지 막막하신가요?</span>
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#475569] leading-relaxed">
          교회의 규모와 사역 환경에 맞춘 최적의 솔루션을 1:1로 제안해 드립니다.
          <br />
          <strong className="text-[#0F172A] font-semibold">작은 문의도 성심껏 동역하겠습니다.</strong>
        </p>
      </motion.div>

      {/* Grid container for Reassurance Banner and Action Buttons on Tablet & PC */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full max-w-3xl text-left"
      >
        {/* Reassurance Banner */}
        <div className="w-full bg-slate-50/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-3 border border-[#E2E8F0]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#0F172A] text-[16px] sm:text-[17px] font-bold">
              <span className="material-symbols-outlined text-[#006948] text-[22px]">help_outline</span>
              <span>어떤 사역의 도움이 필요하신가요?</span>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              선거 투표 일정, 교인 명부 이전, 예배 찬양팀 콘티 공유 등 사역 현장의 크고 작은 필요를 친절하게 안내해 드립니다.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200/70 flex items-center gap-1.5 text-[#006948] text-[13px] sm:text-[14px] font-bold">
            <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
            <span>부담 없이 편하게 상담받아 보세요.</span>
          </div>
        </div>

        {/* Direct Inquiry Buttons */}
        <div className="w-full flex flex-col justify-center gap-3">
          <button
            type="button"
            onClick={onOpenKakao}
            className="w-full py-3.5 px-5 bg-[#FEE500] hover:bg-[#ebd300] text-[#371D1E] rounded-xl sm:rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">forum</span>
            <span>카카오채널: 더네이션스 솔루션</span>
          </button>

          <button
            type="button"
            onClick={onOpenDemoModal}
            className="w-full py-3.5 px-5 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl sm:rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#85f8c4] text-[24px]">schedule</span>
            <span>도입 컨설팅 및 데모 시연 예약</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
