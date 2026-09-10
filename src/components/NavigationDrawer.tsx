import React from 'react';
import { NATIONS_LOGO_ORIG_URL } from '../data/products';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKakao: () => void;
  onOpenDemoModal: (preset?: { type?: 'demo' | 'free_under_100'; product?: string }) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenKakao,
  onOpenDemoModal,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (targetId?: string) => {
    onClose();
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col pt-safe animate-in slide-in-from-right duration-200">
        {/* Top bar */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <img alt="NATIONS 로고" className="h-6 w-auto object-contain" src={NATIONS_LOGO_ORIG_URL} />
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 text-[15px] font-medium text-slate-700">
          <div className="mb-2 p-3 bg-[#ECFDF5] rounded-xl border border-[#006948]/20 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#006948] uppercase tracking-wider">Special Offer</span>
            <p className="text-[13px] text-slate-800 font-semibold">100명 미만 미자립/개척교회</p>
            <button
              onClick={() => {
                onClose();
                onOpenDemoModal({ type: 'free_under_100' });
              }}
              className="mt-1 w-full py-2 bg-[#006948] hover:bg-[#00855d] text-white rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              무료 도입 혜택 신청
            </button>
          </div>

          <button
            onClick={() => handleLinkClick('core-values')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#006948]">verified</span>
              네이션스 가치
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </button>

          <button
            onClick={() => handleLinkClick('product-vote')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#006948]">how_to_vote</span>
              교회투표
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </button>

          <button
            onClick={() => handleLinkClick('product-lineup')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#006948]">hub</span>
              스마트 생태계
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </button>

          <button
            onClick={() => handleLinkClick('differentiation')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#006948]">church</span>
              서비스 안내
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </button>

          <div className="my-2 border-t border-slate-100" />

          <button
            onClick={() => {
              onClose();
              onOpenDemoModal({ type: 'demo' });
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-slate-800"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#006948]">schedule</span>
              도입 컨설팅 & 데모 예약
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenKakao();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-amber-50 flex items-center justify-between text-slate-900 bg-amber-50/50"
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-amber-600">forum</span>
              카카오톡 실시간 상담
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FEE500] text-[#371D1E]">채널</span>
          </button>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[12px] text-slate-500 flex flex-col gap-2">
          <p className="font-medium text-slate-700">NATIONS 솔루션 | 교회를 돕는 모든 것</p>
          <div className="flex items-center gap-2 text-slate-400">
            <button onClick={onOpenTerms} className="hover:underline">
              이용약관
            </button>
            <span>·</span>
            <button onClick={onOpenPrivacy} className="hover:underline">
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
