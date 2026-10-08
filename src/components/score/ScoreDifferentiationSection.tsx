import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScoreDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const ScoreDifferentiationSection: React.FC<ScoreDifferentiationSectionProps> = ({
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
                  className="shrink-0 p-0 text-slate-400 group-hover:text-[#0F172A] bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
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

          {/* Q&A 1: 어디서나 접속 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              악보와 콘티는 어디서나 볼수 있나요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(0)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네이션스의 모든 솔루션은 '현장 중심'으로 설계됩니다.
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
                  className="shrink-0 p-0 text-slate-400 group-hover:text-[#0F172A] bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
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
                      네이션스 악보의 모든 데이터는 안전하게 클라우드에 저장되어 전세계 어디에서든 접속이 가능합니다. 또한 찬양팀 플랫폼, 회중용 플랫폼이 따로 제공되어 모든 기기에서 접속이 가능합니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 2: 악보 구하기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              악보는 어떻게 구할수 있나요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(1)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  네이션스 악보앱은 악보를 판매하지 않습니다.
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
                  className="shrink-0 p-0 text-slate-400 group-hover:text-[#0F172A] bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
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
                      사용자 개인이 정상적으로 구입한 악보를 관리하는 라이브러리와 뷰어를 제공합니다.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-slate-200/90" />

          {/* Q&A 3: 찬양팀 공유 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0F172A] leading-snug break-keep-all">
              <span className="text-[#0F172A] font-bold mr-1">Q.</span>
              찬양팀과 어떻게 공유하나요?
            </h3>

            <div className="flex flex-col gap-1 w-full pl-3.5 sm:pl-4">
              <div
                onClick={() => toggleItem(2)}
                className="flex items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <p className="text-[12px] sm:text-[13px] text-slate-400 font-normal leading-snug break-keep-all group-hover:text-slate-600 transition-colors">
                  매주 악보와 송품을 보내던 번거로움은 잊으세요.
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
                  className="shrink-0 p-0 text-slate-400 group-hover:text-[#0F172A] bg-transparent border-0 cursor-pointer flex items-center justify-center leading-none focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] font-normal select-none">
                    add
                  </span>
                </motion.button>
              </div>

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
                      네이션스 악보앱은 찬양인도자가 앱에 저장한 콘티와 송폼, 카피를 위한 유튜브 영상까지 한번에 공유할 수 있습니다. 찬양팀 전용 페이지를 통해 실시간 송폼 수정과 소통, 교제가 가능합니다.
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
