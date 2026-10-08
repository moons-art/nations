import React from 'react';
import { motion } from 'motion/react';
import { NATIONS_LOGO_URL, NATIONS_ICON_URL } from '../data/products';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenKakao: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenKakao,
  onOpenAdmin,
}) => {
  return (
    <footer className="relative w-full bg-[#1E293B] text-slate-400 mt-12 px-4 pt-8 pb-24 border-t border-slate-800 overflow-hidden">
      {/* Invisible Admin Trigger at Card's Left Corner (Top-left & Bottom-left) */}
      <button
        type="button"
        onClick={onOpenAdmin}
        aria-label="관리자 접속"
        className="absolute left-0 bottom-0 w-24 h-24 opacity-0 cursor-pointer focus:outline-none z-20"
        title=""
      />
      <button
        type="button"
        onClick={onOpenAdmin}
        aria-label="관리자 접속"
        className="absolute left-0 top-0 w-24 h-24 opacity-0 cursor-pointer focus:outline-none z-20"
        title=""
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto flex flex-col gap-4 relative"
      >
        {/* Invisible trigger also at content container's left corner */}
        <button
          type="button"
          onClick={onOpenAdmin}
          aria-label="관리자 접속"
          className="absolute -bottom-2 left-0 w-16 h-12 opacity-0 cursor-pointer focus:outline-none z-20"
          title=""
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              alt="NATIONS 아이콘"
              className="h-6 sm:h-7 w-auto object-contain rounded-sm"
              src={NATIONS_ICON_URL}
            />
            <img
              alt="NATIONS 로고"
              className="h-5 sm:h-6 w-auto object-contain"
              src={NATIONS_LOGO_URL}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[13px] leading-relaxed text-slate-400">
          <p className="font-semibold text-slate-200">
            네이션스 솔루션 | 교회를 돕는 모든 것
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[12px] text-slate-300">
          <button
            type="button"
            onClick={onOpenTerms}
            className="hover:text-[#85f8c4] transition-colors cursor-pointer"
          >
            이용약관
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-[#85f8c4] transition-colors cursor-pointer"
          >
            개인정보처리방침
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={onOpenKakao}
            className="hover:text-[#85f8c4] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>카카오톡 채널</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>
        </div>

        <p className="text-[12px] text-slate-500 pt-1">
          © NATIONS Solution. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};
