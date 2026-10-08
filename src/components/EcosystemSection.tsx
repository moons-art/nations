import React from 'react';
import { motion } from 'motion/react';
import { ProductItem } from '../types';
import { PRODUCTS_LIST } from '../data/products';
import { MonochromeYouTubeIcon } from './common/MonochromeYouTubeIcon';

interface EcosystemSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  highlightedProductId?: string | null;
  isSermonPage?: boolean;
}

const SHORT_INTROS: Record<string, string> = {
  sermon: '유튜브 링크로 설교 숏폼 5개 & 주일 묵상카드 완성',
  bible: '다중 역본 대조와 설교자를 위한 나만의 주석 노트',
  vote: '90% 시간 단축, 실시간 집계 무설치 모바일 교회투표',
  score: '악보 라이브러리 편집부터 찬양팀 실시간 동기화',
  erp: '어려운 행정을 덜어낸 간결한 올인원 스마트 교적관리',
  group: '구역·셀 모임의 은혜로운 삶의 나눔과 기도제목 공유',
};

const renderTitleWithAi = (title: string) => {
  if (title.includes('AI')) {
    const parts = title.split('AI');
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && <span className="text-[#FB923C] font-bold">AI</span>}
          </React.Fragment>
        ))}
      </>
    );
  }
  return title;
};

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onSelectProduct,
  highlightedProductId,
  isSermonPage: _isSermonPage,
}) => {
  return (
    <section className="w-full flex flex-col gap-8" id="ecosystem">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center justify-center gap-1.5 text-black text-[12px] sm:text-[13px] font-bold tracking-wide">
          <span className="material-symbols-outlined text-[16px] text-black">hub</span>
          <span className="text-black">ALL-IN-ONE MINISTRY ECOSYSTEM</span>
        </div>
        <h2 className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-[#0F172A] leading-tight">
          교회를 돕는 모든 것,
          <br className="sm:hidden" />
          {' '}NATIONS 스마트 생태계
        </h2>
        <p className="text-[13px] sm:text-[14px] text-[#475569] max-w-xl mx-auto">
          설교, 찬양, 미디어, 행정, 선거, 소그룹 까지 하나로 이어지는 미니스트리 솔루션
        </p>
      </motion.div>

      {/* 모든 페이지 공통: 옆으로 흐르는 작은 카드 (아이콘, 이름, 짧은 한토막 소개, 배경선 없음) */}
      <div className="relative w-full overflow-hidden py-1">
        <style>{`
          @keyframes sermonMarqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .sermon-marquee-track {
            display: flex;
            gap: 14px;
            width: max-content;
            animation: sermonMarqueeScroll 40s linear infinite;
            will-change: transform;
          }
          .sermon-marquee-track:hover,
          .sermon-marquee-track:focus-within {
            animation-play-state: paused;
          }
        `}</style>

        {/* 좌우 부드러운 그라데이션 페이드 마스크 */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#f8f9ff] via-[#f8f9ff]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#f8f9ff] via-[#f8f9ff]/70 to-transparent z-10" />

        {/* 가로로 흐르는 트랙 */}
        <div className="sermon-marquee-track py-2">
          {[...PRODUCTS_LIST, ...PRODUCTS_LIST, ...PRODUCTS_LIST, ...PRODUCTS_LIST].map(
            (product, idx) => {
              const isHighlighted = highlightedProductId === product.id;
              const shortIntro = SHORT_INTROS[product.id] || product.badge;

              return (
                <div
                  key={`${product.id}-${idx}`}
                  id={idx < PRODUCTS_LIST.length ? `product-${product.id}` : undefined}
                  onClick={() => onSelectProduct(product)}
                  className={`w-[260px] sm:w-[285px] shrink-0 bg-white rounded-2xl p-4 sm:p-4.5 transition-all duration-200 cursor-pointer select-none group flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-lg hover:-translate-y-1 ${
                    isHighlighted
                      ? 'ring-2 ring-slate-900/15 bg-slate-50/90 shadow-md'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8.5 h-8.5 rounded-xl bg-slate-100/90 flex items-center justify-center shrink-0 group-hover:bg-[#0F172A] group-hover:text-white transition-colors text-slate-800">
                      {product.icon === 'youtube' ? (
                        <MonochromeYouTubeIcon size={19} className="shrink-0" />
                      ) : (
                        <span className="material-symbols-outlined text-[20px] leading-none">
                          {product.icon}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#0F172A] group-hover:text-black transition-colors leading-snug break-keep-all truncate">
                      {renderTitleWithAi(product.name)}
                    </h3>
                  </div>

                  <p className="text-[12px] sm:text-[12.5px] text-[#64748B] font-normal leading-relaxed break-keep-all line-clamp-2">
                    {shortIntro}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};
