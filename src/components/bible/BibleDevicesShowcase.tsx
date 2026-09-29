import React, { useState } from 'react';

export const BibleDevicesShowcase: React.FC<{ onExploreClick?: () => void }> = ({ onExploreClick }) => {
  const [activeTabVersion, setActiveTabVersion] = useState<'all' | 'kor' | 'new' | 'niv'>('all');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      {/* Interactive Controls Bar */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-md border border-slate-200/80 mb-4 flex flex-wrap items-center justify-between gap-3 text-[13px]">
        {/* Versions Toggle */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-500 text-[11.5px] uppercase tracking-wider pl-1">
            역본 대조 모드:
          </span>
          <button
            type="button"
            onClick={() => setActiveTabVersion('all')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[12px] transition-all cursor-pointer ${
              activeTabVersion === 'all'
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3종 동시 대조
          </button>
          <button
            type="button"
            onClick={() => setActiveTabVersion('kor')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[12px] transition-all cursor-pointer ${
              activeTabVersion === 'kor'
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            개역개정
          </button>
          <button
            type="button"
            onClick={() => setActiveTabVersion('new')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[12px] transition-all cursor-pointer ${
              activeTabVersion === 'new'
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            새번역
          </button>
          <button
            type="button"
            onClick={() => setActiveTabVersion('niv')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[12px] transition-all cursor-pointer ${
              activeTabVersion === 'niv'
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            NIV
          </button>
        </div>

        {/* Font size toggle for preacher pulpit */}
        <div className="flex items-center gap-1 text-[11.5px] text-slate-600">
          <span className="text-slate-400">강단 폰트:</span>
          <button
            type="button"
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">format_size</span>
            <span>{fontSize === 'normal' ? '보통' : '크게'}</span>
          </button>
        </div>
      </div>

      {/* Main Tablet & Preacher Desk Showcase */}
      <div className="relative w-full flex items-center justify-center pt-2 pb-4">
        {/* Tablet Mockup */}
        <div className="relative z-20 w-full max-w-2xl bg-[#0f172a] rounded-[28px] p-3 sm:p-4 shadow-[0_24px_50px_rgba(15,23,42,0.22)] border-[5px] border-slate-800">
          <div className="w-full bg-[#fdfdfd] rounded-[20px] overflow-hidden text-slate-900 flex flex-col shadow-inner min-h-[390px] sm:min-h-[440px]">
            {/* Top Preacher Header */}
            <div className="bg-[#1e293b] text-white px-4 py-2.5 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-amber-300">설교 준비 데스크</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-100">로마서 8장 28절</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[11px]">
                  다중 역본 동시 대조
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[11px] hidden sm:inline">
                  클라우드 동기화 완료
                </span>
              </div>
            </div>

            {/* Quick Bible Book Nav */}
            <div className="bg-slate-100 px-4 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11.5px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#006948]">신약 &gt; 로마서 &gt; 8장</span>
                <span className="text-slate-400 text-[11px]">총 39절 중 28절 선택됨</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#006948] font-semibold">
                <span className="material-symbols-outlined text-[15px]">bookmark</span>
                <span>나만의 절별 주석 (3개)</span>
              </div>
            </div>

            {/* Bible Verse Comparison Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3.5 bg-gradient-to-b from-white to-slate-50">
              {/* Romans 8:28 Parallel Grid */}
              <div className="flex flex-col gap-2.5">
                {(activeTabVersion === 'all' || activeTabVersion === 'kor') && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#006948]">
                        개역개정 4판
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Rom 8:28</span>
                    </div>
                    <p className={`text-slate-900 font-medium leading-relaxed mt-1 ${fontSize === 'large' ? 'text-[15.5px]' : 'text-[13.5px]'}`}>
                      우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는{' '}
                      <span className="bg-amber-100 text-amber-900 font-bold px-1 rounded">모든 것이 합력하여 선을 이루느니라</span>
                    </p>
                  </div>
                )}

                {(activeTabVersion === 'all' || activeTabVersion === 'new') && (
                  <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        표준새번역
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Rom 8:28</span>
                    </div>
                    <p className={`text-slate-800 leading-relaxed mt-1 ${fontSize === 'large' ? 'text-[15px]' : 'text-[13px]'}`}>
                      하나님을 사랑하는 사람들, 곧 하나님의 뜻대로 부르심을 받은 사람들에게는, 모든 일이 서로 협력해서 선을 이룬다는 것을 우리는 압니다.
                    </p>
                  </div>
                )}

                {(activeTabVersion === 'all' || activeTabVersion === 'niv') && (
                  <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        NIV (English)
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Rom 8:28</span>
                    </div>
                    <p className={`text-slate-800 font-serif leading-relaxed mt-1 ${fontSize === 'large' ? 'text-[14.5px]' : 'text-[12.5px]'}`}>
                      "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
                    </p>
                  </div>
                )}
              </div>

              {/* Preacher's Personal Verse Note (Bottom Section of Tablet) */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11.5px] font-bold text-amber-900">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-amber-700">edit_note</span>
                    <span>나만의 절별 설교 주석 및 묵상 메모</span>
                  </div>
                  <span className="text-[10.5px] text-amber-700">2026 주일설교 준비</span>
                </div>
                <p className="text-[12px] text-slate-700 leading-relaxed font-sans">
                  '합력하여(sunergei)'는 모든 사건이 독립된 것이 아니라 하나님의 주권 안에서 조화롭게 엮여감을 의미. 고난 속 성도들에게 하나님의 궁극적 선하심을 선포할 것.
                </p>
              </div>
            </div>

            {/* Bottom Footer of Tablet */}
            <div className="px-4 py-2 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">cloud_done</span>
                <span>설교 노트 자동 저장 완료</span>
              </div>
              <span className="text-[#006948] font-bold">소그룹 나눔 묵상 연동 지원</span>
            </div>
          </div>
        </div>

        {/* Left Floating Feature Callout */}
        <div className="hidden lg:block absolute -left-6 bottom-4 z-30 w-52 bg-slate-900 rounded-[24px] p-3 shadow-2xl border-[3px] border-slate-700 transform -rotate-3 hover:rotate-0 transition-transform">
          <div className="bg-white rounded-[18px] p-3 text-[11px] flex flex-col gap-2 shadow-inner">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-amber-800">강단 설교 모드</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[9px] font-bold">
                PULPIT
              </span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              설교 시선에 최적화된 큰 글씨와 절별 하이라이트로 강단에서 원고와 말씀을 막힘없이 확인합니다.
            </p>
          </div>
        </div>

        {/* Right Floating Feature Callout */}
        <div className="hidden lg:block absolute -right-6 top-8 z-30 w-56 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-slate-700 text-white transform rotate-2 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-[12px] mb-1">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>나만의 신학 주석</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            한번 연구한 성경 본문의 주해와 설교 자료가 절별로 영구 축적되어 나만의 평생 설교 라이브러리가 완성됩니다.
          </p>
        </div>
      </div>

      {onExploreClick && (
        <button
          type="button"
          onClick={onExploreClick}
          className="mt-2 text-[12px] font-bold text-[#006948] hover:text-[#00855d] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>네이션스 성경 기능 더 알아보기</span>
          <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
        </button>
      )}
    </div>
  );
};
