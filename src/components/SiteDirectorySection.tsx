import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProductItem } from '../types';
import { PRODUCTS_LIST } from '../data/products';

interface SiteDirectorySectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenKakao: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const SiteDirectorySection: React.FC<SiteDirectorySectionProps> = ({
  onSelectProduct,
  onOpenKakao,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  return (
    <section className="w-full pt-6 pb-10" id="site-directory">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-8"
      >
        {/* Top Header: 원래 있었던 cloud 아이콘과 함께 가로로 시원하게 펼쳐진 헤더와 설명 문구 */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1.5 pb-4 border-b border-slate-200/90">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-black shrink-0">cloud</span>
            <h3 className="text-[14px] sm:text-[15.5px] md:text-[17px] font-bold text-[#0F172A] tracking-tight break-keep-all">
              간편한 스마트 목회 환경을 추구합니다.
            </h3>
          </div>
          <p className="text-[11.5px] sm:text-[12px] text-[#64748B] font-normal break-keep-all">
            복잡한 설치 없이 웹과 모바일 앱이 어디서나 유기적으로 연동됩니다.
          </p>
        </div>

        {/* 4 Columns Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 text-left">
          {/* Column 1: 제품 (Products) */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[12px] sm:text-[12.5px] font-bold text-[#0F172A]">
              제품 (Products)
            </h4>
            <ul className="flex flex-col gap-1.5 text-[11px] sm:text-[11.5px] text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const prod = PRODUCTS_LIST.find((p) => p.id === 'sermon');
                    if (prod) onSelectProduct(prod);
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  NATIONS SERMON AI (숏폼 미디어)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const prod = PRODUCTS_LIST.find((p) => p.id === 'vote');
                    if (prod) onSelectProduct(prod);
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  NATIONS VOTE (교회 스마트 투표)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const prod = PRODUCTS_LIST.find((p) => p.id === 'score');
                    if (prod) onSelectProduct(prod);
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  네이션스 스튜디오 (구 악보)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const prod = PRODUCTS_LIST.find((p) => p.id === 'bible');
                    if (prod) onSelectProduct(prod);
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  NATIONS BIBLE AI (나만의 주석)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const prod = PRODUCTS_LIST.find((p) => p.id === 'erp');
                    if (prod) onSelectProduct(prod);
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  NATIONS CHURCH (교회 관리)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: 요금안내 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[12px] sm:text-[12.5px] font-bold text-[#0F172A]">
              요금안내
            </h4>
            <ul className="flex flex-col gap-1.5 text-[11px] sm:text-[11.5px] text-[#64748B]">
              <li>가입 후: 무료 서비스</li>
              <li>유료요금: 앱에 내부 안내</li>
            </ul>
          </div>

          {/* Column 3: 고객지원센터 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[12px] sm:text-[12.5px] font-bold text-[#0F172A]">
              고객지원센터
            </h4>
            <ul className="flex flex-col gap-1.5 text-[11px] sm:text-[11.5px] text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={onOpenKakao}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  1:1 카톡 문의하기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('differentiation') || document.getElementById('service-guide');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  자주 묻는 질문 (FAQ)
                </button>
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setShowBusinessInfo(!showBusinessInfo)}
                  className="hover:text-black transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span>사업자 정보 확인</span>
                  <span className="material-symbols-outlined text-[14px] text-slate-400">
                    {showBusinessInfo ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {showBusinessInfo && (
                  <div className="mt-2 p-2.5 bg-white border border-slate-200/90 rounded-xl shadow-md text-[10.5px] sm:text-[11px] text-slate-600 leading-relaxed animate-in fade-in duration-150">
                    <p className="font-semibold text-slate-800">더네이션스 솔루션</p>
                    <p>대표자: 유문식</p>
                    <p>사업자등록번호: 712-14-02380</p>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Column 4: 법률 및 정책 */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[12px] sm:text-[12.5px] font-bold text-[#0F172A]">
              법률 및 정책
            </h4>
            <ul className="flex flex-col gap-1.5 text-[11px] sm:text-[11.5px] text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  서비스 이용약관
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-black transition-colors text-left cursor-pointer"
                >
                  개인정보 처리방침
                </button>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
