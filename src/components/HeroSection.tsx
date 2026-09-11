import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HERO_VIDEO_MP4 } from '../data/products';
import { HeroDevicesShowcase } from './hero-devices/HeroDevicesShowcase';

interface HeroSectionProps {
  onOpenFreeModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFreeModal,
  onSearchQuery,
}) => {
  const [searchValue, setSearchValue] = useState('네이션스 교회투표는?');
  const [isEditing, setIsEditing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Infinite Typewriter & Delete effect: alternates between phrases
  const phrases = [
    '나머지는 네이션스가 해결해 드릴게요',
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
        // Pause when completely typed out so the user can read it comfortably
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
        // Pause briefly after complete deletion, then switch to the other phrase
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
    // Scroll to DifferentiationSection as requested:
    // "네이션스 교회투표는? 검색창 이미지 부분 ->
    //  단순한 앱 개발 회사는 많습니다. 하지만 우리는 교회를 모른 채 기술만 만들지 않습니다!"
    const target = document.getElementById('differentiation');
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

  // Render second line with brand green color on "네이션스" in the last phrase
  const renderSecondLine = () => {
    if (phraseIndex === 1) {
      // '교회를 돕는 모든 것 네이션스'
      // 0..11 is '교회를 돕는 모든 것' (11 chars), 11 is ' ', 12+ is '네이션스'
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
      {/* 1. HERO VIDEO: Extra-tall vertical height on mobile (cropped left/right), 16:9 aspect-video on tablet/desktop */}
      <section className="relative w-full h-[68vh] min-h-[490px] max-h-[700px] sm:h-auto sm:min-h-0 sm:max-h-[85vh] sm:aspect-video overflow-hidden bg-black flex items-center justify-start">
        {/* HTML5 Native Autoplay Video Player */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85 sm:opacity-90"
            src={HERO_VIDEO_MP4}
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          {/* Subtle Scrim Gradients for text contrast without darkening the top header */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        </div>

        {/* Overlaid Catchphrase ONLY (Responsive Typography & Cursor) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-12 md:px-16 flex flex-col justify-center pt-16 sm:pt-14 md:pt-18">
          <div className="w-full max-w-4xl text-left">
            <h1 className="tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              {/* First Line: Lighter, medium weight with clear contrast */}
              <span className="block text-[16px] min-[390px]:text-[18px] min-[430px]:text-[20px] sm:text-[23px] md:text-[28px] lg:text-[32px] font-medium text-white/90 mb-1.5 sm:mb-2.5">
                목회와 사역에만 집중하세요.
              </span>
              {/* Second Line: Significantly larger, ultra-bold font-black, high contrast with glowing green accent */}
              <span className="inline-flex flex-wrap items-center text-[26px] min-[390px]:text-[29px] min-[430px]:text-[32px] sm:text-[36px] md:text-[46px] lg:text-[54px] font-black text-white leading-tight break-keep-all">
                {renderSecondLine()}
                <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.85em] bg-white ml-2 align-middle animate-pulse flex-shrink-0" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. OUTSIDE THE VIDEO (White / Light Canvas Section, exactly like Screenshot 1 & 2) */}
      <section className="w-full bg-[#F8F9FD] py-14 sm:py-20 px-3 sm:px-6 flex flex-col items-center text-center">
        <div className="max-w-xl sm:max-w-3xl md:max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* Narrative Pain Point Heading - Strict single-line display across all mobile screens */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-slate-700 leading-relaxed font-medium flex flex-col items-center"
          >
            <h2 className="text-[#006948] font-black text-[18px] min-[360px]:text-[21px] min-[400px]:text-[24px] sm:text-[32px] md:text-[36px] mb-3.5 tracking-tight leading-snug">
              <span className="block whitespace-nowrap">중요한 교회 투표와 사역 앞에서</span>
              <span className="block whitespace-nowrap">고민이 많으시죠?</span>
            </h2>
            <p className="text-slate-600 text-[10.5px] min-[360px]:text-[12px] min-[390px]:text-[13.5px] min-[430px]:text-[15px] sm:text-[17px] md:text-[19px] whitespace-nowrap tracking-tighter min-[390px]:tracking-tight sm:tracking-normal">
              종이투표? 비효율적인 시간과 행정으로 지치지는 않을지...
            </p>
            <p className="text-slate-600 text-[10.5px] min-[360px]:text-[12px] min-[390px]:text-[13.5px] min-[430px]:text-[15px] sm:text-[17px] md:text-[19px] whitespace-nowrap tracking-tighter min-[390px]:tracking-tight sm:tracking-normal mt-1 sm:mt-1.5">
              스마트 투표? 온 성도가 가능한지, 퀄리티는 믿을 수 있는지...
            </p>
          </motion.div>

          {/* Large Pill-Shaped Search Bar (Expanded on pad & PC) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white rounded-full py-3.5 px-6 sm:px-8 shadow-[0_12px_32px_rgba(0,0,0,0.07)] border border-slate-200/90 flex items-center justify-between mt-8 group hover:shadow-[0_16px_36px_rgba(0,0,0,0.11)] transition-all"
          >
            <div className="text-left flex-1 min-w-0 pr-3">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider block uppercase">
                nations
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
                  placeholder="궁금한 솔루션을 검색하세요"
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

          {/* Device Showcase (Pad & Smartphone UI Screens: 2 Phones + 1 Pad) */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mt-10 sm:mt-14 flex justify-center"
          >
            <HeroDevicesShowcase onExploreClick={handleSearchClick} />
          </motion.div>

          {/* Primary Action CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md sm:max-w-lg mt-8"
          >
            <button
              onClick={onOpenFreeModal}
              className="w-full py-4 px-6 sm:px-8 bg-[#006948] hover:bg-[#00855d] text-white rounded-2xl text-[16px] sm:text-[17px] font-bold shadow-[0_8px_24px_rgba(0,105,72,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer border border-[#85f8c4]/30"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px] text-[#85f8c4]">how_to_vote</span>
              <span>네이션스 교회투표 무료 도입 및 신청 하기</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};



