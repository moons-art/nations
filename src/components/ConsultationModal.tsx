import React, { useState } from 'react';
import { NATIONS_ICON_URL } from '../data/products';
import { MonochromeYouTubeIcon } from './common/MonochromeYouTubeIcon';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset?: {
    type?: 'demo' | 'free_under_100' | 'consultation';
    product?: string;
  };
  onSubmitSuccess?: (data: any) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSermonAppClick = () => {
    window.open('https://sermon.thenations.kr/', '_blank', 'noopener,noreferrer');
  };

  const handleVoteAppClick = () => {
    window.open('https://vote.thenations.kr/', '_blank', 'noopener,noreferrer');
  };

  const handleScoreAppClick = () => {
    window.open('https://studio.thenations.kr/', '_blank', 'noopener,noreferrer');
  };

  const handleBibleAppClick = () => {
    window.open('https://bible.thenations.kr/', '_blank', 'noopener,noreferrer');
  };

  const handleRenewalClick = (appName: string) => {
    showToast(`${appName} 앱은 현재 더 나은 서비스를 위해 리뉴얼 중입니다.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Pitch Black Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-[6px] transition-opacity"
        onClick={onClose}
      />

      {/* Pure White Modal Container */}
      <div className="relative w-full max-w-lg bg-white text-[#2D2A26] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] z-10 max-h-[72vh] sm:max-h-[76vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#111827] border border-slate-700 text-white text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#D97706]">build</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header: White background with subtle border */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-slate-200 bg-white flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
            <img
              src={NATIONS_ICON_URL}
              alt="NATIONS"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-xs border border-slate-200 mt-0.5 shrink-0"
            />
            <div className="flex flex-col min-w-0 text-left">
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0F172A] tracking-tight">
                네이션스 앱 들어가기
              </h3>
              <div className="mt-1.5 text-[11px] sm:text-[12px] text-slate-500 font-normal leading-snug sm:leading-relaxed break-keep-all">
                <p>네이션스 앱은 다운로드 없이 사이트에 들어가서 이용하는 웹앱입니다.</p>
                <p className="mt-0.5">pc, 테블릿에서 사용하면 훨씬 편하게 쓰실 수 있습니다.</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content Body: White background */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 bg-white">
          <div className="max-w-[420px] mx-auto w-full divide-y divide-slate-100">
          
            {/* Item 0: 네이션스 sermon AI */}
            <div className="pb-5 pt-1 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="text-black shrink-0 flex items-center justify-center">
                    <MonochromeYouTubeIcon size={19} className="text-black" />
                  </div>
                  <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                    네이션스 Sermon <span className="text-[#EA580C] font-black">AI</span>
                  </h4>
                </div>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-medium text-black border border-black shrink-0">
                  쇼츠·릴스 & 묵상카드 AI
                </span>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                예배 전체 영상에서 핵심 설교를 자동 추출하여 릴스로 제작하고, 목사님의 어투를 학습한 완성형 설교문과 6일치 묵상카드를 생성합니다.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={handleSermonAppClick}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 Sermon AI 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Item 1: 네이션스 교회투표 */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[19px] sm:text-[20px] text-black shrink-0">
                    how_to_vote
                  </span>
                  <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                    네이션스 교회투표
                  </h4>
                </div>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-medium text-black border border-black shrink-0">
                  100명 미만 교회 무료
                </span>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                100명 미만 개척교회 및 미자립 교회의 사역을 위해 교회투표앱의 모든 기능을 무료로 지원합니다.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={handleVoteAppClick}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 교회투표 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Item 2: 네이션스 스튜디오(구 네이션스 악보) */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[19px] sm:text-[20px] text-black shrink-0">
                    queue_music
                  </span>
                  <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                    네이션스 스튜디오(구 네이션스 악보)
                  </h4>
                </div>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-medium text-black border border-black shrink-0">
                  악보편집, 프린트 무료
                </span>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                찬양팀 콘티와 스마트 디지털 악보 뷰어, 악보 프린트, 찬양팀과 악보, 카피곡 유튜브, 송품 공유 한 번에 관리하세요.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={handleScoreAppClick}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 스튜디오 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Item 3: 네이션스 성경 */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-[19px] sm:text-[20px] text-black shrink-0">
                  menu_book
                </span>
                <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                  네이션스 성경
                </h4>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                개역개정 다역본 대조, 원어 스트롱코드, 교차 참조(Cross-reference), 신구약 인물 및 지명 맥락 분석을 지원하는 올인원 성경 연구 도구입니다.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={handleBibleAppClick}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 성경 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Item 4: 네이션스 교회관리 (리뉴얼 중) */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-[19px] sm:text-[20px] text-black shrink-0">
                  church
                </span>
                <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                  네이션스 교회관리
                </h4>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                교인 교적, 재정·헌금 관리, 온라인 기부금 영수증 자동 발급, 카카오톡 알림톡 연동까지 한눈에 관리하는 스마트 목회 ERP입니다.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={() => handleRenewalClick('네이션스 교회관리')}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 교회관리 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white">build</span>
              </button>
            </div>

            {/* Item 5: 네이션스 소그룹 (리뉴얼 중) */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-[19px] sm:text-[20px] text-black shrink-0">
                  diversity_3
                </span>
                <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#0F172A] tracking-tight">
                  네이션스 소그룹
                </h4>
              </div>

              <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed break-keep-all text-left">
                구역, 셀, 목장 모임의 나눔과 기도제목 공유, 모임 보고서 작성까지 손끝에서 살아나는 교제와 양육 네트워크입니다.
              </p>

              {/* App Launch Button */}
              <button
                type="button"
                onClick={() => handleRenewalClick('네이션스 소그룹')}
                className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#111827] hover:bg-black active:scale-[0.98] text-white rounded-xl text-[13.5px] sm:text-[14px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer group text-center"
              >
                <span className="text-white">네이션스 소그룹 앱 들어가기</span>
                <span className="material-symbols-outlined text-[17px] text-white">build</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
