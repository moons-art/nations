import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BIBLE_HERO_VIDEO_MP4 } from '../../data/products';
import { BibleDevicesShowcase } from './BibleDevicesShowcase';

interface BibleHeroSectionProps {
  onOpenDemoModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const BibleHeroSection: React.FC<BibleHeroSectionProps> = ({
  onOpenDemoModal,
  onSearchQuery,
}) => {
  const [searchValue, setSearchValue] = useState('네이션스 성경은?');
  const [isEditing, setIsEditing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Infinite Typewriter & Delete effect
  const phrases = [
    '설교준비 네이션스가 해결해 드릴게요',
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay initiated:', err);
      });
    }
  }, []);

  const handleSearchClick = () => {
    const target = document.getElementById('bible-differentiation');
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
      {/* 1. HERO VIDEO: Exactly matching main page */}
      <section className="relative w-full h-[68vh] min-h-[490px] max-h-[700px] sm:h-auto sm:min-h-0 sm:max-h-[85vh] sm:aspect-video overflow-hidden bg-black flex items-center justify-start">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            key={BIBLE_HERO_VIDEO_MP4}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-85 sm:opacity-90"
            src={BIBLE_HERO_VIDEO_MP4}
          >
            <source src={BIBLE_HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        </div>

        {/* Overlaid Catchphrase ONLY */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-12 md:px-16 flex flex-col justify-center pt-16 sm:pt-14 md:pt-18">
          <div className="w-full max-w-4xl text-left">
            <h1 className="tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              <span className="block text-[16px] min-[390px]:text-[18px] min-[430px]:text-[20px] sm:text-[23px] md:text-[28px] lg:text-[32px] font-medium text-white/90 mb-1.5 sm:mb-2.5">
                묵상과 성경연구에만 집중하세요
              </span>
              <span className="inline-flex flex-wrap items-center text-[26px] min-[390px]:text-[29px] min-[430px]:text-[32px] sm:text-[36px] md:text-[46px] lg:text-[54px] font-black text-white leading-tight break-keep-all">
                {renderSecondLine()}
                <span className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.85em] bg-white ml-2 align-middle animate-pulse flex-shrink-0" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. OUTSIDE THE VIDEO: Nations Bible Focus */}
      <section className="w-full bg-[#F8F9FD] py-14 sm:py-20 px-3 sm:px-6 flex flex-col items-center text-center">
        <div className="max-w-xl sm:max-w-3xl md:max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* Narrative Pain Point Heading for Bible Study & Preach */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-slate-700 leading-relaxed font-medium flex flex-col items-center"
          >
            <h2 className="text-[#006948] font-black text-[18px] min-[360px]:text-[21px] min-[400px]:text-[24px] sm:text-[32px] md:text-[36px] mb-3.5 tracking-tight leading-snug">
              <span className="block whitespace-nowrap">설교준비와 말씀 연구로 분주한 설교자의 고민</span>
            </h2>
            <p className="text-slate-600 text-[10.5px] min-[360px]:text-[12px] min-[390px]:text-[13.5px] min-[430px]:text-[15px] sm:text-[17px] md:text-[19px] whitespace-nowrap tracking-tighter min-[390px]:tracking-tight sm:tracking-normal">
              복잡한 프로그램? 배우기 어렵고 무거워 정작 필요한 기능을 찾기 힘들고...
            </p>
            <p className="text-slate-600 text-[10.5px] min-[360px]:text-[12px] min-[390px]:text-[13.5px] min-[430px]:text-[15px] sm:text-[17px] md:text-[19px] whitespace-nowrap tracking-tighter min-[390px]:tracking-tight sm:tracking-normal mt-1 sm:mt-1.5">
              찾고 또 찾는 자료? 나만의 주석과 설교가 흩어져 나중에는 찾기 어렵고...
            </p>
          </motion.div>

          {/* Interactive Bible Tablet Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-10 sm:mt-14 flex justify-center"
          >
            <BibleDevicesShowcase onExploreClick={handleSearchClick} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
