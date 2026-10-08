import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const DifferentiationSection: React.FC<DifferentiationSectionProps> = ({
  onOpenKakao: _onOpenKakao,
}) => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="w-full bg-[#F8F9FD] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
      {/* Main Inner Content: Max width 6xl, centered */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Callout (Left Column on large screens) - 상단 큰 제목 글자를 작은 제목 글자로 수정 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center items-start gap-3 lg:col-span-5"
        >
          {/* 무료로 앱 이용하기 버튼 */}
          <a
            href="https://vote.thenations.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mb-1"
          >
            <span>무료로 앱 이용하기</span>
            <span className="material-symbols-outlined text-[16px] font-medium">arrow_forward</span>
          </a>

          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] sm:text-[13px] text-[#64748B] font-normal">
              단순한 앱 개발 회사는 많습니다.
            </p>

            <h2 className="text-[12.5px] sm:text-[13.5px] font-medium text-[#0F172A] leading-relaxed break-keep-all">
              교회 현장의 질서와 정서, 예배의 거룩함을 이해하는 경험많은 목회자의 노하우를 담았습니다.
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
          {/* Q&A 0: 무료 이용 관련 질문 (제일 첫번째 질문) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              가입 및 이용은 무료인가요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(999)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네 무료로 가입하여도 기본 기능을 충분히 이용하실 수 있습니다.
                </p>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(999);
                  }}
                  animate={{
                    rotate: openItems[999] ? 45 : 0,
                    scale: openItems[999] ? 1.15 : 1,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  aria-label="답변 펼치기/접기"
                  className="shrink-0 p-0 text-slate-400 group-hover:text-slate-700 bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] font-normal select-none">
                    add
                  </span>
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {openItems[999] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-[11.5px] sm:text-[12.5px] text-[#475569] leading-relaxed break-keep-all">
                      유료기능은 크레딧을 구매하여 사용한 만큼 차감하는 구조입니다. 심혈을 기울여 만든 고급기능을 유료로 결제하여 차원이 다른 편리함을 경험해 보세요.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              스마트 투표 시스템 도입시 어르신들이 어려워하지 않을까요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(0)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네이션스 투표앱은 현장 중심으로 설계되었습니다.
                </p>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(0);
                  }}
                  animate={{
                    rotate: openItems[0] ? 45 : 0,
                    scale: openItems[0] ? 1.15 : 1,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  aria-label="답변 펼치기/접기"
                  className="shrink-0 p-0 text-slate-400 group-hover:text-slate-700 bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] font-normal select-none">
                    add
                  </span>
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {openItems[0] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-[11.5px] sm:text-[12.5px] text-[#475569] leading-relaxed break-keep-all">
                      직관적인 화면 구성은 물론, 대리 인증 및 종이 투표 병행 가이드 등 현장 맞춤형 매뉴얼을 함께 제공하여 단 한 명의 성도도 소외되지 않도록 돕습니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              스마트 투표의 운영이 비전문 선거 관리자(목회자)가 쓰기에 어렵지 않을까요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(1)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네이션스 투표앱은 불필요한 행정을 혁신적으로 줄여드립니다.
                </p>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(1);
                  }}
                  animate={{
                    rotate: openItems[1] ? 45 : 0,
                    scale: openItems[1] ? 1.15 : 1,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  aria-label="답변 펼치기/접기"
                  className="shrink-0 p-0 text-slate-400 group-hover:text-slate-700 bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] font-normal select-none">
                    add
                  </span>
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {openItems[1] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-[11.5px] sm:text-[12.5px] text-[#475569] leading-relaxed break-keep-all">
                      IT 전문 지식이 없는 목회자와 성도님도 별도의 교육 없이 바로 쓸 수 있는 단순함이 네이션스의 원칙입니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
