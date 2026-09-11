import React, { useState } from 'react';

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
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl z-10 overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Yellow Header */}
        <div className="p-4 bg-[#FEE500] text-[#371D1E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">forum</span>
            <span className="font-bold text-[16px]">카카오톡 1:1 상담 안내</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#371D1E] hover:bg-black/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FEE500]/20 flex items-center justify-center text-[#371D1E]">
            <span className="material-symbols-outlined text-[36px]">chat</span>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-[17px] font-bold text-[#0F172A]">
              카카오톡 채널 [더네이션스 솔루션]
            </h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              친절하고 빠르게 실시간 1:1 상담을 도와드립니다.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-[12px] text-slate-600 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">채널명:</span>
              <span className="font-bold text-slate-800">더네이션스 솔루션</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">상담 시간:</span>
              <span className="font-medium text-slate-700">월~금 09:00 ~ 18:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">상담 시간 외:</span>
              <span className="font-medium text-slate-600">답변이 늦을 수 있습니다.</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="http://pf.kakao.com/_cxjBxaX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#FEE500] hover:brightness-95 active:scale-[0.98] text-[#371D1E] rounded-xl text-[14px] font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>카카오톡 1:1 상담 바로가기</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>

            <button
              type="button"
              onClick={handleCopyChannel}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[12.5px] font-medium transition-colors flex items-center justify-center gap-1"
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
