import React from 'react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestDemo: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestDemo,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-10 max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-[#eff4ff] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">{product.icon}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#006948] uppercase tracking-wider">
                {product.badge}
              </span>
              <h3 className="text-[18px] font-bold text-[#0F172A]">{product.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 text-[13px]">
          {/* Main Description */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-normal">
            {product.description}
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {product.highlights.map((h, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-semibold flex items-center gap-1 border border-[#006948]/10"
              >
                <span className="material-symbols-outlined text-[14px]">check</span>
                {h}
              </span>
            ))}
          </div>

          {/* Key Features List */}
          <div className="flex flex-col gap-2.5 mt-1">
            <h4 className="font-bold text-slate-800 text-[14px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006948] text-[18px]">
                verified
              </span>
              핵심 상세 기능
            </h4>
            <div className="flex flex-col gap-2">
              {product.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white flex flex-col gap-1"
                >
                  <div className="font-bold text-slate-900 text-[13px] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#006948] text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {feat.title}
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed pl-6.5">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Use Cases */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <span className="font-bold text-slate-900 block mb-1 text-[13px]">
              📌 추천 사역 현장
            </span>
            <p className="text-[12.5px] text-slate-600 leading-relaxed">{product.targetUseCase}</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-[13px]"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestDemo(product.name);
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold transition-all text-[14px] flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>{product.name} 도입 데모 신청</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
