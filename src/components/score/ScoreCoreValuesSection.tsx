import React from 'react';
import { motion } from 'motion/react';
import { usePageImages } from '../../services/imageStorage';
import { useSiteIntro } from '../../services/siteIntroStorage';
import { CoreCardImageSlot } from '../common/CoreCardImageSlot';

export const ScoreCoreValuesSection: React.FC = () => {
  const images = usePageImages('score');
  const intro = useSiteIntro('score');

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
            {intro.subHeadingLine1 || '악보준비 번거롭지 않습니다.'}
          </h2>
          <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal break-keep-all">
            {intro.subHeadingLine2 || '편하고 쉽게 관리해요'}
          </p>

          {/* 무료로 앱 이용하기 버튼 */}
          <div className="pt-3 sm:pt-4">
            <a
              href="https://studio.thenations.kr/"
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
          {/* Row 1: 번거로움에서 벗어나세요 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all whitespace-pre-line">
                {intro.corePoints?.[0]?.title || '매번 반복하는 작업에서 벗어나세요'}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                {intro.corePoints?.[0]?.desc || '매번 반복되는 악보찾기, 복잡한 편집과 종이 출력의 번거로움에서 벗어나세요. 악보라이브러리, 악보편집, 악보출력, 악보뷰어까지 경험많은 예배전문가가 예배의 언어로 만들었습니다.'}
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[0]}
                altText={intro.corePoints?.[0]?.title || '송폼 자동 정리 콘티 편집'}
                gradientClass="bg-gradient-to-br from-[#EAE6F5] via-[#E4E8F7] to-[#D5DCF5]"
              />
            </div>
          </motion.div>

          {/* Row 2: 찬양팀 페이지로 함께 공유해요. (Alternating) */}
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
                altText={intro.corePoints?.[1]?.title || '찬양팀 실시간 동기화 마스터뷰'}
                gradientClass="bg-gradient-to-br from-[#E3F5EC] via-[#E8F3EE] to-[#D6EBE0]"
              />
            </div>

            {/* Right Text (Desktop) */}
            <div className="order-first lg:order-last lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all whitespace-pre-line">
                {intro.corePoints?.[1]?.title || '찬양팀 페이지로 함께 공유해요.'}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                {intro.corePoints?.[1]?.desc || '기도로 채워진 콘티와 송폼, 카피곡 유튜브 영상이 찬양팀에게 실시간으로 동기화됩니다. 콘티와 송품은 라이브러리에 관리되고 팀원간의 체팅과 소통이 원할해 집니다.'}
              </p>
            </div>
          </motion.div>

          {/* Row 3: 누구나 악보를 볼수있어요. */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Text */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[17px] sm:text-[20px] md:text-[23px] font-bold text-[#0F172A] leading-[1.3] tracking-tight break-keep-all whitespace-pre-line">
                {intro.corePoints?.[2]?.title || '누구나 악보를 볼수있어요.'}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mt-3.5 break-keep-all max-w-lg">
                {intro.corePoints?.[2]?.desc || '찬양 인도자용, 연주자용, 회중용 악보뷰를 제공합니다. 링크 하나로 누구나 오늘 예배의 전체악보를 볼수 있습니다.'}
              </p>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <CoreCardImageSlot
                imageSrc={images[2]}
                altText={intro.corePoints?.[2]?.title || '스마트 조옮김 키 변환'}
                gradientClass="bg-gradient-to-br from-[#FFF3E6] via-[#FCEEE2] to-[#F7DFCD]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
