import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HERO_VIDEO_MP4 } from '../data/products';
import { QuestionCardCursor } from './common/QuestionCardCursor';

interface HeroSectionProps {
  onOpenFreeModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFreeModal: _onOpenFreeModal,
  onSearchQuery,
}) => {
  const [searchValue] = useState('네이션스 교회투표는?');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Infinite Typewriter & Delete effect: alternates between phrases
  const phrases = [
    '교회 투표 네이션스가 해결해 드릴게요',
    '교회를 돕는 모든 것 네이션스',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedSecondLine, setDisplayedSecondLine] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Continuous Typewriter & Erase effect matching Nations Sermon concept
  const fullQuestionsContinuous =
    '종이투표 인쇄와 개표에 주일 하루가 다 가는데 모바일로 안전하게 바꿀 수 없을까? 어르신들도 어려움 없이 스마트폰으로 투표할 수 있을까? 투표 결과의 공정성과 교인 명부 보안은 완벽하게 지킬 수 있을까? 총회와 공동의회 투표를 실시간으로 집계할 순 없을까?';
  const [displayedText, setDisplayedText] = useState('');
  const [isQuestionDeleting, setIsQuestionDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isQuestionDeleting) {
      if (displayedText.length < fullQuestionsContinuous.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullQuestionsContinuous.slice(0, displayedText.length + 1));
        }, 32);
      } else {
        timer = setTimeout(() => {
          setIsQuestionDeleting(true);
        }, 2800);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullQuestionsContinuous.slice(0, displayedText.length - 1));
        }, 14);
      } else {
        timer = setTimeout(() => {
          setIsQuestionDeleting(false);
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isQuestionDeleting, fullQuestionsContinuous]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (displayedSecondLine.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedSecondLine(currentPhrase.slice(0, displayedSecondLine.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayedSecondLine.length > 0) {
        timer = setTimeout(() => {
          setDisplayedSecondLine(currentPhrase.slice(0, displayedSecondLine.length - 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsDeleting(false);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedSecondLine, isDeleting, phraseIndex]);

  // Guarantee video auto-playback on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay initiated:', err);
      });
    }
  }, []);

  const handleSearchClick = () => {
    const target = document.getElementById('differentiation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onSearchQuery(searchValue);
  };

  const renderSecondLine = () => {
    if (phraseIndex === 1) {
      if (displayedSecondLine.length <= 11) {
        return <span>{displayedSecondLine}</span>;
      }
      const normalPart = displayedSecondLine.slice(0, 11);
      const greenPart = displayedSecondLine.slice(12);
      return (
        <>
          <span>{normalPart}</span>
          <span className="inline-block w-2 sm:w-3" />
          <span className="text-[#85f8c4] font-black drop-shadow-[0_2px_16px_rgba(133,248,196,0.5)]">
            {greenPart}
          </span>
        </>
      );
    }
    return <span>{displayedSecondLine}</span>;
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO VIDEO */}
      <section className="relative w-full h-[68vh] min-h-[490px] max-h-[700px] sm:h-auto sm:min-h-0 sm:max-h-[85vh] sm:aspect-video overflow-hidden bg-black flex items-center justify-start">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            key={HERO_VIDEO_MP4}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85 sm:opacity-90"
            src={HERO_VIDEO_MP4}
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        </div>

        {/* Overlaid Catchphrase */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-12 md:px-16 flex flex-col justify-center pt-16 sm:pt-14 md:pt-18">
          <div className="w-full max-w-4xl text-left">
            <h1 className="tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              <span className="block text-[14px] min-[390px]:text-[15.5px] min-[430px]:text-[17px] sm:text-[19px] md:text-[23px] lg:text-[26px] font-medium text-white/90 mb-1 sm:mb-2">
                목회에만 집중하도록 돕습니다.
              </span>
              <span className="inline-flex flex-wrap items-center text-[22px] min-[390px]:text-[24px] min-[430px]:text-[26px] sm:text-[30px] md:text-[38px] lg:text-[44px] font-bold text-white leading-tight break-keep-all">
                {renderSecondLine()}
                <span className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-white ml-2 align-middle animate-pulse flex-shrink-0" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. OUTSIDE THE VIDEO: Nations Vote Focus & Typewriter Showcase (Sermon Concept Applied) */}
      <section className="w-full bg-[#F8F9FD] py-12 sm:py-16 px-3 sm:px-6 flex flex-col items-center text-center">
        <div className="max-w-5xl lg:max-w-6xl mx-auto w-full flex flex-col items-center">
          {/* Narrative Pain Point Heading & Big Question Box */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-slate-700 leading-relaxed font-medium flex flex-col items-center gap-5 sm:gap-6"
          >
            <h2 className="text-[#0F172A] font-bold text-[18px] min-[360px]:text-[19.5px] min-[400px]:text-[21px] sm:text-[25px] md:text-[28px] tracking-tight leading-snug break-keep-all text-center px-2">
              <span>중요한 교회투표를 앞둔 목회자의 고민</span>
            </h2>

            {/* Outer Container with Clean Minimal Styling */}
            <div className="w-full max-w-4xl lg:max-w-5xl p-2 min-[360px]:p-2.5 sm:p-3.5 md:p-4 rounded-[26px] min-[360px]:rounded-[30px] sm:rounded-[40px] md:rounded-[44px] bg-slate-100/80 border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.04)]">
              {/* Card Surface */}
              <div className="w-full bg-white rounded-[22px] min-[360px]:rounded-[26px] sm:rounded-[32px] md:rounded-[36px] p-2 min-[360px]:p-2.5 sm:p-3.5 md:p-4 shadow-sm border border-slate-200/60">
                {/* Inner Input Box: 4번 스타일 - 하단 툴바형 */}
                <div className="relative w-full bg-[#FAFBFD] hover:bg-white rounded-[18px] min-[360px]:rounded-[20px] sm:rounded-[26px] md:rounded-[28px] border border-slate-200/90 hover:border-slate-300 transition-colors duration-200 p-3.5 min-[360px]:p-4 min-[400px]:p-5 sm:p-7 md:p-8 h-[195px] min-[360px]:h-[205px] min-[400px]:h-[215px] sm:h-[240px] md:h-[255px] flex flex-col justify-between text-left overflow-hidden">
                  {/* Top-aligned continuous typewriter text */}
                  <div className="w-full">
                    <p className="text-[11.2px] min-[360px]:text-[12px] min-[390px]:text-[12.6px] min-[430px]:text-[13.5px] sm:text-[16px] md:text-[17px] text-slate-800 leading-[1.52] min-[360px]:leading-[1.58] sm:leading-[1.78] font-normal tracking-tight break-keep-all whitespace-pre-wrap select-text">
                      <span>{displayedText}</span>
                      <QuestionCardCursor />
                    </p>
                  </div>

                  {/* 하단 툴바: 구분선 없는 좌측 심플 + 및 우측 화살표 액션 버튼 */}
                  <div className="w-full pt-1 sm:pt-2 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center pl-1">
                      <span className="text-slate-400 hover:text-slate-600 text-[20px] sm:text-[22px] font-light leading-none select-none cursor-default transition-colors">
                        +
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSearchClick}
                      aria-label="솔루션으로 이동"
                      className="w-7 h-7 min-[360px]:w-7.5 min-[360px]:h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[13px] min-[360px]:text-[14px] sm:text-[16px] font-bold">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
