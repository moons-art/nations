import React from 'react';
import { motion } from 'motion/react';
import { NATIONS_LOGO_URL } from '../data/products';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenKakao: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenKakao,
}) => {
  return (
    <footer className="w-full bg-[#1E293B] text-slate-400 mt-12 px-4 pt-8 pb-24 border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <img
            alt="NATIONS 로고"
            className="h-6 sm:h-7 w-auto object-contain"
            src={NATIONS_LOGO_URL}
          />
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-[#85f8c4] border border-slate-700">
            스마트 미니스트리
          </span>
        </div>

        <div className="flex flex-col gap-1 text-[13px] leading-relaxed text-slate-400">
          <p className="font-semibold text-slate-200">
            NATIONS 네이션스 솔루션 | 교회를 돕는 모든 것
          </p>
          <p>
            문의 채널: 카카오톡 채널 [더네이션스 솔루션]
          </p>
          <p className="text-slate-400/90">
            스마트 교회투표 · 악보 라이브러리 · 스마트 교회행정 ERP · 소그룹앱 · 스마트 성경
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
