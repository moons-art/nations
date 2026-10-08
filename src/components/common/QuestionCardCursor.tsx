import React, { useState, useEffect } from 'react';

// Calm purple family palette for question card cursor
const DYNAMIC_CHROMA_COLORS = [
  '#7C3AED', // Royal Violet
  '#6D28D9', // Deep Violet
  '#8B5CF6', // Soft Violet
];

export const QuestionCardCursor: React.FC = () => {
  const [cursorColorIndex, setCursorColorIndex] = useState(0);

  // Slowly rotate cursor color every 3.5 seconds with a smooth 1-second transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCursorColorIndex((prev) => (prev + 1) % DYNAMIC_CHROMA_COLORS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const cursorColor = DYNAMIC_CHROMA_COLORS[cursorColorIndex];

  return (
    <>
      {/* Style for 3x faster crisp cursor blinking */}
      <style>{`
        @keyframes questionCursorFastBlink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* 50% thinner rectangular cursor with calm purple transition, low glow and 3x faster blink */}
      <span
        aria-hidden="true"
        className="inline-block w-[1.75px] min-[360px]:w-[2px] sm:w-[2.25px] md:w-[2.5px] h-[1.22em] ml-0.5 sm:ml-1 align-middle rounded-none transition-all duration-1000 ease-in-out"
        style={{
          backgroundColor: cursorColor,
          boxShadow: `0 0 2px ${cursorColor}25`,
          animation: 'questionCursorFastBlink 550ms infinite',
        }}
      />
    </>
  );
};
