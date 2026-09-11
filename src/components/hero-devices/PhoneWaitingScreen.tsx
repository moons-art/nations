import React from 'react';

interface PhoneWaitingScreenProps {
  className?: string;
}

export const PhoneWaitingScreen: React.FC<PhoneWaitingScreenProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative mx-auto w-full bg-slate-900 rounded-[30px] p-2 shadow-2xl ring-1 ring-slate-800/80 select-none ${className}`}
    >
      {/* Phone Screen Outer Bezel */}
      <div className="relative w-full bg-[#f1f5f9] rounded-[24px] overflow-hidden flex flex-col h-[475px] border border-slate-300/60 shadow-inner">
        {/* Status Bar */}
        <div className="pt-2 px-4 pb-1 flex items-center justify-between text-slate-800 text-[10.5px] font-semibold tracking-tight shrink-0 bg-[#f1f5f9]">
          <span>9:41</span>
          <div className="w-16 h-2.5 bg-slate-900 rounded-full mx-auto -mt-0.5 opacity-90"></div>
          <div className="flex items-center gap-1 text-slate-700">
            <span className="text-[9.5px] font-bold">5G</span>
            <span className="material-symbols-outlined text-[12px]">battery_full</span>
          </div>
        </div>

        {/* Top Church Header */}
        <div className="pt-2.5 pb-1.5 px-4 flex flex-col items-center text-center shrink-0">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {/* Church Icon */}
            <div className="w-6.5 h-6.5 flex items-center justify-center text-slate-900">
              <span className="material-symbols-outlined text-[24px]">church</span>
            </div>
            <div className="text-left">
              <h4 className="text-[14px] font-extrabold text-slate-900 leading-tight whitespace-nowrap">
                2026년 서울교회
              </h4>
              <p className="text-[10.5px] font-bold text-blue-600 tracking-tight whitespace-nowrap">
                네이션스 교회투표
              </p>
            </div>
          </div>
          <div className="w-full max-w-[190px] h-[1px] bg-slate-300/80 mt-2"></div>
        </div>

        {/* Vertically Centered Content Body */}
        <div className="px-3 flex-1 flex flex-col items-center justify-center -mt-2">
          {/* Voter Greeting */}
          <div className="mb-2.5 text-center">
            <span className="text-[12px] text-slate-700 font-medium">선거인 확인 </span>
            <span className="text-[14.5px] text-slate-900 font-black tracking-tight">김은혜</span>
          </div>

          {/* Central Waiting Card */}
          <div className="w-full bg-white rounded-xl p-3 shadow-xs border border-slate-200/90 flex flex-col items-center text-center overflow-hidden">
            {/* Clock Icon Box */}
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700 mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>

            {/* Waiting Title */}
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-1.5 tracking-tight whitespace-nowrap">
              장로 피택 투표 준비 중
            </h3>

            {/* Bible Verse */}
            <p className="text-[9.5px] leading-relaxed text-[#854d0e] font-medium px-1 break-keep text-center">
              온 무리가 믿음과 성령이 충만한 사람을 택하여 사도들 앞에 세우니 사도들이 안수하니라
              <span className="text-[8.5px] text-amber-700 font-bold mt-1 block">(행 6:5-6)</span>
            </p>
          </div>
        </div>

        {/* Home Indicator bar */}
        <div className="pb-1.5 pt-1 flex justify-center bg-[#f1f5f9]">
          <div className="w-24 h-1 bg-slate-400/80 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
