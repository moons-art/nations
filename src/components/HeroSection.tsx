import React, { useState, useEffect, useRef } from 'react';
import { HERO_VIDEO_MP4, CORE_POINT_IMAGES } from '../data/products';

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
    onSearchQuery(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO VIDEO: 16:9 Full-Width Container (No Left/Right Cropping) */}
      <section className="relative w-full aspect-video max-h-[85vh] overflow-hidden bg-black flex items-center justify-start">
        {/* HTML5 Native Autoplay Video Player (100% full width and height without cropping) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85 sm:opacity-90"
            src={HERO_VIDEO_MP4}
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          {/* Subtle Scrim Gradients for text contrast without darkening the top header */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        </div>

        {/* Overlaid Catchphrase ONLY (Responsive Typography & Cursor) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-12 md:px-16 flex flex-col justify-center pt-10 sm:pt-14 md:pt-18">
          <div className="w-full max-w-4xl text-left">
            <h1 className="tracking-tight leading-[1.25] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              {/* First Line: Slightly Thinner (font-bold instead of font-black) */}
              <span className="block text-[15px] min-[390px]:text-[17px] sm:text-[28px] md:text-[38px] lg:text-[45px] font-bold text-white whitespace-nowrap">
                목회와 사역에만 집중하세요.
              </span>
              {/* Second Line: Slightly Larger Font, No Line-Break (whitespace-nowrap) */}
              <span className="inline-flex items-center text-[17px] min-[390px]:text-[20px] sm:text-[32px] md:text-[44px] lg:text-[52px] font-black text-white whitespace-nowrap mt-1 sm:mt-2.5">
                <span>{displayedSecondLine}</span>
                <span className="inline-block w-[2.5px] sm:w-[4px] h-[0.85em] bg-white ml-1.5 align-middle animate-pulse flex-shrink-0" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. OUTSIDE THE VIDEO (White / Light Canvas Section, exactly like Screenshot 1 & 2) */}
      <section className="w-full bg-[#F8F9FD] py-14 sm:py-20 px-4 flex flex-col items-center text-center">
        <div className="max-w-xl mx-auto w-full flex flex-col items-center">
          {/* Narrative Pain Point Heading */}
          <div className="text-[16px] sm:text-[19px] text-slate-700 leading-relaxed font-medium">
            <h2 className="text-[#006948] font-black text-[23px] sm:text-[30px] mb-3.5 tracking-tight leading-snug">
              중요한 교회 투표와 사역 앞에서
              <br />
              고민이 많으시죠?
            </h2>
            <p className="text-slate-600">
              종이투표? 비효율적인 시간과 행정으로 지치지는 않을지...
            </p>
            <p className="text-slate-600 mt-1">
              스마트 투표? 온 성도가 가능한지, 퀄리티는 믿을 수 있는지...
            </p>
          </div>

          {/* Large Pill-Shaped Search Bar (Matching Screenshot 2) */}
          <div className="w-full max-w-md bg-white rounded-full py-3.5 px-7 sm:px-8 shadow-[0_12px_32px_rgba(0,0,0,0.07)] border border-slate-200/90 flex items-center justify-between mt-8 group hover:shadow-[0_16px_36px_rgba(0,0,0,0.11)] transition-all">
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
                  className="w-full text-[20px] sm:text-[24px] font-black text-[#006948] outline-none bg-transparent"
                  placeholder="궁금한 솔루션을 검색하세요"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-left font-black text-[20px] sm:text-[24px] text-[#006948] truncate hover:text-[#00855d] transition-colors cursor-text w-full block"
                >
                  {searchValue}
                </button>
              )}
            </div>

            <button
              onClick={handleSearchClick}
              aria-label="솔루션 검색 확인"
              type="button"
              className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-[#006948] hover:bg-[#006948] hover:text-white transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[26px]">search</span>
            </button>
          </div>

          {/* Device Showcase Image (Matching Screenshot 2 bottom laptop mockup) */}
          <div className="w-full mt-10 sm:mt-12 flex justify-center">
            <img
              src={CORE_POINT_IMAGES.showcase}
              alt="네이션스 스마트 솔루션 쇼케이스"
              className="w-full max-w-lg h-auto object-contain drop-shadow-2xl hover:scale-[1.01] transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Primary Action CTA Button */}
          <div className="w-full max-w-md mt-6">
            <button
              onClick={onOpenFreeModal}
              className="w-full py-4 px-6 bg-[#006948] hover:bg-[#00855d] text-white rounded-2xl text-[16px] font-bold shadow-[0_8px_24px_rgba(0,105,72,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer border border-[#85f8c4]/30"
            >
              <span className="material-symbols-outlined text-[22px] text-[#85f8c4]">auto_awesome</span>
              <span>100명 미만 교회 무료 신청하기</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};



