import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, RefreshCw, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { CORE_POINT_IMAGES } from '../data/products';

interface CoreImageProps {
  pointId: '1' | '2' | '3';
  primarySrc: string;
  altSrc: string;
  altText: string;
  badgeText: string;
}

const CoreImage: React.FC<CoreImageProps> = ({ pointId, primarySrc, altSrc, altText, badgeText }) => {
  const storageKey = `nations_custom_image_${pointId}`;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Initial load from localStorage or server file
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setImageSrc(saved);
      return;
    }

    // Try primarySrc or altSrc
    const checkImage = (url: string) => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    (async () => {
      if (await checkImage(primarySrc)) {
        setImageSrc(primarySrc);
      } else if (await checkImage(altSrc)) {
        setImageSrc(altSrc);
      }
    })();
  }, [pointId, primarySrc, altSrc, storageKey]);

  // Handle file drop or selection
  const handleProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(PNG, JPG, WebP 등)만 업로드할 수 있습니다.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setIsUploading(false);
        return;
      }

      // Immediately persist in localStorage for instant rendering
      try {
        localStorage.setItem(storageKey, dataUrl);
      } catch (err) {
        console.warn('LocalStorage full or restricted:', err);
      }
      setImageSrc(dataUrl);

      // Persist to server public/ directory
      try {
        await fetch('/api/upload-point-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pointId,
            dataBase64: dataUrl,
            originalName: file.name,
          }),
        });
      } catch (err) {
        console.error('Failed to sync to server public dir:', err);
      }

      setIsUploading(false);
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      id={`core-point-image-container-${pointId}`}
      className={`w-full rounded-2xl overflow-hidden mt-3 shadow-inner relative group select-none transition-all duration-300 ${
        isDragging
          ? 'ring-4 ring-[#006948] bg-emerald-50 scale-[1.02]'
          : 'bg-slate-900/5 hover:bg-slate-900/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleProcessFile(e.target.files[0]);
          }
        }}
      />

      {imageSrc ? (
        <div className="relative w-full h-44 sm:h-48 md:h-44 lg:h-52 overflow-hidden bg-slate-900">
          {/*
            [Gemini 워터마크 삭제 스타일링]
            scale-[1.12] 및 origin-[45%_45%]를 적용하여 이미지 우측 하단 구석에 위치한
            제미나이 ✦ 마크를 overflow-hidden 영역 바깥으로 밀어내어 100% 완전 삭제합니다.
          */}
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover scale-[1.12] origin-[45%_45%] group-hover:scale-[1.16] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* 우측 하단 워터마크 차단 오버레이 (미세 잔여물까지 완벽 차단) */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-tl from-slate-950/40 to-transparent pointer-events-none rounded-tl-xl backdrop-blur-xs" />

          {/* 상단 뱃지 */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            {badgeText}
          </div>
        </div>
      ) : (
        /* 이미지 로딩 대기 / 인터랙티브 플레이스홀더 */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-44 sm:h-48 md:h-44 lg:h-52 flex flex-col items-center justify-center p-5 text-center cursor-pointer bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 hover:border-[#006948] transition-colors"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-50 text-[#006948] flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-[13px] font-bold text-slate-700 mb-0.5">
            {badgeText} 이미지 추가
          </p>
          <p className="text-[11px] text-slate-500">
            클릭하여 사진 선택 또는 파일 드래그앤드롭
          </p>
          <span className="mt-2 text-[10px] px-2 py-0.5 rounded bg-emerald-100/70 text-[#006948] font-medium">
            ✦ 제미나이 마크 자동 삭제 적용
          </span>
        </div>
      )}

      {/* 오버레이 액션 버튼: 마우스 오버 시 또는 터치 시 교체 가능 */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-200 ${
          isHovered && imageSrc && !isUploading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          id={`change-image-btn-point-${pointId}`}
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-2 rounded-xl bg-white text-slate-800 text-[12px] font-bold flex items-center gap-1.5 shadow-lg hover:bg-emerald-50 hover:text-[#006948] transition-all cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#006948]" />
          사진 교체 (클릭/드롭)
        </button>
      </div>

      {/* 상태 알림 (업로드 중 또는 교체 완료) */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
          <span className="text-[12px] font-medium">이미지 적용 중...</span>
        </div>
      )}

      {justUpdated && (
        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-md animate-bounce">
          <CheckCircle className="w-3.5 h-3.5" />
          교체 완료 (워터마크 삭제)
        </div>
      )}
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
        <p className="text-[13px] sm:text-[14px] text-slate-600 mt-1">
          성도와 교역자 모두가 오직 예배와 사역의 본질에 집중할 수 있는 표준을 만듭니다.
        </p>
      </motion.div>

      {/* 3 Core Points: Responsive 3-Column Grid on Tablet & PC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Point 01: 사역 효율 극대화 */}
        <motion.div
          id="core-value-card-1"
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
            pointId="1"
            primarySrc={CORE_POINT_IMAGES.point1}
            altSrc={CORE_POINT_IMAGES.point1Alt}
            altText="현장 상황실 실시간 집계 현황 및 사역 효율 스마트 목회 대시보드"
            badgeText="상황실 실시간 집계 대시보드"
          />
        </motion.div>

        {/* Point 02: 누구나 쉬운 접근성 */}
        <motion.div
          id="core-value-card-2"
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
            pointId="2"
            primarySrc={CORE_POINT_IMAGES.point2}
            altSrc={CORE_POINT_IMAGES.point2Alt}
            altText="어르신부터 청년까지 누구나 쉽게 사용하는 스마트폰 모바일 투표 준비 화면"
            badgeText="모바일 선거인 직관적 투표 확인"
          />
        </motion.div>

        {/* Point 03: 데이터 보안 및 선거관리위원회 */}
        <motion.div
          id="core-value-card-3"
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
            pointId="3"
            primarySrc={CORE_POINT_IMAGES.point3}
            altSrc={CORE_POINT_IMAGES.point3Alt}
            altText="선거관리위원회 일정표와 투표 절차 안내 및 철저한 보안 검표 현장"
            badgeText="선거관리위원회 투표·검표 보안"
          />
        </motion.div>
      </div>
    </section>
  );
};
