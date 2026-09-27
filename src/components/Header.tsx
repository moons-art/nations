import React, { useState, useRef, useEffect } from 'react';
import { NATIONS_LOGO_URL, NATIONS_ICON_URL } from '../data/products';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  onOpenKakao: () => void;
  onOpenMenu: () => void;
  onOpenDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenKakao: _onOpenKakao,
  onOpenMenu,
  onOpenDemoModal: _onOpenDemoModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showVoteTooltip, setShowVoteTooltip] = useState(false);
  const [showStudioTooltip, setShowStudioTooltip] = useState(false);
  const [showBibleTooltip, setShowBibleTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePageChange = (page: ActivePage) => {
    onSelectPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsDropdownOpen(false);
  };

  const handleScrollTo = (id: string) => {
    setIsDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-black/85 via-black/55 to-transparent backdrop-blur-[3px]">
      {/* Main Navigation Bar */}
      <div className="w-full">
        <div className="h-15 sm:h-16 md:h-18 lg:h-20 px-3 sm:px-4 md:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Brand Logo - NATIONS (홈페이지 최상단 NATIONS 앞에 로고 아이콘 추가) */}
          <button
            type="button"
            onClick={() => handlePageChange('vote')}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90 py-1 cursor-pointer shrink-0"
          >
            <img
              alt="NATIONS 아이콘"
              className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] rounded-md"
              src={NATIONS_ICON_URL}
            />
            <img
              alt="NATIONS 로고"
              className="h-4.5 sm:h-6 md:h-7 lg:h-8 w-auto object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
              src={NATIONS_LOGO_URL}
            />
            <span className="sr-only">NATIONS</span>
          </button>

          {/* Desktop & Tablet Navigation Links (sm/md부터 상단 전체 메뉴 노출) */}
          <nav className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[13.5px] md:text-[14.5px] lg:text-[15px] font-normal text-white/90 drop-shadow-md">
            {/* 1. 네이션스 Vote */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setShowVoteTooltip(true)}
              onMouseLeave={() => setShowVoteTooltip(false)}
            >
              <button
                type="button"
                id="nav-tab-vote"
                onClick={() => {
                  handlePageChange('vote');
                  setShowVoteTooltip(prev => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">네이션스 Vote</span>
                {activePage === 'vote' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-[#006948] rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-[#006948]/50 transition-all rounded-full" />
                )}
              </button>

              {/* Vote 서브 텍스트: 네이션스 교회투표 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showVoteTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <span className="whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none">
                  네이션스 교회투표
                </span>
              </div>
            </div>

            {/* 2. 네이션스 Studio */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setShowStudioTooltip(true)}
              onMouseLeave={() => setShowStudioTooltip(false)}
            >
              <button
                type="button"
                id="nav-tab-score"
                onClick={() => {
                  handlePageChange('score');
                  setShowStudioTooltip(prev => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">네이션스 Studio</span>
                {activePage === 'score' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-[#006948] rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-[#006948]/50 transition-all rounded-full" />
                )}
              </button>

              {/* 마우스를 대거나 터치했을 때 나타나는 서브 텍스트: 화살표 없음, 특별한 배경 없음, 메뉴와 같은 폰트 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showStudioTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <span className="whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none">
                  구 네이션스 악보
                </span>
              </div>
            </div>

            {/* 3. 네이션스 Bible */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setShowBibleTooltip(true)}
              onMouseLeave={() => setShowBibleTooltip(false)}
            >
              <button
                type="button"
                id="nav-tab-bible"
                onClick={() => {
                  handlePageChange('bible');
                  setShowBibleTooltip(prev => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">네이션스 Bible</span>
                {activePage === 'bible' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-[#006948] rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-[#006948]/50 transition-all rounded-full" />
                )}
              </button>

              {/* Bible 서브 텍스트: 네이션스 성경 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showBibleTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <span className="whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none">
                  네이션스 성경
                </span>
              </div>
            </div>

            <span className="w-[1px] h-3.5 bg-white/20 mx-0.5 sm:mx-1" />

            {/* 4. Nations 안내 (Hover Dropdown) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2.5 sm:px-3 py-1.5 flex items-center gap-1 cursor-pointer whitespace-nowrap text-white/90 hover:text-white font-normal"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span>Nations 안내</span>
                <span
                  className={`material-symbols-outlined text-[17px] sm:text-[18px] transition-transform duration-200 text-white/75 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu - 연한 검은색 배경에 아이콘 없이 아담한 텍스트로만 구성 */}
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="w-36 py-1.5 px-1 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-xl flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleScrollTo('service-guide')}
                      className="w-full text-center px-3 py-1.5 text-[13px] font-normal text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      서비스 안내
                    </button>
                    <button
                      type="button"
                      onClick={() => handleScrollTo('ecosystem')}
                      className="w-full text-center px-3 py-1.5 text-[13px] font-normal text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      스마트 생태계
                    </button>
                    <button
                      type="button"
                      onClick={() => handleScrollTo('core-values')}
                      className="w-full text-center px-3 py-1.5 text-[13px] font-normal text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      네이션스 가치
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Text-Only Selector: 글자 크기를 키우고 Vote, Studio, Bible 로 변경 */}
          <div className="flex sm:hidden items-center gap-3 xs:gap-4 shrink-0">
            {/* Mobile Vote */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  handlePageChange('vote');
                  setShowVoteTooltip(prev => !prev);
                  setShowStudioTooltip(false);
                  setShowBibleTooltip(false);
                }}
                className="relative text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>Vote</span>
                {activePage === 'vote' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#006948] rounded-full" />
                )}
              </button>

              {/* 모바일 Vote 터치 시 아래에 표시되는 네이션스 교회투표 */}
              {showVoteTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap">
                  <span className="text-[12px] font-normal text-white/90 drop-shadow-md select-none">
                    네이션스 교회투표
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Studio */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  handlePageChange('score');
                  setShowStudioTooltip(prev => !prev);
                  setShowVoteTooltip(false);
                  setShowBibleTooltip(false);
                }}
                className="relative text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>Studio</span>
                {activePage === 'score' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#006948] rounded-full" />
                )}
              </button>

              {/* 모바일 Studio 터치 시 아래에 표시되는 구 네이션스 악보 */}
              {showStudioTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap">
                  <span className="text-[12px] font-normal text-white/90 drop-shadow-md select-none">
                    구 네이션스 악보
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Bible */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  handlePageChange('bible');
                  setShowBibleTooltip(prev => !prev);
                  setShowVoteTooltip(false);
                  setShowStudioTooltip(false);
                }}
                className="relative text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>Bible</span>
                {activePage === 'bible' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#006948] rounded-full" />
                )}
              </button>

              {/* 모바일 Bible 터치 시 아래에 표시되는 네이션스 성경 */}
              {showBibleTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap">
                  <span className="text-[12px] font-normal text-white/90 drop-shadow-md select-none">
                    네이션스 성경
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action: Menu Button (마우스만 대도 열리도록 onMouseEnter 추가) */}
          <div className="flex items-center">
            <button
              onClick={onOpenMenu}
              onMouseEnter={onOpenMenu}
              aria-label="전체 메뉴 열기"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/20 active:scale-95 transition-colors cursor-pointer drop-shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px] md:text-[26px]">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
