import React from 'react';
import { motion } from 'motion/react';
import { NATIONS_SYMBOL_CLEAN_URL, NATIONS_LOGO_ORIG_URL } from '../data/products';
import { KakaoIcon } from './KakaoIcon';

interface BottomCtaSectionProps {
  onOpenKakao: () => void;
  onOpenDemoModal?: () => void;
}

export const BottomCtaSection: React.FC<BottomCtaSectionProps> = ({
  onOpenKakao,
  onOpenDemoModal: _onOpenDemoModal,
}) => {
  return (
    <section className="w-full bg-white/90 rounded-3xl p-6 sm:p-10 lg:p-14 flex flex-col items-center text-center gap-8 shadow-xs border border-slate-200/90" id="service-guide">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2.5 px-3 py-1 cursor-default select-none"
      >
        <img
          src={NATIONS_SYMBOL_CLEAN_URL}
          alt="NATIONS 아이콘"
          className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0"
        />
        <img
          src={NATIONS_LOGO_ORIG_URL}
          alt="NATIONS 로고"
          className="h-6 sm:h-7 md:h-8 w-auto object-contain shrink-0"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 max-w-xl"
      >
        <h2 className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-[#0F172A] leading-tight break-keep-all px-2">
          어디서부터 시작해야 할지 막막하신가요?
        </h2>
        <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed break-keep-all px-2">
          교회의 규모와 사역 환경에 맞춘 솔루션을 1:1로 제안해 드립니다.{' '}
          <span className="block sm:inline font-medium text-[#0F172A]">작은 문의도 성심껏 동역하겠습니다.</span>
        </p>
      </motion.div>

      {/* Kakao Channel Button Centered */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto flex justify-center"
      >
        <button
          type="button"
          onClick={onOpenKakao}
          className="w-full py-4 px-6 bg-[#FEE500] hover:bg-[#ebd300] text-[#371D1E] rounded-xl sm:rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <KakaoIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
          <span>카카오채널: 더 네이션스 솔루션</span>
        </button>
      </motion.div>
    </section>
  );
};
