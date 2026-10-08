import React, { useEffect, useRef, useState } from 'react';
import { PhoneAuthScreen } from './PhoneAuthScreen';
import { PhoneWaitingScreen } from './PhoneWaitingScreen';
import { PhoneVotingScreen } from './PhoneVotingScreen';

interface TriplePhoneMockupProps {
  className?: string;
}

export const TriplePhoneMockup: React.FC<TriplePhoneMockupProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Base dimensions of the 3 phones in a row
  const BASE_WIDTH = 680;
  const BASE_HEIGHT = 495;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const currentWidth = containerRef.current.clientWidth;
      if (currentWidth <= 0) return;
      // Calculate scale to perfectly fit available width, capped at 1.0
      const nextScale = Math.min(1.0, currentWidth / BASE_WIDTH);
      setScale(nextScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center overflow-hidden py-1 ${className}`}
      style={{
        height: `${BASE_HEIGHT * scale}px`,
        minHeight: `${BASE_HEIGHT * scale}px`,
      }}
    >
      {/* Absolute scaling canvas holding the 3 phones side-by-side */}
      <div
        className="absolute top-0 left-1/2 flex items-center justify-center gap-3 transition-transform duration-100 ease-out origin-top"
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {/* Phone 1: 본인 인증 - 더 크게 떠오르는 효과 */}
        <div className="w-[214px] shrink-0 transform transition-all duration-300 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
          <PhoneAuthScreen className="w-full shadow-xl hover:shadow-2xl transition-shadow" />
        </div>

        {/* Phone 2: 대기 화면 - 더 크게 떠오르는 효과 */}
        <div className="w-[214px] shrink-0 transform transition-all duration-300 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
          <PhoneWaitingScreen className="w-full shadow-xl hover:shadow-2xl transition-shadow" />
        </div>

        {/* Phone 3: 투표 진행 - 더 크게 떠오르는 효과 */}
        <div className="w-[214px] shrink-0 transform transition-all duration-300 hover:-translate-y-4 hover:scale-[1.04] cursor-pointer">
          <PhoneVotingScreen className="w-full shadow-xl hover:shadow-2xl transition-shadow" />
        </div>
      </div>
    </div>
  );
};
