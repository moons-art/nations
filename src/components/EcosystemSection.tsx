import React from 'react';
import { ProductItem } from '../types';
import { PRODUCTS_LIST, CORE_POINT_IMAGES } from '../data/products';

interface EcosystemSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  highlightedProductId?: string | null;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onSelectProduct,
  highlightedProductId,
}) => {
  return (
    <section className="px-4 py-8 flex flex-col gap-6 max-w-lg mx-auto w-full" id="product-lineup">
      <div className="flex flex-col gap-1 text-center">
        <div className="inline-flex items-center justify-center gap-1 text-[#006948] text-[13px] font-semibold">
          <span className="material-symbols-outlined text-[16px]">hub</span>
          <span>All-in-One Ministry Ecosystem</span>
        </div>
        <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] leading-tight">
          교회를 돕는 모든 것,
          <br />
          NATIONS 스마트 생태계
        </h2>
        <p className="text-[13px] text-[#475569]">
          예배, 행정, 선거, 양육까지 하나로 이어지는 통합 미니스트리 솔루션
        </p>
      </div>

      {/* 5 Product Cards */}
      <div className="flex flex-col gap-3">
        {PRODUCTS_LIST.map((product) => {
          const isHighlighted = highlightedProductId === product.id;

          return (
            <div
              key={product.id}
              id={`product-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className={`bg-white rounded-2xl p-4 shadow-xs flex items-start gap-3.5 border transition-all cursor-pointer group ${
                isHighlighted
                  ? 'border-[#006948] ring-2 ring-[#006948]/30 shadow-md bg-emerald-50/20 scale-[1.01]'
                  : 'border-[#E2E8F0] hover:border-[#006948]/50 hover:shadow-sm'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">{product.icon}</span>
              </div>

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[16px] font-bold text-[#0F172A] group-hover:text-[#006948] transition-colors">
                    {product.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      product.badgeColor === 'emerald'
                        ? 'bg-[#ECFDF5] text-[#006948]'
                        : 'bg-[#eff4ff] text-[#475569]'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-1 mt-0.5 text-[12px] text-[#006948] font-medium">
                  <span className="inline-flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    상세 기능 및 특장점 보기
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Showcase Highlight Banner */}
      <div className="bg-white rounded-3xl p-5 shadow-xs flex flex-col gap-3.5 mt-2 border border-[#E2E8F0]">
        <div className="flex items-center gap-1.5 text-[#006948] text-[12px] font-bold">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>통합 미니스트리 클라우드</span>
        </div>

        <h3 className="text-[18px] font-bold text-[#0F172A] leading-snug">
          성도와 교역자 모두가 편안한
          <br />
          스마트 목회 환경의 구축
        </h3>

        <p className="text-[13px] text-[#475569] leading-relaxed">
          복잡한 프로그램 설치 없이 웹과 모바일 앱 어디서나 유기적으로 연동됩니다. 데이터 분실 우려 없는 클라우드 백업과 보안 체계로 사역의 안정을 약속합니다.
        </p>

        {/* Ecosystem Badge Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[12px] text-[#0F172A] font-medium">
            교회투표 시스템
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[12px] text-[#0F172A] font-medium">
            예배 찬양 콘티 뷰어
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[12px] text-[#0F172A] font-medium">
            스마트 교적 ERP
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#ECFDF5] text-[12px] text-[#006948] font-semibold">
            셀·구역 목양 모바일
          </span>
        </div>

        <div className="w-full rounded-2xl overflow-hidden mt-1 bg-slate-100 shadow-inner">
          <img
            className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
            alt="Clean minimal mobile interface mockup showing church management app"
            src={CORE_POINT_IMAGES.showcase}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
