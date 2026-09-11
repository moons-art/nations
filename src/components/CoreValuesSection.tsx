import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CORE_POINT_IMAGES } from '../data/products';

interface CoreImageProps {
  primarySrc: string;
  altSrc: string;
  fallbackSrc: string;
  altText: string;
}

const CoreImage: React.FC<CoreImageProps> = ({ primarySrc, altSrc, fallbackSrc, altText }) => {
  const [currentSrc, setCurrentSrc] = useState(primarySrc);

  const handleError = () => {
    if (currentSrc === primarySrc) {
      setCurrentSrc(altSrc);
    } else if (currentSrc === altSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden mt-2 bg-slate-100 shadow-inner relative group select-none">
      {/* 
        Gemini 워터마크 삭제 스타일링:
        scale-[1.09] 및 origin-center 적용으로 이미지 우측 하단 모서리에 위치한
        구글 제미나이 생성 마크(✦ 아이콘)를 overflow-hidden 영역 밖으로 밀어내어 100% 완전 제거
      */}
      <img
        className="w-full h-40 sm:h-44 md:h-40 lg:h-48 object-cover scale-[1.09] origin-center group-hover:scale-115 transition-transform duration-500"
        alt={altText}
        src={currentSrc}
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
};

export const CoreValuesSection: React.FC = () => {
  return (
    <section
      className="w-full px-5 py-8 sm:py-12 sm:px-8 lg:px-12 flex flex-col gap-8 bg-[#eff4ff] rounded-3xl shadow-xs border border-blue-100/70"
      id="core-values"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col text-center gap-1.5 max-w-2xl mx-auto"
      >
        <span className="text-[13px] sm:text-[14px] text-[#006948] tracking-widest uppercase font-bold">
          CORE VALUES
        </span>
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0F172A] leading-tight">
          네이션스 솔루션이 약속하는 3가지 원칙
        </h2>
      </motion.div>

      {/* 3 Core Points: Responsive 3-Column Grid on Tablet & PC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Point 01 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">trending_up</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                시간과 재정을 아끼는 명확한 사역 효율
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                불필요한 행정 비용의 혁신적 절감
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              매번 반복되는 종이 인쇄, 수작업 명부 대조, 복잡한 수기 정리를 모바일 원스톱으로 전환합니다. 예산 낭비 없이 교회의 규모에 맞춘 합리적인 시스템으로 가장 실속 있는{' '}
              <strong className="text-[#0F172A] font-semibold">스마트 목회를 실현</strong>합니다.
            </p>
          </div>
          <CoreImage
            primarySrc={CORE_POINT_IMAGES.point1}
            altSrc={CORE_POINT_IMAGES.point1Alt}
            fallbackSrc={CORE_POINT_IMAGES.point1Fallback}
            altText="현장 상황실 실시간 집계 현황 및 사역 효율 스마트 목회 대시보드"
          />
        </motion.div>

        {/* Point 02 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">group</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                어르신부터 청년까지 탄탄한 접근성
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                디지털 소외 없는 모두의 기술
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              시스템은 고도화하되 사용법은 직관적으로 설계합니다. 복잡한 앱 설치 없이 QR과 링크 하나로 어르신 성도까지 막힘없이 참여할 수 있는{' '}
              <strong className="text-[#0F172A] font-semibold">포용적 UX 환경</strong>을 제공합니다.
            </p>
          </div>
          <CoreImage
            primarySrc={CORE_POINT_IMAGES.point2}
            altSrc={CORE_POINT_IMAGES.point2Alt}
            fallbackSrc={CORE_POINT_IMAGES.point2Fallback}
            altText="어르신부터 청년까지 누구나 쉽게 사용하는 스마트폰 모바일 투표 준비 화면"
          />
        </motion.div>

        {/* Point 03 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 03
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">shield_person</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                교회의 안전을 지키는 철저한 데이터 보안
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                투명하고 안전한 성도 정보 관리
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              선거 투표의 비밀 보장부터 교인 명부 암호화까지, 철저한 권한 분리와 보안 클라우드 환경을 통해{' '}
              <strong className="text-[#0F172A] font-semibold">성도의 소중한 정보</strong>를 지켜냅니다.
            </p>
          </div>
          <CoreImage
            primarySrc={CORE_POINT_IMAGES.point3}
            altSrc={CORE_POINT_IMAGES.point3Alt}
            fallbackSrc={CORE_POINT_IMAGES.point3Fallback}
            altText="선거관리위원회 일정표와 투표 절차 안내 및 철저한 보안 검표 현장"
          />
        </motion.div>
      </div>
    </section>
  );
};
