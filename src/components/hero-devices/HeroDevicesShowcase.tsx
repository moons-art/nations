import React, { useRef, useState, useEffect } from 'react';
import { PhoneWaitingScreen } from './PhoneWaitingScreen';
import { PhoneVotingScreen } from './PhoneVotingScreen';
import { PadDashboardScreen } from './PadDashboardScreen';

interface HeroDevicesShowcaseProps {
  className?: string;
  onExploreClick?: () => void;
}

// Panoramic aspect ratio: wide width, compact height to prevent text wrapping
const BASE_WIDTH = 1140;
const BASE_HEIGHT = 495;

export const HeroDevicesShowcase: React.FC<HeroDevicesShowcaseProps> = ({
  className = '',
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        // Allows clean scaling on both ultra-wide desktops and narrow mobile devices
        const targetScale = Math.min(1.0, availableWidth / BASE_WIDTH);
        setScale(targetScale > 0 ? targetScale : 1);
      }
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onExploreClick}
      className={`w-full flex flex-col items-center justify-center overflow-hidden py-1 ${className}`}
    >
      {/* Container scaled proportionally: always exactly 3 devices in 1 single row on all screen sizes */}
      <div
        style={{
          width: `${BASE_WIDTH * scale}px`,
          height: `${BASE_HEIGHT * scale}px`,
          position: 'relative',
        }}
        className="mx-auto select-none transition-[width,height] duration-75"
      >
        <div
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          className="flex flex-row items-center justify-center gap-4"
        >
          {/* Left Device: Phone Waiting Screen (김은혜 대기화면) */}
          <div className="w-[260px] shrink-0 drop-shadow-xl hover:scale-[1.01] transition-transform duration-200">
            <PhoneWaitingScreen />
          </div>

          {/* Center Device: Pad Dashboard Screen (현장 상황실 데스크 - 와이드 가로비율) */}
          <div className="w-[580px] shrink-0 drop-shadow-2xl hover:scale-[1.01] transition-transform duration-200 z-10">
            <PadDashboardScreen />
          </div>

          {/* Right Device: Phone Voting Screen (홍길동 선거인 투표화면) */}
          <div className="w-[260px] shrink-0 drop-shadow-xl hover:scale-[1.01] transition-transform duration-200">
            <PhoneVotingScreen />
          </div>
        </div>
      </div>
    </div>
  );
};
