import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SermonDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const SermonDifferentiationSection: React.FC<SermonDifferentiationSectionProps> = ({
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
    <section
      id="sermon-differentiation"
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
            href="https://sermon.thenations.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mb-1"
          >
            <span>무료로 앱 이용하기</span>
            <span className="material-symbols-outlined text-[16px] font-medium">arrow_forward</span>
          </a>

          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] sm:text-[13px] text-[#64748B] font-normal">
              목사님의 은혜로운 설교를 모든 성도들에게
            </p>

            <h2 className="text-[12.5px] sm:text-[13.5px] font-medium text-[#0F172A] leading-relaxed break-keep-all">
              매주 강단에서 피워내는 말씀의 열정과 애타는 심정을 그대로 설교자의 마음을 담았습니다.
            </h2>
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

          {/* Q&A 1: 예배 전체 영상을 올려도 되나요? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              예배 전체 영상을 올려도 되나요?
            </h3>

            {/* Answer 1 - 첫줄 노출 부분을 희미한 글자로 적용 */}
            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(0)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네, 예배 전체 영상 유튜브 링크만 입력해도 됩니다.
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

              {/* 클릭 시 부드럽게 펼쳐지는 설명 답변 */}
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
                      AI가 찬양과 광고를 건너뛰고 설교 중 가장 은혜롭고 전달력 높은 60초 핵심 구간을 자동 분석하여 5개의 세로형 유튜브 쇼츠와 인스타그램 릴스로 생성해 줍니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 2: 영상없이 설교문만 올려도 숏폼영상을 만들 수 있나요? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              영상없이 설교문만 올려도 숏폼영상을 만들 수 있나요?
            </h3>

            {/* Answer 2 - 첫줄 노출 부분을 희미한 글자로 적용 */}
            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(1)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네 물론 입니다. 자막, 혹은 AI음성으로 영상을 만듭니다.
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

              {/* 클릭 시 부드럽게 펼쳐지는 설명 답변 */}
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
                      교정이 안 된 메모설교도 목사님이 자주 쓰시는 어휘, 문법, 감동적인 표현 방식을 AI가 학습한 후, 자막+배경음악, AI음성+자막+배경음악 선택하여 가장 감동적인 5개의 설교숏폼 영상을 생성합니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 3: 주일설교카드와 묵상카드는 무엇인가요? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              주일설교카드와 묵상카드는 무엇인가요?
            </h3>

            {/* Answer 3 - 첫줄 노출 부분을 희미한 글자로 적용 */}
            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(2)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  목사님의 설교를 요약하여 성도들이 볼 수 있는 이미지 카드입니다.
                </p>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(2);
                  }}
                  animate={{
                    rotate: openItems[2] ? 45 : 0,
                    scale: openItems[2] ? 1.15 : 1,
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

              {/* 클릭 시 부드럽게 펼쳐지는 설명 답변 */}
              <AnimatePresence initial={false}>
                {openItems[2] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-[11.5px] sm:text-[12.5px] text-[#475569] leading-relaxed break-keep-all">
                      주일설교카드는 주일설교를 7장 정도의 이미지 카드로, 묵상카드는 주일설교를 성도들이 매일 기억하며 묵상할 수 있도록 6일치 분량의 묵상카드로 제작해 드립니다. 제작된 카드 이미지는 카톡이나 인스타 홈페이지에 올리시면 됩니다.
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
