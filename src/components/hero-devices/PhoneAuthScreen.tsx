import React, { useState } from 'react';

interface PhoneAuthScreenProps {
  className?: string;
}

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({ className = '' }) => {
  const [name, setName] = useState('김은혜');
  const [pin, setPin] = useState('•••••');
  const [showPin, setShowPin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <div
      className={`relative mx-auto w-full bg-slate-900 rounded-[28px] p-2 shadow-xl ring-1 ring-slate-800/80 select-none ${className}`}
    >
      {/* Screen Frame */}
      <div className="relative w-full bg-white rounded-[22px] overflow-hidden flex flex-col h-[475px] border border-slate-300/60 shadow-inner">
        {/* Status Bar */}
        <div className="pt-2 px-3.5 pb-1 flex items-center justify-between text-slate-800 text-[10px] font-semibold tracking-tight shrink-0 bg-white z-20">
          <span>9:41</span>
          <div className="w-14 h-2 bg-slate-900 rounded-full mx-auto -mt-0.5 opacity-90"></div>
          <div className="flex items-center gap-1 text-slate-700">
            <span className="text-[9px] font-bold">5G</span>
            <span className="material-symbols-outlined text-[11px]">battery_full</span>
          </div>
        </div>

        {/* Church Header */}
        <div className="pt-1 pb-1.5 px-3 flex flex-col items-center text-center shrink-0 bg-white z-20">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <div className="w-5.5 h-5.5 flex items-center justify-center text-slate-900">
              <span className="material-symbols-outlined text-[20px]">church</span>
            </div>
            <div className="text-left">
              <h4 className="text-[12.5px] font-black text-slate-900 leading-tight whitespace-nowrap">
                2026년 서울교회
              </h4>
              <p className="text-[9.5px] font-bold text-blue-600 tracking-tight whitespace-nowrap">
                네이션스 교회투표
              </p>
            </div>
          </div>
          <div className="w-full max-w-[170px] h-[1px] bg-slate-200 mt-1.5"></div>
        </div>

        {/* Church Sanctuary Image with Floating Auth Card */}
        <div className="relative h-40 shrink-0 overflow-hidden bg-gradient-to-b from-[#1c1917] via-[#292524] to-[#44403c]">
          {/* Church Sanctuary Vector Illustration (Always renders instantly, never breaks) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 160"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="sanctuarySky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b18" />
                <stop offset="50%" stopColor="#3d2f24" />
                <stop offset="100%" stopColor="#574233" />
              </linearGradient>
              <radialGradient id="crossGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="archWindow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Chapel Wall & Background */}
            <rect width="200" height="160" fill="url(#sanctuarySky)" />

            {/* Central Cathedral Arched Stained-Glass Window */}
            <path
              d="M 80,110 L 80,45 Q 100,16 120,45 L 120,110 Z"
              fill="url(#archWindow)"
              opacity="0.9"
            />
            {/* Window tracery */}
            <path
              d="M 100,20 L 100,110 M 80,55 L 120,55 M 80,80 L 120,80"
              stroke="#451a03"
              strokeWidth="1.2"
              opacity="0.6"
            />

            {/* Glowing Holy Cross in Sanctuary */}
            <circle cx="100" cy="54" r="36" fill="url(#crossGlow)" />
            {/* Cross vertical & horizontal beam */}
            <rect x="98.5" y="32" width="3" height="46" rx="0.8" fill="#fffbeb" />
            <rect x="88" y="44" width="24" height="3" rx="0.8" fill="#fffbeb" />

            {/* Altar platform */}
            <polygon points="52,112 148,112 165,132 35,132" fill="#292524" opacity="0.95" />
            <rect x="74" y="104" width="52" height="10" rx="1.5" fill="#44403c" />

            {/* Warm Church Pews Left & Right */}
            <polygon points="8,135 68,118 68,125 8,145" fill="#574233" />
            <polygon points="8,148 66,128 66,135 8,158" fill="#3e2d22" />
            <polygon points="192,135 132,118 132,125 192,145" fill="#574233" />
            <polygon points="192,148 134,128 134,135 192,158" fill="#3e2d22" />

            {/* Warm ambient light rays radiating from altar */}
            <polygon points="100,54 30,160 170,160" fill="#fef08a" opacity="0.15" />
          </svg>

          {/* Photographic overlay with referrerPolicy="no-referrer" */}
          <img
            src="https://images.unsplash.com/photo-1548625361-1959739ef51a?auto=format&fit=crop&w=600&q=80"
            alt=""
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-100 z-10 transition-opacity duration-300"
            loading="eager"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-15 pointer-events-none"></div>

          {/* Floating Pill Banner "본인 인증" */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[88%] bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-2 shadow-md border border-white/90 text-center z-20 overflow-hidden">
            <div className="font-extrabold text-[11px] text-slate-900 leading-tight">
              본인 인증
            </div>
            <div className="text-[8px] text-slate-600 font-medium tracking-tight mt-0.5 whitespace-nowrap">
              성명과 PIN 번호를 입력하여 인증해 주세요.
            </div>
          </div>
        </div>

        {/* Form Inputs Body */}
        <div className="p-3 flex-1 flex flex-col justify-between bg-white">
          <div className="space-y-2 pt-0.5">
            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-800 mb-0.5 whitespace-nowrap">
                성명
              </label>
              <div className="relative border-b-2 border-slate-700 pb-0.5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full bg-transparent text-[11px] font-bold text-slate-900 focus:outline-none placeholder-slate-400"
                />
              </div>
            </div>

            {/* PIN Input */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-800 mb-0.5 whitespace-nowrap">
                5자리 PIN 번호
              </label>
              <div className="relative border-b-2 border-slate-700 pb-0.5 flex items-center justify-between">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN 입력"
                  className="w-full bg-transparent text-[11px] font-bold text-slate-900 focus:outline-none placeholder-slate-400 tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer p-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {showPin ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsAuthed(!isAuthed)}
                className="w-full py-2 px-2 rounded-lg bg-gradient-to-r from-[#172b4d] to-[#0f1d35] text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{isAuthed ? '인증 완료 ✓' : '선거인 인증'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Secondary Links */}
          <div className="pt-1.5 pb-0.5 flex items-center justify-center gap-1.5 text-[8px] text-slate-500 font-medium whitespace-nowrap border-t border-slate-100">
            <span className="hover:text-slate-700 cursor-pointer">도우미 로그인</span>
            <span className="text-slate-300">·</span>
            <span className="hover:text-slate-700 cursor-pointer flex items-center gap-0.5">
              <span>스마트 현장 투표소 모드</span>
            </span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="pb-1 pt-0.5 flex justify-center bg-white">
          <div className="w-20 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
