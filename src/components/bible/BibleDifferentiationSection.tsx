import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteIntro } from '../../services/siteIntroStorage';

interface BibleDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const BibleDifferentiationSection: React.FC<BibleDifferentiationSectionProps> = ({
  onOpenKakao: _onOpenKakao,
}) => {
  const siteIntro = useSiteIntro('bible');
  const faqs = siteIntro.faqs || [];
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section
      id="bible-differentiation"
      className="w-full bg-[#F8F9FD] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80"
    >
      {/* Main Inner Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Callout (Left Column) - 상단 큰 제목 글자를 작은 제목 글자로 수정 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center items-start gap-3 lg:col-span-5"
        >
          {/* 무료로 앱 이용하기 버튼 */}
          <a
            href="https://bible.thenations.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mb-1"
          >
            <span>무료로 앱 이용하기</span>
            <span className="material-symbols-outlined text-[16px] font-medium">arrow_forward</span>
          </a>

          <div className="flex flex-col gap-2">
            <p className="text-[12px] sm:text-[13px] text-[#64748B] font-normal">
              단순한 설교준비 앱은 많습니다.
            </p>

            <h2 className="text-[12.5px] sm:text-[13.5px] font-medium text-[#0F172A] leading-relaxed break-keep-all">
              매주 강단에 오르기 전 말씀을 연구하고 씨름하는 목회자의 심정으로, 다년간 설교준비의 노하우를 담아 앱을 만들었습니다.
            </h2>

            <p className="text-[12px] sm:text-[12.5px] text-[#64748B] font-normal leading-relaxed max-w-xl break-keep-all">
              설교 준비의 모든 번잡함을 걷어내고 말씀의 본질에 집중할 수 있도록 돕습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-[11.5px] sm:text-[12px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
              <span>주석 클라우드 실시간 연동</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
              <span>다중 역본 대조</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
              <span>절별 주석 설교 라이브러리</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Section (Right Column) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4.5 lg:col-span-7 justify-center"
        >
          {/* Q&A List - Dynamic from siteIntro.faqs */}
          {faqs.map((faq, idx) => {
            const isOpen = !!openItems[idx];
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="w-full h-[1px] bg-slate-200/90" />}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.05 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-1.5"
                >
                  <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
                    <span className="text-[#0F172A] font-bold mr-1">Q.</span>
                    {faq.q}
                  </h3>

                  <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
                    <div
                      onClick={() => toggleItem(idx)}
                      className="flex items-center justify-between gap-3 cursor-pointer group select-none"
                    >
                      <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                        {faq.preview || faq.a}
                      </p>
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(idx);
                        }}
                        animate={{
                          rotate: isOpen ? 45 : 0,
                          scale: isOpen ? 1.15 : 1,
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        aria-label="답변 펼치기/접기"
                        className="shrink-0 p-0 text-slate-400 group-hover:text-[#0F172A] bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] font-normal select-none">
                          add
                        </span>
                      </motion.button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-1 text-[11.5px] sm:text-[12.5px] text-[#475569] leading-relaxed break-keep-all whitespace-pre-wrap">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
