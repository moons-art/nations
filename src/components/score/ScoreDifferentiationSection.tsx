import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteIntro } from '../../services/siteIntroStorage';

interface ScoreDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const ScoreDifferentiationSection: React.FC<ScoreDifferentiationSectionProps> = ({
  onOpenKakao: _onOpenKakao,
}) => {
  const siteIntro = useSiteIntro('score');
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
      id="score-differentiation"
      className="w-full bg-[#F8F9FD] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80"
    >
      {/* Main Inner Content: Max width 6xl, centered */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Callout (Left Column on large screens) - 상단 큰 제목 글자를 작은 제목 글자로 수정 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center items-start gap-3 lg:col-span-5"
        >
          {/* 무료로 앱 이용하기 버튼 */}
          <a
            href="https://studio.thenations.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mb-1"
          >
            <span>무료로 앱 이용하기</span>
            <span className="material-symbols-outlined text-[16px] font-medium">arrow_forward</span>
          </a>

          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] sm:text-[13px] text-[#64748B] font-normal">
              찬양사역을 이해하는 앱
            </p>

            <h2 className="text-[12.5px] sm:text-[13.5px] font-medium text-[#0F172A] leading-relaxed break-keep-all">
              찬양 사역자와 반주자의 호흡, 기도의 사모함과 잔잔한 긴장감까지 속속들이 이해하는 경험많은 예배전문가가 예배의 언어로 만든 앱입니다.
            </h2>
          </div>
        </motion.div>

        {/* Q&A Section (Right Column on large screens) */}
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
