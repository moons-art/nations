import React, { useRef, useState } from 'react';
import { NATIONS_LOGO_URL, NATIONS_ICON_URL } from '../data/products';
import { ActivePage } from '../types';
import { KakaoIcon } from './KakaoIcon';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  onOpenKakao: () => void;
  onOpenDemoModal: (preset?: { type?: 'demo' | 'free_under_100'; product?: string }) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

interface ProductItem {
  id: ActivePage;
  title: string;
  icon: string;
  desc: string;
  url: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'sermon',
    title: '네이션스 Sermon AI',
    icon: 'smart_toy',
    desc: '예배 풀영상에서 설교 릴스 자동 추출 & 목사님 어투 학습 설교문 및 5일치 묵상카드 생성',
    url: 'https://sermon.thenations.kr/',
  },
  {
    id: 'bible',
    title: '네이션스 Bible AI',
    icon: 'menu_book',
    desc: 'AI 주석 제외한 모든 기능 무료',
    url: 'https://bible.thenations.kr/',
  },
  {
    id: 'vote',
    title: '네이션스 Vote',
    icon: 'how_to_vote',
    desc: '100명 미만 개척교회 및 미자립 교회를 위한 무료 투표 지원',
    url: 'https://vote.thenations.kr/',
  },
  {
    id: 'score',
    title: '네이션스 STUDIO(구 악보)',
    icon: 'queue_music',
    desc: '악보 편집, 프린트 기능 무료 (악보, 콘티 라이브러리, 찬양팀 송폼 공유 기능 유료 서비스)',
    url: 'https://studio.thenations.kr/',
  },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activePage: _activePage,
  onSelectPage: _onSelectPage,
  onOpenKakao,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 펼쳐진 제품 상태 Set (화살표에 마우스를 대거나 터치/클릭할 때마다 토글됨)
  const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleScrollTo = (elementId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  // 마우스를 사이드바 패널 밖으로 옮기면 자동 닫기
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 토글 함수: 이미 열려있으면 닫고, 닫혀있으면 엶
  const toggleProductExpand = (id: string, e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // 각 제품의 앱 들어가기 링크 클릭 (새 창 열림)
  const handleLaunchApp = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Outer Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel - Translucent Black Background with Thin Font Weights & Auto-close on MouseLeave */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#0c0d0e]/85 backdrop-blur-xl text-white h-full shadow-[0_0_60px_rgba(0,0,0,0.85)] z-10 flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-200 select-none font-light"
      >
        {/* Header: Nations 로고 (최상단 브랜드 제목은 진한 화이트 유지) */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <img
              alt="NATIONS 아이콘"
              className="h-5 sm:h-6 w-auto object-contain rounded-sm drop-shadow-md"
              src={NATIONS_ICON_URL}
            />
            <img
              alt="NATIONS 로고"
              className="h-4 sm:h-5 w-auto object-contain drop-shadow-md"
              src={NATIONS_LOGO_URL}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        {/* Content Body: Scrollable Dark Minimalist Layout */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[13.5px]">
          {/* Section 1: 제품 메뉴 (오직 앱에 들어가기 위한 메뉴) */}
          <div>
            <div className="mb-2.5 px-2 flex flex-col gap-0.5">
              <span className="text-[11px] font-extralight text-white/45 tracking-wider uppercase">
                제품 웹앱 바로가기
              </span>
              <p className="text-[11px] sm:text-[11.5px] text-[#fb923c] font-light leading-tight">
                원활한 작업을 원하면 pc, 테블릿 접속 권장
              </p>
            </div>

            <div className="space-y-1">
              {PRODUCTS.map((prod) => {
                const isExpanded = expandedProductIds.has(prod.id);

                return (
                  <div key={prod.id} className="rounded-xl transition-all">
                    {/* 제품 행 */}
                    <div
                      className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between transition-colors ${
                        isExpanded ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => toggleProductExpand(prod.id, e)}
                        className="group flex-1 flex items-center gap-2.5 py-1 text-left cursor-pointer transition-colors"
                      >
                        <span
                          className={`material-symbols-outlined text-[17px] transition-colors ${
                            isExpanded ? 'text-white' : 'text-white/50 group-hover:text-white'
                          }`}
                          style={{ fontVariationSettings: "'wght' 200" }}
                        >
                          {prod.icon}
                        </span>
                        <span
                          className={`text-[13px] font-light transition-colors ${
                            isExpanded ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`}
                        >
                          {prod.id === 'sermon' ? (
                            <span>
                              네이션스 Sermon <span className="text-[#FB923C] font-semibold">AI</span>
                            </span>
                          ) : prod.id === 'bible' ? (
                            <span>
                              네이션스 Bible <span className="text-[#FB923C] font-semibold">AI</span>
                            </span>
                          ) : (
                            prod.title
                          )}
                        </span>
                      </button>

                      <button
                        type="button"
                        aria-label={`${prod.title} 메뉴 ${isExpanded ? '접기' : '펼치기'}`}
                        onMouseEnter={(e) => toggleProductExpand(prod.id, e)}
                        onClick={(e) => toggleProductExpand(prod.id, e)}
                        className="p-1.5 -mr-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-white' : 'text-white/45'
                          }`}
                          style={{ fontVariationSettings: "'wght' 200" }}
                        >
                          keyboard_arrow_down
                        </span>
                      </button>
                    </div>

                    {/* 아래 글자와 버튼 */}
                    {isExpanded && (
                      <div className="px-3 pt-1.5 pb-2.5 ml-7 mr-2 space-y-2 animate-in fade-in slide-in-from-top-0.5 duration-150">
                        <p className="text-[11.5px] text-white/55 font-light leading-snug">
                          {prod.desc}
                        </p>

                        <div className="pt-0.5 flex items-center">
                          <button
                            type="button"
                            onClick={(e) => handleLaunchApp(prod.url, e)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C15F3C] hover:bg-[#a94e30] active:scale-[0.97] text-white text-[11.5px] font-normal shadow-xs transition-all cursor-pointer"
                          >
                            <span
                              className="material-symbols-outlined text-[14px] text-white/90"
                              style={{ fontVariationSettings: "'wght' 200" }}
                            >
                              login
                            </span>
                            <span>앱 들어가기</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Nations 안내 */}
          <div className="border-t border-white/10 pt-3">
            <div className="px-2 mb-1.5">
              <span className="text-[11px] font-extralight text-white/45 tracking-wider uppercase">
                Nations 안내
              </span>
            </div>

            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => handleScrollTo('service-guide')}
                className="group w-full px-3 py-2 rounded-xl flex items-center justify-between text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer font-light"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="material-symbols-outlined text-[17px] text-white/50 group-hover:text-white transition-colors"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    church
                  </span>
                  <span className="text-[13px] font-light">서비스 안내</span>
                </div>
                <span
                  className="material-symbols-outlined text-[15px] text-white/30 group-hover:text-white/60 transition-colors"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('ecosystem')}
                className="group w-full px-3 py-2 rounded-xl flex items-center justify-between text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer font-light"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="material-symbols-outlined text-[17px] text-white/50 group-hover:text-white transition-colors"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    hub
                  </span>
                  <span className="text-[13px] font-light">스마트 생태계</span>
                </div>
                <span
                  className="material-symbols-outlined text-[15px] text-white/30 group-hover:text-white/60 transition-colors"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('core-values')}
                className="group w-full px-3 py-2 rounded-xl flex items-center justify-between text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer font-light"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="material-symbols-outlined text-[17px] text-white/50 group-hover:text-white transition-colors"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    verified
                  </span>
                  <span className="text-[13px] font-light">네이션스 가치</span>
                </div>
                <span
                  className="material-symbols-outlined text-[15px] text-white/30 group-hover:text-white/60 transition-colors"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: 하단 카카오 1:1 상담 및 이용약관 / 사업자 정보 */}
        <div className="p-4 border-t border-white/10 bg-black/40 space-y-2.5 font-light">
          {/* Kakao 1:1 상담 버튼 */}
          <div className="flex items-center justify-end text-[12px]">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenKakao();
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#FEE500] hover:bg-[#ffe812] active:scale-[0.98] text-[#371D1E] font-medium flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(254,229,0,0.25)] transition-all cursor-pointer text-[12.5px]"
            >
              <KakaoIcon className="w-4 h-4" />
              <span>1:1 상담</span>
            </button>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-1 font-light">
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              이용약관
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              개인정보처리방침
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() =>
                alert('더네이션스 솔루션\n대표: 유문식\n사업자등록번호: 712-14-02380')
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              사업자정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
