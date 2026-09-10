import React from 'react';
import { CORE_POINT_IMAGES } from '../data/products';

export const CoreValuesSection: React.FC = () => {
  return (
    <section
      className="px-4 py-6 flex flex-col gap-5 bg-[#eff4ff] rounded-3xl mx-3 sm:mx-auto max-w-lg shadow-xs"
      id="core-points"
    >
      <div className="flex flex-col text-center gap-1">
        <span className="text-[12px] text-[#006948] tracking-wider uppercase font-bold">
          CORE VALUES
        </span>
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A]">
          네이션스 솔루션이 약속하는 3가지 원칙
        </h2>
      </div>

      {/* Point 01 */}
      <div className="w-full bg-white rounded-2xl p-5 shadow-xs flex flex-col gap-3 border border-[#E2E8F0]/70 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#006948] text-[11px] font-bold">
            Point 01
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">trending_up</span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] font-semibold text-[#0F172A]">
            시간과 재정을 아끼는 명확한 사역 효율
          </h3>
          <p className="text-[13px] text-[#006948] font-semibold">
            불필요한 행정 비용의 혁신적 절감
          </p>
        </div>
        <p className="text-[13px] text-[#475569] leading-relaxed">
          매번 반복되는 종이 인쇄, 수작업 명부 대조, 복잡한 수기 정리를 모바일 원스톱으로 전환합니다. 예산 낭비 없이 교회의 규모에 맞춘 합리적인 시스템으로 가장 실속 있는{' '}
          <strong className="text-[#0F172A] font-semibold">스마트 목회를 실현</strong>합니다.
        </p>
        <div className="w-full rounded-xl overflow-hidden mt-1 bg-slate-100 shadow-inner">
          <img
            className="w-full h-36 object-cover hover:scale-105 transition-transform duration-500"
            alt="Paperless church administration efficiency with mobile digital dashboard"
            src={CORE_POINT_IMAGES.point1}
            loading="lazy"
          />
        </div>
      </div>

      {/* Point 02 */}
      <div className="w-full bg-white rounded-2xl p-5 shadow-xs flex flex-col gap-3 border border-[#E2E8F0]/70 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#006948] text-[11px] font-bold">
            Point 02
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">group</span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] font-semibold text-[#0F172A]">
            어르신부터 청년까지 탄탄한 접근성
          </h3>
          <p className="text-[13px] text-[#006948] font-semibold">
            디지털 소외 없는 모두의 기술
          </p>
        </div>
        <p className="text-[13px] text-[#475569] leading-relaxed">
          시스템은 고도화하되 사용법은 직관적으로 설계합니다. 복잡한 앱 설치 없이 QR과 링크 하나로 어르신 성도까지 막힘없이 참여할 수 있는{' '}
          <strong className="text-[#0F172A] font-semibold">포용적 UX 환경</strong>을 제공합니다.
        </p>
        <div className="w-full rounded-xl overflow-hidden mt-1 bg-slate-100 shadow-inner">
          <img
            className="w-full h-36 object-cover hover:scale-105 transition-transform duration-500"
            alt="Inclusive multi-generational church members easily using smartphone QR code"
            src={CORE_POINT_IMAGES.point2}
            loading="lazy"
          />
        </div>
      </div>

      {/* Point 03 */}
      <div className="w-full bg-white rounded-2xl p-5 shadow-xs flex flex-col gap-3 border border-[#E2E8F0]/70 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#006948] text-[11px] font-bold">
            Point 03
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">shield_person</span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-[17px] font-semibold text-[#0F172A]">
            교회의 안전을 지키는 철저한 데이터 보안
          </h3>
          <p className="text-[13px] text-[#006948] font-semibold">
            투명하고 안전한 성도 정보 관리
          </p>
        </div>
        <p className="text-[13px] text-[#475569] leading-relaxed">
          선거 투표의 비밀 보장부터 교인 명부 암호화까지, 철저한 권한 분리와 보안 클라우드 환경을 통해{' '}
          <strong className="text-[#0F172A] font-semibold">성도의 소중한 정보</strong>를 지켜냅니다.
        </p>
        <div className="w-full rounded-xl overflow-hidden mt-1 bg-slate-100 shadow-inner">
          <img
            className="w-full h-36 object-cover hover:scale-105 transition-transform duration-500"
            alt="Secure encrypted digital church database protection"
            src={CORE_POINT_IMAGES.point3}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
