import React, { useState, useRef, useEffect } from 'react';
import { NATIONS_LOGO_URL, NATIONS_ICON_URL } from '../data/products';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenKakao: _onOpenKakao,
  onOpenDemoModal: _onOpenDemoModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSermonTooltip, setShowSermonTooltip] = useState(false);
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
    if (id === 'differentiation' || id === 'qna') {
      const element =
        document.getElementById('sermon-differentiation') ||
        document.getElementById('differentiation') ||
        document.getElementById('score-differentiation') ||
        document.getElementById('bible-differentiation');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
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

          {/* Desktop & Tablet Navigation Links (sm/md부터 상단 전체 메뉴 노출 - 메뉴순서: 설교ai, 투표, 스튜디오, 바이블) */}
          <nav className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[13.5px] md:text-[14.5px] lg:text-[15px] font-normal text-white/90 drop-shadow-md">
            {/* 1. 네이션스 Sermon AI (AI는 주황색) */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setShowSermonTooltip(true)}
              onMouseLeave={() => setShowSermonTooltip(false)}
            >
              <button
                type="button"
                id="nav-tab-sermon"
                onClick={() => {
                  handlePageChange('sermon');
                  setShowSermonTooltip((prev) => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">
                  네이션스 Sermon <span className="text-[#FB923C] font-bold">AI</span>
                </span>
                {activePage === 'sermon' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-white rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-white/40 transition-all rounded-full" />
                )}
              </button>

              {/* Sermon AI 서브 텍스트: 네이션스 설교 AI & 설교숏폼 제작앱 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showSermonTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <div className="flex flex-col items-center whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none leading-tight">
                  <span>네이션스 설교 <span className="text-[#FB923C] font-bold">AI</span></span>
                  <span>설교숏폼 제작앱</span>
                </div>
              </div>
            </div>

            {/* 2. 네이션스 Vote */}
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
                  setShowVoteTooltip((prev) => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">네이션스 Vote</span>
                {activePage === 'vote' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-white rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-white/40 transition-all rounded-full" />
                )}
              </button>

              {/* Vote 서브 텍스트: 네이션스 교회투표 & 직분자선거, 총회앱 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showVoteTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <div className="flex flex-col items-center whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none leading-tight">
                  <span>네이션스 교회투표</span>
                  <span>직분자선거, 총회앱</span>
                </div>
              </div>
            </div>

            {/* 3. 네이션스 Studio */}
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
                  setShowStudioTooltip((prev) => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">네이션스 Studio</span>
                {activePage === 'score' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-white rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-white/40 transition-all rounded-full" />
                )}
              </button>

              {/* 마우스를 대거나 터치했을 때 나타나는 서브 텍스트: 구 네이션스 악보 & 찬양인도자 앱 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showStudioTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <div className="flex flex-col items-center whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none leading-tight">
                  <span>구 네이션스 악보</span>
                  <span>찬양인도자 앱</span>
                </div>
              </div>
            </div>

            {/* 4. 네이션스 Bible AI (AI는 주황색) */}
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
                  setShowBibleTooltip((prev) => !prev);
                }}
                className="relative px-2.5 sm:px-3 py-1.5 transition-all cursor-pointer whitespace-nowrap text-white/90 hover:text-white"
              >
                <span className="font-normal">
                  네이션스 Bible <span className="text-[#FB923C] font-bold">AI</span>
                </span>
                {activePage === 'bible' ? (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-white rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-transparent group-hover:bg-white/40 transition-all rounded-full" />
                )}
              </button>

              {/* Bible AI 서브 텍스트: 네이션스 성경AI & 나만의 주석앱 */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-150 pointer-events-none ${
                  showBibleTooltip
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                <div className="flex flex-col items-center whitespace-nowrap text-[13px] md:text-[14px] font-normal text-white/90 drop-shadow-md select-none leading-tight">
                  <span>네이션스 성경<span className="text-[#FB923C] font-bold">AI</span></span>
                  <span>나만의 주석앱</span>
                </div>
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
                      onClick={() => handleScrollTo('differentiation')}
                      className="w-full text-center px-3 py-1.5 text-[13px] font-normal text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      Q&A
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Text-Only Selector: 글자 크기를 키우고 설교ai, Vote, Studio, Bible 순서로 노출 */}
          <div className="flex sm:hidden items-center gap-2 xs:gap-3 shrink-0">
            {/* Mobile sermon AI */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  handlePageChange('sermon');
                  setShowSermonTooltip((prev) => !prev);
                  setShowVoteTooltip(false);
                  setShowStudioTooltip(false);
                  setShowBibleTooltip(false);
                }}
                className="relative text-[13px] xs:text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>
                  Sermon <span className="text-[#FB923C] font-bold">AI</span>
                </span>
                {activePage === 'sermon' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
                )}
              </button>

              {/* 모바일 sermon AI 터치 시 아래에 표시되는 네이션스 설교 AI & 설교숏폼 제작앱 */}
              {showSermonTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap z-50">
                  <div className="flex flex-col items-center text-[11px] font-normal text-white/95 drop-shadow-md select-none bg-black/80 px-2 py-1 rounded leading-tight">
                    <span>네이션스 설교 <span className="text-[#FB923C] font-bold">AI</span></span>
                    <span>설교숏폼 제작앱</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Vote */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => {
                  handlePageChange('vote');
                  setShowVoteTooltip(prev => !prev);
                  setShowSermonTooltip(false);
                  setShowStudioTooltip(false);
                  setShowBibleTooltip(false);
                }}
                className="relative text-[13px] xs:text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>Vote</span>
                {activePage === 'vote' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
                )}
              </button>

              {/* 모바일 Vote 터치 시 아래에 표시되는 네이션스 교회투표 & 직분자선거, 총회앱 */}
              {showVoteTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap z-50">
                  <div className="flex flex-col items-center text-[11px] font-normal text-white/95 drop-shadow-md select-none bg-black/80 px-2 py-1 rounded leading-tight">
                    <span>네이션스 교회투표</span>
                    <span>직분자선거, 총회앱</span>
                  </div>
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
                  setShowSermonTooltip(false);
                  setShowVoteTooltip(false);
                  setShowBibleTooltip(false);
                }}
                className="relative text-[13px] xs:text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>Studio</span>
                {activePage === 'score' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
                )}
              </button>

              {/* 모바일 Studio 터치 시 아래에 표시되는 구 네이션스 악보 & 찬양인도자 앱 */}
              {showStudioTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap z-50">
                  <div className="flex flex-col items-center text-[11px] font-normal text-white/95 drop-shadow-md select-none bg-black/80 px-2 py-1 rounded leading-tight">
                    <span>구 네이션스 악보</span>
                    <span>찬양인도자 앱</span>
                  </div>
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
                  setShowSermonTooltip(false);
                  setShowVoteTooltip(false);
                  setShowStudioTooltip(false);
                }}
                className="relative text-[13px] xs:text-[14px] tracking-tight transition-all cursor-pointer whitespace-nowrap py-1 text-white font-normal"
              >
                <span>
                  Bible <span className="text-[#FB923C] font-bold">AI</span>
                </span>
                {activePage === 'bible' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full" />
                )}
              </button>

              {/* 모바일 Bible 터치 시 아래에 표시되는 네이션스 성경AI & 나만의 주석앱 */}
              {showBibleTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 pointer-events-none whitespace-nowrap z-50">
                  <div className="flex flex-col items-center text-[11px] font-normal text-white/95 drop-shadow-md select-none bg-black/80 px-2 py-1 rounded leading-tight">
                    <span>네이션스 성경<span className="text-[#FB923C] font-bold">AI</span></span>
                    <span>나만의 주석앱</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
