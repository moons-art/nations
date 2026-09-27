import React from 'react';

interface FixedBottomBarProps {
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  onOpenKakao,
  onOpenDemoModal,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,23,42,0.08)] border-t border-slate-100">
      <div className="max-w-lg mx-auto px-4 py-2 flex items-center gap-2.5">
        {/* Kakao Button: 1:1 상담 */}
        <button
          type="button"
          onClick={onOpenKakao}
          className="flex-1 min-h-[48px] px-3 bg-[#FEE500] hover:bg-[#ebd300] active:scale-[0.98] text-[#371D1E] rounded-xl flex items-center justify-center gap-1.5 text-[14px] font-bold shadow-[0_2px_8px_rgba(254,229,0,0.3)] transition-all text-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">forum</span>
          <span>1:1 상담</span>
        </button>

        {/* Demo Request Button */}
        <button
          type="button"
          onClick={onOpenDemoModal}
          className="flex-1 min-h-[48px] px-3 bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-semibold shadow-[0_4px_14px_rgba(0,105,72,0.25)] transition-colors text-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-[#85f8c4]">apps</span>
          <span>앱 들어가기</span>
        </button>
      </div>
    </nav>
  );
};
