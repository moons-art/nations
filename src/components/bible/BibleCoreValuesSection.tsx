import React from 'react';
import { motion } from 'motion/react';

export const BibleCoreValuesSection: React.FC = () => {
  return (
    <section
      className="w-full bg-white/90 rounded-3xl p-6 sm:p-10 lg:p-14 flex flex-col gap-10 shadow-xs border border-slate-200/90"
      id="core-values"
    >
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col text-center gap-1.5 max-w-2xl mx-auto"
      >
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0F172A] leading-tight">
          <span className="inline-block">네이션스 성경이 약속하는</span>{' '}
          <span className="inline-block">3가지 원칙</span>
        </h2>
        <p className="text-[13px] sm:text-[14px] text-slate-600 mt-1">
          말씀을 연구하고 전하는 설교자와 성도가 깊은 은혜의 통찰에 도달할 수 있도록 돕습니다.
        </p>
      </motion.div>

      {/* 3 Core Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Point 01: 설교자를 위한 강력한 나만의 설교준비 데스크 */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col justify-between gap-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                설교자를 위한 맞춤 설교데스크
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                몰입을 방해하지 않는 깔끔한 인터페이스
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              복잡하고 무거운 성경 소프트웨어 대신, 말씀 묵상과 설교 원고 작성에만 온전히 집중할 수 있는{' '}
              <strong className="text-[#0F172A] font-semibold">초경량 고성능 설교 워크스페이스</strong>를 제공합니다. 태블릿과 노트북 어디서나 즉시 켜집니다.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
              <span>PREACHER'S DESK</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">FAST LOAD</span>
            </div>
            <div className="flex items-center gap-2 py-2 border-y border-slate-700/80 text-[12px]">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">bolt</span>
              <span>설교 본문과 원고 에디터가 좌우 분할로 즉시 연동</span>
            </div>
            <p className="text-[11px] text-slate-400">강단용 대형 텍스트 보기 모드 1초 전환</p>
          </div>
        </motion.div>

        {/* Point 02: 다중 역본 동시 대조 & 원어 관주 */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col justify-between gap-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                다중 역본 동시 대조 & 원어 사전
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                원문의 뉘앙스를 한눈에 파악하는 직관성
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              개역개정, 새번역, 공동번역, NIV, ESV, 히브리어/헬라어 스트롱 코드를 병렬로 나란히 비교합니다. 단어 하나하나에 담긴{' '}
              <strong className="text-[#0F172A] font-semibold">원문 시제와 깊은 의미</strong>를 1초 만에 확인하세요.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-amber-950 to-slate-900 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
              <span>PARALLEL VERSIONS</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">SYNC VIEW</span>
            </div>
            <div className="grid grid-cols-3 gap-1 py-1.5 text-center text-[10.5px]">
              <div className="p-1 rounded bg-slate-800 font-bold text-white">개역개정</div>
              <div className="p-1 rounded bg-slate-800 text-slate-300">표준새번역</div>
              <div className="p-1 rounded bg-slate-800 text-slate-300">NIV English</div>
            </div>
            <p className="text-[11px] text-amber-200/80">스트롱 코드 원어 사전 클릭 즉시 팝업</p>
          </div>
        </motion.div>

        {/* Point 03: 나만의 절별 노트와 주석 누적 */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col justify-between gap-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug">
                나만의 절별 노트 & 주석 구축
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                평생의 설교와 묵상이 나만의 보물창고로
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed">
              설교와 묵상을 할 때마다 각 절에 남긴 개인 메모와 관련 구절 링크가 클라우드에 영구 저장됩니다. 나중에 같은 본문을 설교할 때{' '}
              <strong className="text-[#0F172A] font-semibold">지난 묵상의 은혜가 즉시 되살아납니다</strong>.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-emerald-950 to-slate-900 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
              <span>LIFETIME SERMON ARCHIVE</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">SAVED</span>
            </div>
            <div className="flex items-center gap-2 py-2 border-y border-emerald-900/80 text-[12px]">
              <span className="material-symbols-outlined text-[#85f8c4] text-[18px]">bookmark_added</span>
              <span>창세기부터 요한계시록까지 절별 메모 자동 정리</span>
            </div>
            <p className="text-[11px] text-emerald-200/80">소그룹 성경공부 나눔 교재 1클릭 내보내기</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
