import React, { useState } from 'react';
import { ProductItem, ActivePage } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestDemo?: (productName: string) => void;
  onNavigateToPage?: (page: ActivePage) => void;
  onOpenKakao?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestDemo: _onRequestDemo,
  onNavigateToPage: _onNavigateToPage,
  onOpenKakao,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!product) return null;

  const isBible = product.id === 'bible' || product.name.includes('성경');
  const isRenewal = product.id === 'erp' || product.id === 'group' || product.name.includes('교회관리') || product.name.includes('소그룹');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAppLaunch = () => {
    if (isRenewal) {
      showToast(`${product.name} 앱은 현재 더 나은 서비스를 위해 리뉴얼 중입니다.`);
      return;
    }
    if (product.appUrl) {
      onClose();
      window.open(product.appUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] bg-slate-900/95 border border-amber-400 text-amber-300 text-[13.5px] font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <span className="material-symbols-outlined text-[19px]">build</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] text-[#2D2A26] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(45,42,38,0.2)] z-10 max-h-[85vh] flex flex-col overflow-hidden border border-[#E8E2D9] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#F4EFEA] border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#C15F3C] flex items-center justify-center border border-[#E8E2D9] shadow-2xs">
              <span className="material-symbols-outlined text-[24px]">{product.icon}</span>
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-black border border-black inline-block uppercase">
                {product.id === 'score'
                  ? '악보편집, 프린트 무료'
                  : product.id === 'bible'
                  ? 'AI주석외 모든 기능 무료'
                  : product.id === 'vote'
                  ? '100명 미만 교회 무료'
                  : product.badge}
              </span>
              <h3 className="text-[18px] font-bold text-[#2D2A26]">{product.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#78716C] hover:text-[#2D2A26] hover:bg-[#EAE4DC] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 text-[13px] bg-[#FAF8F5]">
          {/* 이런 분에게 추천합니다 / 이런 교회에 추천합니다 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] text-[#57534E]">
            <span className="font-semibold text-[#2D2A26] block mb-1 text-[13px]">
              {isBible ? '이런 분에게 추천합니다.' : '이런 교회에 추천합니다.'}
            </span>
            <p className="text-[13px] text-[#78716C] leading-relaxed font-normal">
              {product.targetUseCase}
            </p>
          </div>

          {/* Main Description */}
          <div className="p-3.5 bg-white rounded-xl border border-[#E8E2D9] text-[#57534E] leading-relaxed font-normal">
            {product.description}
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {product.highlights.map((h, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-[#F4EFEA] text-[#2D2A26] text-[12px] font-medium flex items-center gap-1 border border-[#E8E2D9]"
              >
                <span className="material-symbols-outlined text-[14px] text-[#C15F3C] select-none" aria-hidden="true">check</span>
                {h}
              </span>
            ))}
          </div>

          {/* Key Features List */}
          <div className="flex flex-col gap-2.5 mt-1">
            <h4 className="font-bold text-[#2D2A26] text-[14px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C15F3C] text-[18px]">
                verified
              </span>
              핵심 상세 기능
            </h4>
            <div className="flex flex-col gap-2">
              {product.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#E8E2D9] hover:border-[#D6CCC2] transition-colors bg-white flex flex-col gap-1 shadow-2xs"
                >
                  <div className="font-bold text-[#2D2A26] text-[13px] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#F4EFEA] text-[#C15F3C] text-[11px] font-bold flex items-center justify-center shrink-0 border border-[#E8E2D9]">
                      {idx + 1}
                    </span>
                    {feat.title}
                  </div>
                  <p className="text-[12.5px] text-[#78716C] leading-relaxed pl-6.5">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-[#E8E2D9] bg-[#F4EFEA] flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#D6CCC2] text-[#57534E] font-medium hover:bg-[#EAE4DC] transition-colors text-[13px] cursor-pointer"
            >
              닫기
            </button>

            {/* 1:1 문의 버튼 */}
            {onOpenKakao && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenKakao();
                }}
                className="py-2.5 px-3.5 rounded-xl bg-[#FEE500] hover:bg-[#ffe812] active:scale-[0.98] text-[#371D1E] font-bold flex items-center justify-center gap-1.5 shadow-2xs border border-[#EBD300] transition-all cursor-pointer text-[13px]"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>1:1 문의</span>
              </button>
            )}

            {/* 메인 액션 버튼: 각 제품별 앱 바로가기 */}
            <button
              type="button"
              id={`goto-${product.id}-app-btn`}
              onClick={handleAppLaunch}
              className={`flex-1 py-2.5 rounded-xl text-white font-medium transition-all text-[14px] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98] ${
                isRenewal
                  ? 'bg-[#78716C] hover:bg-[#57534E]'
                  : 'bg-[#2D2A26] hover:bg-[#1A1816]'
              }`}
            >
              <span>{product.name} 앱 바로가기</span>
              <span className="material-symbols-outlined text-[17px]">
                {isRenewal ? 'build' : 'open_in_new'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
