import React from 'react';
import { motion } from 'motion/react';
import { usePageImages } from '../../services/imageStorage';
import { CoreCardImageSlot } from '../common/CoreCardImageSlot';

export const BibleCoreValuesSection: React.FC = () => {
  const images = usePageImages('bible');

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
            설교준비 어디서든 가능합니다.
          </h2>
          <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal break-keep-all">
            나만의 주석책을 만들어요
          </p>

          {/* 무료로 앱 이용하기 버튼 */}
          <div className="pt-3 sm:pt-4">
            <a
              href="https://bible.thenations.kr/"
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
          {/* Row 1: 가볍고 쉬운 나만의 설교 데스크 */}
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
                가볍고 쉬운 나만의 설교 데스크
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                복잡하고 무거운 성경 소프트웨어 대신, 말씀 묵상과 설교 원고 작성에만 온전히 집중할 수 있는 설교 워크스페이스를 제공합니다. 태블릿과 노트북, 데스크탑 어디서나 1초 만에 즉시 접속가능합니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[0]}
                altText="설교자를 위한 맞춤 설교데스크"
                gradientClass="bg-gradient-to-br from-[#EAE6F5] via-[#E4E8F7] to-[#D5DCF5]"
              />
            </div>
          </motion.div>

          {/* Row 2: 역본 동시 대조 & AI 원어 주석 (Alternating) */}
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
                altText="다중 역본 동시 대조 및 원어 사전"
                gradientClass="bg-gradient-to-br from-[#E3F5EC] via-[#E8F3EE] to-[#D6EBE0]"
              />
            </div>

            {/* Right Text (Desktop) */}
            <div className="order-first lg:order-last lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all">
                역본 동시 대조 & AI 원어 주석
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                여러 번역본을 멀티뷰로 대조하고, AI 원어 주석 으로 단어 하나하나에 담긴 원문 시제와 깊은 의미를 바로 확인하세요.
              </p>
            </div>
          </motion.div>

          {/* Row 3: 흩어진 자료를 통합하여 나만의 주석책 */}
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
                흩어진 자료를 통합하여 나만의 주석책
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                오랜기간 설교를 하다보면, 모든 자료가 흩어집니다. 한번 참고한 자료를 다시 참고해야하는 번거로움 없이 성경구절마다 나만의 주석, 노트, 관주, 설교를 보관할수 있습니다. 수년 전의 은혜의 메시지도 성경 구절 검색 한 번으로 즉시 되살아납니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[2]}
                altText="성경 본문 연동 설교 아카이빙"
                gradientClass="bg-gradient-to-br from-[#FFF3E6] via-[#FCEEE2] to-[#F7DFCD]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
