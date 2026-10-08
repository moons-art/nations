import React from 'react';

interface KakaoIconProps {
  className?: string;
  size?: number;
}

export const KakaoIcon: React.FC<KakaoIconProps> = ({
  className = 'w-5 h-5',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 3C6.477 3 2 6.477 2 10.764c0 2.766 1.879 5.188 4.688 6.556l-1.196 4.382c-.105.385.292.705.632.484l5.163-3.385c.234.027.472.043.713.043 5.523 0 10-3.477 10-7.764S17.523 3 12 3z" />
    </svg>
  );
};
