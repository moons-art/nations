import React from 'react';
import { motion } from 'motion/react';

export const SermonUploadVisual: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1A14] via-[#0E241C] to-[#06120D] border border-emerald-800/60 shadow-2xl p-4 sm:p-5 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/80 mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">upload_file</span>
          <span className="text-[11.5px] font-bold tracking-wider text-emerald-400 font-mono">
            SERMON MANUSCRIPT UPLOAD
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10.5px] font-semibold">
          설교문 및 메모 접수
        </span>
      </div>

      {/* Main Upload & AI Learning Interface */}
      <div className="flex flex-col gap-3 py-1">
        {/* Upload Drop Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-xl border border-dashed border-emerald-500/50 bg-emerald-950/40 p-3.5 flex items-center justify-between gap-3 shadow-inner"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
              <span className="material-symbols-outlined text-[22px]">description</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12.5px] font-bold text-white flex items-center gap-1.5">
                2026-10-04_주일설교_믿음의담대함.docx
                <span className="text-[10px] text-emerald-400 font-normal">완료</span>
              </span>
              <span className="text-[10.5px] text-emerald-300/80">
                12,480 자 · 미교정 메모 설교문 자동 인식
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0">check_circle</span>
        </motion.div>

        {/* AI Pastor Tone Analysis Module */}
        <div className="rounded-xl bg-black/40 border border-emerald-900/60 p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">psychology</span>
              담임목사님 고유 설교톤 & 어휘 학습
            </span>
            <span className="text-emerald-400 font-mono font-bold">99.4% 일치</span>
          </div>

          {/* Progress Gauge */}
          <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
            <div className="w-[99%] h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse" />
          </div>

          {/* Tone Recognition Chips */}
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="px-2 py-1 rounded bg-emerald-900/40 border border-emerald-800/40 text-emerald-200">
              은혜와 확신 <strong className="text-white">99%</strong>
            </div>
            <div className="px-2 py-1 rounded bg-emerald-900/40 border border-emerald-800/40 text-emerald-200">
              성경 중심 예화 <strong className="text-white">100%</strong>
            </div>
            <div className="px-2 py-1 rounded bg-emerald-900/40 border border-emerald-800/40 text-emerald-200">
              감동적인 톤 <strong className="text-white">98%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Status */}
      <div className="flex items-center justify-between text-[11px] text-emerald-300/80 pt-2 border-t border-emerald-900/80">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-emerald-400 text-[15px]">record_voice_over</span>
          목사님 목소리 AI 음성 변환 준비 완료
        </span>
        <span className="text-emerald-400 font-semibold">원고 교정 불필요</span>
      </div>
    </div>
  );
};
