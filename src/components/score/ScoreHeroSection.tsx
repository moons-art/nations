import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SCORE_HERO_VIDEO_MP4 } from '../../data/products';
import { ScoreDevicesShowcase } from './ScoreDevicesShowcase';

interface ScoreHeroSectionProps {
  onOpenDemoModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const ScoreHeroSection: React.FC<ScoreHeroSectionProps> = ({
  onOpenDemoModal,
  onSearchQuery,
}) => {
  const [searchValue, setSearchValue] = useState('네이션스 스튜디오는?');
  const [isEditing, setIsEditing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Infinite Typewriter & Delete effect: alternates between phrases
  const phrases = [
    '예배준비 네이션스가 해결해 드릴게요',
    '교회를 돕는 모든 것 네이션스',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedSecondLine, setDisplayedSecondLine] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
    const target = document.getElementById('score-differentiation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onSearchQuery(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
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
      {/* 1. HERO VIDEO: Exactly matching main page (Full bleed, high impact video) */}
      <section className="relative w-full h-[68vh] min-h-[490px] max-h-[700px] sm:h-auto sm:min-h-0 sm:max-h-[85vh] sm:aspect-video overflow-hidden bg-black flex items-center justify-start">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            key={SCORE_HERO_VIDEO_MP4}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85 sm:opacity-90"
            src={SCORE_HERO_VIDEO_MP4}
          >
            <source src={SCORE_HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        </div>

        {/* Overlaid Catchphrase ONLY (Responsive Typography & Cursor) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-12 md:px-16 flex flex-col justify-center pt-16 sm:pt-14 md:pt-18">
          <div className="w-full max-w-4xl text-left">
            <h1 className="tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              <span className="block text-[16px] min-[390px]:text-[18px] min-[430px]:text-[20px] sm:text-[23px] md:text-[28px] lg:text-[32px] font-medium text-white/90 mb-1.5 sm:mb-2.5">
                찬양과 기름부으심에만 집중하세요
              </span>
              <span className="inline-flex flex-wrap items-center text-[26px] min-[390px]:text-[29px] min-[430px]:text-[32px] sm:text-[36px] md:text-[46px] lg:text-[54px] font-black text-white leading-tight break-keep-all">
                {renderSecondLine()}
                <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.85em] bg-white ml-2 align-middle animate-pulse flex-shrink-0" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. OUTSIDE THE VIDEO: Worship Music Sheet Focus */}
      <section className="w-full bg-[#F8F9FD] py-14 sm:py-20 px-3 sm:px-6 flex flex-col items-center text-center">
        <div className="max-w-xl sm:max-w-3xl md:max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* Narrative Pain Point Heading for Worship Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-slate-700 leading-relaxed font-medium flex flex-col items-center"
          >
            <h2 className="text-[#006948] font-black text-[18px] min-[360px]:text-[21px] min-[400px]:text-[24px] sm:text-[30px] md:text-[34px] mb-3.5 tracking-tight leading-snug break-keep-all">
              <span>매주 콘티와 악보 준비에 지친 예배 인도자의 고민</span>
            </h2>
            <p className="text-slate-600 text-[12px] min-[360px]:text-[13px] min-[390px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] leading-relaxed break-keep-all text-center">
              악보 편집의 번거로움, 매번 찾아야 하는 악보,
            </p>
            <p className="text-slate-600 text-[12px] min-[360px]:text-[13px] min-[390px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] leading-relaxed break-keep-all text-center mt-1 sm:mt-1.5">
              찬양팀 모두가 실시간으로 공유하는 악보와 송폼 카피곡 플랫폼은 없을까?
            </p>
          </motion.div>

          {/* Large Pill-Shaped Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 65 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white rounded-full py-3.5 px-6 sm:px-8 shadow-[0_12px_32px_rgba(0,0,0,0.07)] border border-slate-200/90 flex items-center justify-between mt-8 group hover:shadow-[0_16px_36px_rgba(0,0,0,0.11)] transition-all"
          >
            <div className="text-left flex-1 min-w-0 pr-3">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider block uppercase">
                nations studio
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full text-[19px] sm:text-[23px] md:text-[26px] font-black text-[#006948] outline-none bg-transparent"
                  placeholder="궁금한 찬양 스튜디오 기능을 검색하세요"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-left font-black text-[19px] sm:text-[23px] md:text-[26px] text-[#006948] truncate hover:text-[#00855d] transition-colors cursor-text w-full block"
                >
                  {searchValue}
                </button>
              )}
            </div>

            <button
              onClick={handleSearchClick}
              aria-label="솔루션 검색 확인"
              type="button"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#006948] hover:bg-[#006948] hover:text-white transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[26px] sm:text-[28px]">search</span>
            </button>
          </motion.div>

          {/* Interactive Music Sheet Tablet & Companion Device Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-10 sm:mt-14 flex justify-center"
          >
            <ScoreDevicesShowcase onExploreClick={handleSearchClick} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
