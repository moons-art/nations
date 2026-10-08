import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import { KakaoIcon } from './KakaoIcon';

interface FixedBottomBarProps {
  onOpenKakao: () => void;
  onOpenDemoModal: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  onOpenKakao,
  onOpenDemoModal,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll dynamics to make floating buttons follow with natural spring motion
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth physics spring for button 1 (앱 들어가기) - upright and uniform scale without twisting
  const smoothVelocity1 = useSpring(scrollVelocity, { damping: 20, stiffness: 180 });
  const yOffset1 = useTransform(smoothVelocity1, [-1200, 0, 1200], [32, 0, -32]);
  const absVelocity1 = useTransform(smoothVelocity1, (v) => Math.min(Math.abs(v), 1200));
  const scale1 = useTransform(absVelocity1, [0, 1200], [1, 0.92]);

  // Smooth physics spring for button 2 (1:1 상담) - slight organic lag without twisting
  const smoothVelocity2 = useSpring(scrollVelocity, { damping: 18, stiffness: 160 });
  const yOffset2 = useTransform(smoothVelocity2, [-1200, 0, 1200], [44, 0, -44]);
  const absVelocity2 = useTransform(smoothVelocity2, (v) => Math.min(Math.abs(v), 1200));
  const scale2 = useTransform(absVelocity2, [0, 1200], [1, 0.92]);

  const content = (
    <aside
      aria-label="빠른 실행 플로팅 메뉴"
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:bottom-10 md:right-8 z-[70] flex flex-col items-center gap-3.5 pointer-events-auto select-none"
    >
      {/* 1. 앱 들어가기 플로팅 원형 버튼 (비틀림 없이 완벽한 정원형 유지, 스크롤 시 자연스럽게 살짝 작아짐) */}
      <motion.div
        style={{
          y: yOffset1,
          scale: scale1,
          transformOrigin: 'center center',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative group will-change-transform"
      >
        <button
          type="button"
          onClick={onOpenDemoModal}
          aria-label="앱 들어가기"
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#C15F3C] hover:bg-[#a94e30] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.26)] border border-white/25 flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] leading-none">
            apps
          </span>
          <span className="text-[10px] sm:text-[10.5px] font-bold leading-none mt-0.5">
            앱
          </span>
        </button>

        {/* Desktop / Tablet Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/85 text-white text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md">
          앱 들어가기
        </span>
      </motion.div>

      {/* 2. 1:1 상담 플로팅 원형 버튼 (비틀림 없이 완벽한 정원형 유지, 스크롤 시 자연스럽게 살짝 작아짐) */}
      <motion.div
        style={{
          y: yOffset2,
          scale: scale2,
          transformOrigin: 'center center',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative group will-change-transform"
      >
        <button
          type="button"
          onClick={onOpenKakao}
          aria-label="1:1 상담"
          className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#FEE500] hover:bg-[#ffd800] text-[#371D1E] shadow-[0_4px_14px_rgba(0,0,0,0.16)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.24)] border border-black/10 flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer"
        >
          <KakaoIcon className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] leading-none" />
          <span className="text-[10px] sm:text-[10.5px] font-bold leading-none mt-0.5">
            상담
          </span>
        </button>

        {/* Desktop / Tablet Tooltip */}
        <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/85 text-white text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md">
          1:1 실시간 상담
        </span>
      </motion.div>
    </aside>
  );

  if (!mounted || typeof document === 'undefined') return content;
  return createPortal(content, document.body);
};
