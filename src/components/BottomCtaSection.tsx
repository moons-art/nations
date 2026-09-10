import React from 'react';

interface BottomCtaSectionProps {
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const BottomCtaSection: React.FC<BottomCtaSectionProps> = ({
  onOpenKakao,
  onOpenDemoModal,
}) => {
  return (
    <section className="px-4 py-10 flex flex-col items-center text-center gap-6 max-w-lg mx-auto w-full" id="contact">
      <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#006948] flex items-center justify-center shadow-inner ring-4 ring-[#006948]/10">
        <span className="material-symbols-outlined text-[32px]">church</span>
      </div>

      <div className="flex flex-col gap-1.5 max-w-md">
        <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] leading-tight">
          교회의 디지털 전환,
          <br />
          <span className="text-[#006948] font-extrabold">어디서부터 시작해야 할지 막막하신가요?</span>
        </h2>
        <p className="text-[14px] text-[#475569] leading-relaxed px-1">
          교회의 규모와 사역 환경에 맞춘 최적의 솔루션을 1:1로 제안해 드립니다.
          <br />
          <strong className="text-[#0F172A] font-semibold">작은 문의도 성심껏 동역하겠습니다.</strong>
        </p>
      </div>

      {/* Reassurance Banner */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-1.5 text-left border border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-[#0F172A] text-[16px] font-bold">
          <span className="material-symbols-outlined text-[#006948] text-[20px]">help_outline</span>
          <span>어떤 사역의 도움이 필요하신가요?</span>
        </div>
        <p className="text-[13px] text-[#475569] leading-relaxed">
          선거 투표 일정, 교인 명부 이전, 예배 찬양팀 콘티 공유 등 사역 현장의 크고 작은 필요를 친절하게 안내해 드립니다.
        </p>
        <div className="mt-1 pt-1 flex items-center gap-1.5 text-[#006948] text-[13px] font-semibold">
          <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
          <span>부담 없이 편하게 상담받아 보세요.</span>
        </div>
      </div>

      {/* Direct Inquiry Buttons */}
      <div className="w-full flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onOpenKakao}
          className="w-full py-3 px-4 bg-[#FEE500] hover:bg-[#ebd300] text-[#371D1E] rounded-xl text-[15px] font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">forum</span>
          <span>카카오채널: 더네이션스 솔루션</span>
        </button>

        <button
          type="button"
          onClick={onOpenDemoModal}
          className="w-full py-3 px-4 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl text-[15px] font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#85f8c4] text-[22px]">schedule</span>
          <span>도입 컨설팅 및 데모 시연 예약</span>
        </button>
      </div>
    </section>
  );
};
