import React from 'react';

interface DifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const DifferentiationSection: React.FC<DifferentiationSectionProps> = ({
  onOpenKakao,
}) => {
  return (
    <section className="px-4 py-8 max-w-lg mx-auto w-full" id="differentiation">
      <div className="w-full bg-[#1E293B] text-white rounded-3xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden border border-slate-700/70">
        {/* Glow ambient background */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#006948]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Contrast Callout */}
        <div className="flex flex-col gap-2 relative z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[#85f8c4] text-[11px] font-bold w-max border border-slate-700">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Differentiation</span>
          </div>

          <p className="text-[13px] text-slate-400 leading-snug">
            단순한 앱 개발 회사는 많습니다.
          </p>

          <h2 className="text-[20px] sm:text-[22px] font-bold text-white leading-snug">
            하지만 우리는 <span className="text-[#85f8c4]">교회를 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] text-slate-300 leading-relaxed">
            교회 현장의 질서와 정서, 예배의 거룩함을 완벽히 이해하는 전문가 그룹이{' '}
            <strong className="text-[#85f8c4] font-semibold">사역의 언어로 시스템을 구축</strong>합니다.
          </p>
        </div>

        {/* Q&A Box */}
        <div className="bg-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 relative z-10 backdrop-blur-sm shadow-inner border border-slate-700/60">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center font-extrabold text-[13px] shrink-0">
              Q
            </span>
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
              스마트 시스템 도입 시 어르신들이 어려워하지 않을까요?
            </h3>
          </div>

          <div className="w-full h-[1px] bg-slate-700" />

          <div className="flex items-start gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#006948] flex items-center justify-center font-extrabold text-[13px] shrink-0 mt-0.5">
              A
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[14px] text-[#85f8c4] font-semibold leading-snug">
                네이션스의 모든 솔루션은 '현장 중심'으로 설계됩니다.
              </p>
              <p className="text-[13px] text-slate-300 leading-relaxed">
                직관적인 화면 구성은 물론, 대리 인증 및 종이 투표 병행 가이드 등 현장 맞춤형 매뉴얼을 함께 제공하여 단 한 명의 성도도 소외되지 않도록 돕습니다.
              </p>
            </div>
          </div>

          {/* Warm Reassurance Note */}
          <div className="p-2.5 rounded-lg bg-[#006948]/25 text-[#85f8c4] text-[13px] leading-relaxed border border-[#006948]/40 mt-1">
            💡 IT 전문 지식이 없는 목회자와 성도님도{' '}
            <strong className="text-white font-semibold">별도의 교육 없이 바로 쓸 수 있는 단순함</strong>이 네이션스의 원칙입니다.
          </div>

          <button
            type="button"
            onClick={onOpenKakao}
            className="mt-1 w-full py-2.5 px-3 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white text-[13px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
          >
            <span>카카오톡으로 자세히 문의하기</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
