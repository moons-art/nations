import React from 'react';
import { motion } from 'motion/react';

export const ScoreCoreValuesSection: React.FC = () => {
  return (
    <section
      className="w-full px-5 py-8 sm:py-12 sm:px-8 lg:px-12 flex flex-col gap-8 bg-[#eff4ff] rounded-3xl shadow-xs border border-blue-100/70"
      id="core-values"
    >
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col text-center gap-1.5 max-w-2xl mx-auto"
      >
        <span className="text-[13px] sm:text-[14px] text-[#006948] tracking-widest uppercase font-bold">
          CORE VALUES
        </span>
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0F172A] leading-tight">
          네이션스 악보가 약속하는 3가지 원칙
        </h2>
        <p className="text-[13px] sm:text-[14px] text-slate-600 mt-1">
          예배 찬양팀과 사역자가 오직 하나님을 향한 찬양과 예배에만 몰입할 수 있도록 돕습니다.
        </p>
      </motion.div>

      {/* 3 Core Points: Responsive 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Point 01: 직관적인 사역에 집중하다 */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">auto_stories</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] leading-snug">
                직관적인 사역에 집중하다
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                악보 정리와 콘티 준비의 놀라운 간소화
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed break-keep-all">
              복잡한 편집과 종이 출력의 번거로움에서 벗어나세요. 찬양의 흐름을 매끄럽게 잇는 송폼(Song Form)과 콘티 정리가 한눈에 가능. 오직 은혜로운 찬양 연습과 깊은 예배 준비에만 온전히 몰입할 수 있습니다.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
              <span>INTUITIVE WORSHIP FLOW</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">SONG FORM</span>
            </div>
            <div className="flex items-center justify-between py-2 border-y border-slate-700/80 text-[12px] gap-1">
              <span className="px-2 py-1 rounded bg-slate-700 font-bold text-slate-200">Intro</span>
              <span className="text-slate-500">→</span>
              <span className="px-2 py-1 rounded bg-slate-700 font-bold text-slate-200">Verse</span>
              <span className="text-slate-500">→</span>
              <span className="px-2 py-1 rounded bg-[#006948] font-bold text-[#85f8c4]">Chorus</span>
              <span className="text-slate-500">→</span>
              <span className="px-2 py-1 rounded bg-slate-700 font-bold text-slate-200">Bridge</span>
            </div>
            <p className="text-[11px] text-slate-400">송폼 자동 정리 · 콘티 원스톱 편집 및 인쇄</p>
          </div>
        </motion.div>

        {/* Point 02: 하나의 영으로 예배하다 */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">groups</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] leading-snug">
                하나의 영으로 예배하다
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                찬양팀 전체를 하나로 묶는 실시간 공유
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed break-keep-all">
              기도로 채워진 콘티와 송폼, 카피곡 유튜브 영상이 찬양팀에게 실시간으로 동기화되며, 찬양 인도자, 찬양팀, 그리고 회중용 악보뷰를 제공하여 소그룹 기도회, 작은 예배에서 스마트폰으로 찬양의 호흡을 맞출 수 있습니다.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-blue-950 to-slate-900 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-blue-300 font-mono">
              <span>REAL-TIME MULTI-VIEW SYNC</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">CONNECTED</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 py-2 text-center text-[11px]">
              <div className="p-1.5 rounded-lg bg-blue-900/70 border border-blue-500/40 font-bold text-white">인도자 뷰</div>
              <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 font-bold text-slate-200">찬양팀 뷰</div>
              <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 font-bold text-slate-200">회중용 뷰</div>
            </div>
            <p className="text-[11px] text-blue-200">카피곡 유튜브 영상 연동 · 소그룹 스마트폰 실시간 호흡</p>
          </div>
        </motion.div>

        {/* Point 03: 거룩한 예배를 기억하다, */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between gap-4 border border-[#E2E8F0]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#006948] text-[12px] font-bold">
                Point 03
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">cloud_done</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] leading-snug">
                거룩한 예배를 기억하다,
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#006948] font-semibold">
                악보 예배의 콘티 영구 보존
              </p>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#475569] leading-relaxed break-keep-all">
              소중한 악보와 지난 찬양 콘티가 클라우드에 안전하게 쌓입니다. 분실과 훼손의 염려 없이 스마트폰과 태블릿으로 언제 어디서나 열람하며, 예배의 영적 맥락과 감동을 연속성 있게 이어갑니다.
            </p>
          </div>

          {/* Graphic Visual Box */}
          <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-emerald-950 to-slate-900 text-white flex flex-col gap-2 mt-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
              <span>CLOUD CONTI ARCHIVE</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">PERMANENT</span>
            </div>
            <div className="flex items-center gap-2 py-2 border-y border-emerald-900/80 text-[12px]">
              <span className="material-symbols-outlined text-[#85f8c4] text-[20px]">history_edu</span>
              <span className="font-semibold text-slate-100">지난 예배 찬양 콘티 & 악보 영구 보존</span>
            </div>
            <p className="text-[11px] text-emerald-200/80">분실·훼손 염려 없이 스마트폰·태블릿 언제 어디서나 열람</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
