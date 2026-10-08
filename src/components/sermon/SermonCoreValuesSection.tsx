import React from 'react';
import { motion } from 'motion/react';
import { usePageImages } from '../../services/imageStorage';
import { CoreCardImageSlot } from '../common/CoreCardImageSlot';

export const SermonCoreValuesSection: React.FC = () => {
  const images = usePageImages('sermon');

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
            AI 매니저가 알아서 만듭니다.
          </h2>
          <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal break-keep-all">
            링크 하나로 끝나요
          </p>

          {/* 무료로 앱 이용하기 버튼 */}
          <div className="pt-3 sm:pt-4">
            <a
              href="https://sermon.thenations.kr/"
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
          {/* Row 1: 유튜브 링크 하나로 은혜로운 숏폼 5개 완성 */}
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
                유튜브 링크 하나로<br />
                은혜로운 숏폼 5개 완성
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                예배 전체영상도 괜찮습니다. AI가 설교의 핵심 구간을 찾아냅니다. 설교문만 올려도 AI 음성으로 영상이 완성됩니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[0]}
                altText="유튜브 링크 하나로 은혜로운 숏폼 5개 완성"
                gradientClass="bg-gradient-to-br from-[#EAE6F5] via-[#E4E8F7] to-[#D5DCF5]"
              />
            </div>
          </motion.div>

          {/* Row 2: 목사님 고유의 설교톤 학습 (Alternating) */}
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
                altText="목사님 고유의 설교톤 학습"
                gradientClass="bg-gradient-to-br from-[#E3F5EC] via-[#E8F3EE] to-[#D6EBE0]"
              />
            </div>

            {/* Right Text (Desktop) */}
            <div className="order-first lg:order-last lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all">
                목사님 고유의<br className="hidden sm:inline" /> 설교톤 학습
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                교정되지 않은 설교문, 설교 아이디어도 AI가 목사님의 설교톤으로 완성해 드립니다.
              </p>
            </div>
          </motion.div>

          {/* Row 3: 인스타, 카카오톡 카드뉴스 */}
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
                인스타, 카카오톡<br className="hidden sm:inline" /> 카드뉴스
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                편집 수고 없이도 주일설교 요약카드, 6일치 묵상카드가 뚝딱 완성됩니다.
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[2]}
                altText="인스타, 카카오톡 카드뉴스"
                gradientClass="bg-gradient-to-br from-[#FFF3E6] via-[#FCEEE2] to-[#F7DFCD]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
