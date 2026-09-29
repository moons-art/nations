import React from 'react';
import { motion } from 'motion/react';

interface ScoreDifferentiationSectionProps {
  onOpenKakao: () => void;
}

export const ScoreDifferentiationSection: React.FC<ScoreDifferentiationSectionProps> = ({
  onOpenKakao,
}) => {
  return (
    <section
      id="score-differentiation"
      className="w-full bg-[#080B11] text-white relative overflow-hidden border-y border-slate-800/90 shadow-2xl"
    >
      {/* Glow ambient background */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#C15F3C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Inner Content: Max width 6xl, centered */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 relative z-10">
        {/* Contrast Callout (Left Column on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center gap-4 lg:col-span-6"
        >
          <p className="text-[14px] sm:text-[16px] text-white/80 font-medium">
            단순한 PDF 앱은 많습니다.
          </p>

          <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-black text-white leading-snug tracking-tight">
            하지만 우리는 <span className="text-white underline decoration-[#C15F3C] decoration-4 underline-offset-4">예배 현장을 모른 채</span>
            <br />
            기술만 만들지 않습니다!
          </h2>

          <p className="text-[14px] sm:text-[16px] text-white/80 leading-relaxed max-w-xl">
            찬양 사역자와 반주자의 호흡, 기도의 사모함과 잔잔한 긴장감까지 속속들이 이해하는 전문가 그룹이{' '}
            <strong className="text-white font-semibold">예배의 언어로 시스템을 구축</strong>합니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[13px] text-white/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>찬양인도자 맞춤 설계</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>찬양팀 실시간 악보, 송품, 카피곡 유튜브 연동</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span>회중용 악보 뷰어 제공</span>
            </div>
          </div>
        </motion.div>

        {/* Q&A Box (Right Column on large screens) */}
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121826]/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 relative z-10 backdrop-blur-md shadow-2xl border border-slate-800/90 lg:col-span-6 justify-center"
        >
          {/* Q&A 1: 어디서나 접속 */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C15F3C] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
                Q
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
                악보와 콘티는 어디서나 볼수 있나요?
              </h3>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#FFEDD5] text-[#C15F3C] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
                A
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] sm:text-[15px] text-[#FB923C] font-bold leading-snug">
                  네이션스의 모든 솔루션은 &apos;현장 중심&apos;으로 설계됩니다.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed break-keep-all">
                  네이션스 악보의 모든 데이터는 안전하게 클라우드에 저장되어 전세계 어디에서든 접속이 가능합니다. 또한 찬양팀 플랫폼, 회중용 플랫폼이 따로 제공되어 모든 기기에서 접속이 가능합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          {/* Q&A 2: 악보 구하기 */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C15F3C] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
                Q
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
                악보는 어떻게 구할수 있나요?
              </h3>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#FFEDD5] text-[#C15F3C] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
                A
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] sm:text-[15px] text-[#FB923C] font-bold leading-snug">
                  네이션스 악보앱은 악보를 판매하지 않습니다.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed break-keep-all">
                  사용자 개인이 정상적으로 구입한 악보를 관리하는 라이브러리와 뷰어를 제공합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-800" />

          {/* Q&A 3: 찬양팀 공유 */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#C15F3C] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-sm">
                Q
              </span>
              <h3 className="text-[15px] sm:text-[17px] font-bold text-white leading-snug">
                찬양팀과 어떻게 공유하나요?
              </h3>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#FFEDD5] text-[#C15F3C] flex items-center justify-center font-black text-[14px] shrink-0 mt-0.5 shadow-sm">
                A
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] sm:text-[15px] text-[#FB923C] font-bold leading-snug">
                  매주 악보와 송품을 보내던 번거로움은 잊으세요.
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-300 leading-relaxed break-keep-all">
                  네이션스 악보앱은 찬양인도자가 앱에 저장한 콘티와 송폼, 카피를 위한 유튜브 영상까지 한번에 공유할 수 있습니다. 찬양팀 접속페이지를 공유해 실시간 송폼 수정과 문의, 대화, 교제가 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

