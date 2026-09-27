import React, { useState } from 'react';
import { NATIONS_ICON_URL, NATIONS_LOGO_ORIG_URL } from '../data/products';

interface KakaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoForm?: () => void;
}

export const KakaoModal: React.FC<KakaoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyChannel = () => {
    navigator.clipboard.writeText('더네이션스 솔루션');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm bg-white text-[#2D2A26] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] z-10 overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Top Close Button (헤더 노란색 배경 줄 완전 삭제) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Content */}
        <div className="p-6 pt-7 flex flex-col gap-4 text-center">
          {/* 중간 네이션스 로고 (배경 카드 없이 순수 로고) */}
          <div className="mx-auto flex items-center justify-center gap-2 pt-1 pb-1">
            <img
              alt="NATIONS 아이콘"
              className="h-8 w-auto object-contain rounded-md"
              src={NATIONS_ICON_URL}
            />
            <img
              alt="NATIONS 로고"
              className="h-6 w-auto object-contain"
              src={NATIONS_LOGO_ORIG_URL}
            />
          </div>

          <p className="text-[13.5px] text-[#64748B] leading-relaxed -mt-1">
            친절하고 빠르게 실시간 1:1 상담을 도와드립니다.
          </p>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-left text-[12px] text-[#475569] space-y-1.5 shadow-2xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">채널명:</span>
              <span className="font-bold text-[#0F172A]">더네이션스 솔루션</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">상담 시간:</span>
              <span className="font-medium text-[#0F172A]">월~금 09:00 ~ 18:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">상담 시간 외:</span>
              <span className="font-medium text-slate-500">답변이 늦을 수 있습니다.</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <a
              href="http://pf.kakao.com/_cxjBxaX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#FEE500] hover:brightness-95 active:scale-[0.98] text-[#371D1E] rounded-xl text-[14px] font-bold shadow-2xs border border-[#EBD300] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>카카오톡 1:1 상담 바로가기</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>

            <button
              type="button"
              onClick={handleCopyChannel}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-xl text-[12.5px] font-medium transition-colors flex items-center justify-center gap-1 border border-slate-200/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? '채널명이 복사되었습니다' : '채널명 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
