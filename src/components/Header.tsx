import React from 'react';
import { NATIONS_LOGO_URL } from '../data/products';

interface HeaderProps {
  onOpenKakao: () => void;
  onOpenMenu: () => void;
  onOpenDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKakao,
  onOpenMenu,
  onOpenDemoModal,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-black/60 via-black/30 to-transparent">
      {/* Main Navigation Bar */}
      <div className="transition-all">
        <div className="h-18 md:h-20 px-4 md:px-8 max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo - NATIONS English Only */}
          <a href="#" className="flex items-center gap-2 group transition-opacity hover:opacity-90 py-1">
            <img
              alt="NATIONS 로고"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
              src={NATIONS_LOGO_URL}
            />
            <span className="sr-only">NATIONS</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-white/95 drop-shadow-md">
            <a href="#core-values" className="hover:text-[#85f8c4] transition-colors">
              네이션스 가치
            </a>
            <a href="#product-vote" className="hover:text-[#85f8c4] transition-colors">
              교회투표
            </a>
            <a href="#ecosystem" className="hover:text-[#85f8c4] transition-colors">
              스마트 생태계
            </a>
            <a href="#differentiation" className="hover:text-[#85f8c4] transition-colors">
              서비스 안내
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Green '문의하기' CTA Button (Matching Screenshot 1 & 2) */}
            <button
              onClick={onOpenDemoModal}
              type="button"
              className="min-h-[40px] px-4 py-2 flex items-center justify-center gap-1.5 bg-[#16a34a]/95 hover:bg-[#15803d] active:scale-95 rounded-lg text-white text-[13px] sm:text-[14px] font-bold transition-all shadow-lg cursor-pointer border border-[#85f8c4]/40 backdrop-blur-xs"
            >
              <span>문의하기</span>
            </button>

            {/* Mobile / Full Menu Hamburger Button */}
            <button
              onClick={onOpenMenu}
              aria-label="메뉴 열기"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/20 active:scale-95 transition-colors cursor-pointer drop-shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

