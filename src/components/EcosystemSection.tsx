import React from 'react';
import { motion } from 'motion/react';
import { ProductItem } from '../types';
import { PRODUCTS_LIST } from '../data/products';
import { TriplePhoneMockup } from './hero-devices/TriplePhoneMockup';

interface EcosystemSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  highlightedProductId?: string | null;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onSelectProduct,
  highlightedProductId,
}) => {
  return (
    <section className="w-full flex flex-col gap-8" id="ecosystem">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center justify-center gap-1.5 text-[#006948] text-[13px] sm:text-[14px] font-bold tracking-wide">
          <span className="material-symbols-outlined text-[18px]">hub</span>
          <span>ALL-IN-ONE MINISTRY ECOSYSTEM</span>
        </div>
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0F172A] leading-tight">
          교회를 돕는 모든 것,
          <br className="sm:hidden" />
          {' '}NATIONS 스마트 생태계
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#475569] max-w-xl mx-auto">
          예배, 행정, 선거, 양육까지 하나로 이어지는 통합 미니스트리 솔루션
        </p>
      </motion.div>

      {/* 5 Product Cards: Responsive 2 or 3-Column Grid on Tablet & PC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {PRODUCTS_LIST.map((product, index) => {
          const isHighlighted = highlightedProductId === product.id;

          return (
            <motion.div
              key={product.id}
              id={`product-${product.id}`}
              onClick={() => onSelectProduct(product)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 border transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1 ${
                isHighlighted
                  ? 'border-[#006948] ring-4 ring-[#006948]/20 shadow-lg bg-emerald-50/20 scale-[1.02]'
                  : 'border-[#E2E8F0] hover:border-[#006948]/60'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">{product.icon}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                      product.badgeColor === 'emerald'
                        ? 'bg-[#ECFDF5] text-[#006948]'
                        : 'bg-[#eff4ff] text-[#475569]'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0F172A] group-hover:text-[#006948] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[13px] text-[#006948] font-semibold">
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  상세 기능 및 특장점 보기
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Showcase Highlight Banner: Expanded on Tablet & PC */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-[#E2E8F0]"
      >
        <div className="flex flex-col gap-4 max-w-xl lg:max-w-[360px] xl:max-w-[420px] shrink-0">
          <div className="flex items-center gap-2 text-[#006948] text-[13px] font-bold">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
            <span>통합 미니스트리 클라우드</span>
          </div>

          <h3 className="text-[20px] sm:text-[24px] lg:text-[26px] font-extrabold text-[#0F172A] leading-snug">
            성도와 교역자 모두가 편안한
            <br />
            스마트 목회 환경의 구축
          </h3>

          <p className="text-[14px] sm:text-[15px] text-[#475569] leading-relaxed">
            복잡한 프로그램 설치 없이 웹과 모바일 앱 어디서나 유기적으로 연동됩니다. 데이터 분실 우려 없는 클라우드 백업과 보안 체계로 사역의 안정을 약속합니다.
          </p>

          {/* Ecosystem Badge Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[13px] text-[#0F172A] font-medium">
              교회투표 시스템
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[13px] text-[#0F172A] font-medium">
              예배 찬양 콘티 뷰어
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#eff4ff] text-[13px] text-[#0F172A] font-medium">
              스마트 교적 ERP
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[13px] text-[#006948] font-bold">
              셀·구역 목양 모바일
            </span>
          </div>
        </div>

        {/* 3 Mobile Screens Showcase: 본인 인증 + 대기 화면 + 투표 화면 */}
        <div className="w-full lg:flex-1 min-w-0 rounded-2xl bg-[#f8fafc] p-3 sm:p-4 border border-slate-200/80 shadow-xs flex items-center justify-center overflow-hidden">
          <TriplePhoneMockup />
        </div>
      </motion.div>
    </section>
  );
};
