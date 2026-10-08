import React from 'react';
import { motion } from 'motion/react';
import { usePageImages } from '../services/imageStorage';
import { CoreCardImageSlot } from './common/CoreCardImageSlot';

export const CoreValuesSection: React.FC = () => {
  const images = usePageImages('vote');

  return (
    <section
      className="w-full bg-[#F8F9FD] py-16 sm:py-24 border-y border-slate-200/80"
      id="core-values"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-center items-center gap-1.5 max-w-3xl mx-auto mb-2 sm:mb-4"
        >
          <h2 className="text-[19px] sm:text-[23px] md:text-[27px] font-bold text-[#0F172A] tracking-tight leading-tight break-keep-all">
            90% 이상 시간을 줄입니다.
          </h2>
          <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal break-keep-all">
            투표가 즐겁습니다.
          </p>

          {/* 무료로 앱 이용하기 버튼 */}
          <div className="pt-3 sm:pt-4">
            <a
              href="https://vote.thenations.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#0F172A] hover:bg-black text-white text-[13.5px] sm:text-[14.5px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>무료로 앱 이용하기</span>
              <span className="material-symbols-outlined text-[17px] font-medium">arrow_forward</span>
            </a>
          </div>
        </motion.div>

        {/* 3 Core Points List - Alternating 2-Column Showcase */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Row 1: 시간과 재정을 아끼는 사역 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all">
                시간과 재정을 아끼는 사역
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                매번 반복되는 종이 인쇄, 수작업 명부 대조, 복잡한 수기 정리를 모바일 원스톱으로 진행됩니다. 예산과 시간을 획기적으로 아낍니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[0]}
                altText="현장 상황실 실시간 집계 현황 및 사역 효율 스마트 목회 대시보드"
                gradientClass="bg-gradient-to-br from-[#EAE6F5] via-[#E4E8F7] to-[#D5DCF5]"
              />
            </div>
          </motion.div>

          {/* Row 2: 어르신부터 청년까지 (Alternating) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Visual Box (Desktop) */}
            <div className="order-last lg:order-first lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[1]}
                altText="어르신부터 청년까지 누구나 쉽게 사용하는 스마트폰 모바일 투표 준비 화면"
                gradientClass="bg-gradient-to-br from-[#E3F5EC] via-[#E8F3EE] to-[#D6EBE0]"
              />
            </div>

            {/* Right Text (Desktop) */}
            <div className="order-first lg:order-last lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all">
                어르신부터 청년까지
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                시스템은 고도화하되 사용법은 직관적으로 설계됩니다. 앱 설치 없이 QR과 링크 하나로 어르신 성도까지 막힘없이 참여할 수 있습니다.
              </p>
            </div>
          </motion.div>

          {/* Row 3: 너무나 쉬운 실시간 현장 관리 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all">
                너무나 쉬운 실시간 현장 관리
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                선거관리위원-현장데스크-도우미-방송실-실시간 현황 프레젠테이션까지 버튼 하나로 진행됩니다. 특별한 훈련없이 누구나 운영할수 있습니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[2]}
                altText="교회의 안전과 신뢰를 지키는 철저한 암호화 데이터 보안 체계"
                gradientClass="bg-gradient-to-br from-[#FFF3E6] via-[#FCEEE2] to-[#F7DFCD]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
