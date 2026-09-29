import React from 'react';
import { KakaoIcon } from './KakaoIcon';

interface FixedBottomBarProps {
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  onOpenKakao,
  onOpenDemoModal,
}) => {
  return (
    <aside
      aria-label="빠른 실행 플로팅 메뉴"
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto select-none"
    >
      {/* 1. 앱 들어가기 플로팅 원형 버튼 (클로드 주황색) */}
      <div className="relative group">
        <button
          type="button"
          onClick={onOpenDemoModal}
          aria-label="앱 들어가기"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#C15F3C] hover:bg-[#a94e30] active:scale-95 text-white shadow-[0_6px_20px_rgba(193,95,60,0.4)] hover:shadow-[0_8px_24px_rgba(193,95,60,0.5)] border border-white/20 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] leading-none">
            apps
          </span>
          <span className="text-[10px] sm:text-[10.5px] font-bold leading-none mt-0.5">
            앱
          </span>
        </button>

        {/* Desktop Tooltip */}
        <span className="hidden sm:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/85 text-white text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md">
          앱 들어가기
        </span>
      </div>

      {/* 2. 1:1 상담 플로팅 원형 버튼 (카카오 옐로우) */}
      <div className="relative group">
        <button
          type="button"
          onClick={onOpenKakao}
          aria-label="1:1 상담"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FEE500] hover:bg-[#ffd800] active:scale-95 text-[#371D1E] shadow-[0_6px_20px_rgba(254,229,0,0.4)] hover:shadow-[0_8px_24px_rgba(254,229,0,0.5)] border border-[#ebd300] flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
        >
          <KakaoIcon className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] leading-none" />
          <span className="text-[10px] sm:text-[10.5px] font-bold leading-none mt-0.5">
            상담
          </span>
        </button>

        {/* Desktop Tooltip */}
        <span className="hidden sm:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/85 text-white text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md">
          1:1 실시간 상담
        </span>
      </div>
    </aside>
  );
};
